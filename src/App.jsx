import React, { useState, useEffect, useRef } from "react";
import { Sparkles, Cpu, Search, X, Star, ThumbsUp, ThumbsDown } from "lucide-react";
import { MOVIES_DATA, INITIAL_RATINGS } from "./data/moviesData";
import { computeContentSimilarities, SVDRecommender, generateHybridRecommendations } from "./ml/mlEngine";
import Dashboard from "./components/Dashboard";
import MLExplainer from "./components/MLExplainer";

// Active custom user profile ID
const ACTIVE_CUSTOM_USER_ID = 8;

export default function App() {
  const [activeTab, setActiveTab] = useState("home"); // "home" or "explainer"
  const [searchQuery, setSearchQuery] = useState("");
  const [activeMovie, setActiveMovie] = useState(null); // Movie for details modal
  const [showProfileSelector, setShowProfileSelector] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // User States
  const [activeUser, setActiveUser] = useState({
    id: ACTIVE_CUSTOM_USER_ID,
    name: "You (Custom User)",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=60",
    role: "Movie Enthusiast",
    bio: "Rate movies to train your personal latent vector in real time. Switch profiles in the top right to see how different personas experience recommendations.",
  });

  // User ratings: key is movieId, value is rated score
  const [userRatings, setUserRatings] = useState({});

  // Machine Learning States
  const [mlData, setMlData] = useState({
    similarityMatrix: null,
    tfidfModel: null,
    svdModel: null,
    flatRatingsList: []
  });

  const [recommendations, setRecommendations] = useState([]);
  
  // Create static ref for SVD model to ensure single instance
  const svdRef = useRef(null);

  // Monitor scroll for navbar styles
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 1. Initialise Machine Learning Models on Launch
  useEffect(() => {
    // A. Compute Content Similarities
    const { matrix, tfidf } = computeContentSimilarities(MOVIES_DATA);

    // B. Build Flat Ratings Database from initial configurations
    const flatRatings = [];
    const userIds = new Set();
    const itemIds = MOVIES_DATA.map(m => m.id);

    Object.entries(INITIAL_RATINGS).forEach(([uidStr, uObj]) => {
      const uid = Number(uidStr);
      userIds.add(uid);
      Object.entries(uObj.ratings).forEach(([itemIdStr, score]) => {
        flatRatings.push({
          userId: uid,
          itemId: Number(itemIdStr),
          rating: score
        });
      });
    });

    // Add active custom user as possible user dimensions
    userIds.add(ACTIVE_CUSTOM_USER_ID);

    // C. Instantiate and Train SVD Collaborative filtering model
    const svd = new SVDRecommender(userIds.size, itemIds.length, 6, 0.015, 0.02);
    svd.fit(flatRatings, Array.from(userIds), itemIds, 40);
    svdRef.current = svd;

    // Save references to State
    setMlData({
      similarityMatrix: matrix,
      tfidfModel: tfidf,
      svdModel: svd,
      flatRatingsList: flatRatings
    });
  }, []);

  // 2. Regenerate recommendations whenever user ratings or active profile changes
  useEffect(() => {
    if (!mlData.similarityMatrix || !svdRef.current) return;

    // Build the total ratings array inclusive of current user's active ratings
    const currentUserRatingsList = Object.entries(userRatings).map(([mId, score]) => ({
      userId: activeUser.id,
      itemId: Number(mId),
      rating: score
    }));

    // Combine history ratings with current active user ratings
    const combinedRatings = [...mlData.flatRatingsList].filter(r => r.userId !== activeUser.id);
    combinedRatings.push(...currentUserRatingsList);

    // Incrementally fit SVD model on user's newly input ratings
    if (currentUserRatingsList.length > 0) {
      svdRef.current.fit(combinedRatings, [activeUser.id, ...Object.keys(INITIAL_RATINGS).map(Number)], MOVIES_DATA.map(m => m.id), 10);
    }

    const hybridRecs = generateHybridRecommendations({
      activeUserId: activeUser.id,
      userRatings,
      allMovies: MOVIES_DATA,
      ratingsDatabase: combinedRatings,
      similarityMatrix: mlData.similarityMatrix,
      svdModel: svdRef.current,
      contentWeight: 0.35 // weights: 35% content NLP overlap, 65% SVD user preferences
    });

    setRecommendations(hybridRecs);
  }, [userRatings, activeUser, mlData.similarityMatrix, mlData.flatRatingsList]);

  // 3. Switch Profile Persona Action
  const handleSelectProfile = (profileId) => {
    // If selecting Custom user, reset ratings or restore empty custom user
    if (profileId === ACTIVE_CUSTOM_USER_ID) {
      setActiveUser({
        id: ACTIVE_CUSTOM_USER_ID,
        name: "You (Custom User)",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=60",
        role: "Movie Enthusiast",
        bio: "Rate movies to train your personal latent vector in real time. Switch profiles in the top right to see how different personas experience recommendations.",
      });
      setUserRatings({});
    } else {
      const template = INITIAL_RATINGS[profileId];
      if (template) {
        setActiveUser({
          id: profileId,
          name: template.name,
          avatar: template.avatar,
          role: template.role,
          bio: template.bio
        });
        setUserRatings({ ...template.ratings });
      }
    }
    setShowProfileSelector(false);
    setActiveTab("home"); // auto navigate back to landing rows
  };

  // 4. Rate Movie Action
  const handleRateMovie = (movieId, score) => {
    setUserRatings(prev => {
      const updated = { ...prev };
      if (score === 0) {
        delete updated[movieId];
      } else {
        updated[movieId] = score;
      }
      return updated;
    });

    // Update active flat ratings database representation in SVD coordinates
    setMlData(prev => {
      const updatedList = prev.flatRatingsList.filter(
        r => !(r.userId === activeUser.id && r.itemId === movieId)
      );
      if (score > 0) {
        updatedList.push({
          userId: activeUser.id,
          itemId: movieId,
          rating: score
        });
      }
      return { ...prev, flatRatingsList: updatedList };
    });
  };

  // Calculate similarity recommendation for standard 'More Like This' detail rows
  const getMoreLikeThis = (movie, count = 5) => {
    if (!mlData.similarityMatrix) return [];
    const sims = mlData.similarityMatrix[movie.id] || {};
    
    return Object.entries(sims)
      .map(([idStr, score]) => ({
        movie: MOVIES_DATA.find(m => m.id === Number(idStr)),
        score
      }))
      .filter(item => item.movie && item.movie.id !== movie.id)
      .sort((a, b) => b.score - a.score)
      .slice(0, count);
  };

  return (
    <div className="app-container">
      
      {/* Dynamic Navbar */}
      <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
        <div className="nav-brand" onClick={() => { setActiveTab("home"); setSearchQuery(""); setActiveMovie(null); }}>
          Flix<span>Mind</span>
        </div>
        
        <ul className="nav-links">
          <li
            className={`nav-link ${activeTab === "home" ? "active" : ""}`}
            onClick={() => { setActiveTab("home"); setSearchQuery(""); setActiveMovie(null); }}
          >
            Home Cinema
          </li>
          <li
            className={`nav-link ${activeTab === "explainer" ? "active" : ""}`}
            onClick={() => { setActiveTab("explainer"); setActiveMovie(null); setShowProfileSelector(false); }}
          >
            <Cpu size={14} style={{ display: "inline", marginRight: "4px", verticalAlign: "middle" }} />
            ML Insights
          </li>
        </ul>

        <div className="nav-right">
          {activeTab === "home" && (
            <div className="search-wrapper">
              <Search size={16} className="search-icon" />
              <input
                type="text"
                placeholder="Search movies, genres, keywords..."
                className="search-input"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          )}

          <div className="profile-menu" onClick={() => setShowProfileSelector(true)}>
            <img src={activeUser.avatar} alt={activeUser.name} className="profile-img" />
            <span className="profile-name">{activeUser.name}</span>
          </div>
        </div>
      </nav>

      {/* Main Tab Routing Layout */}
      {activeTab === "home" ? (
        <Dashboard
          movies={MOVIES_DATA}
          recommendations={recommendations}
          userRatings={userRatings}
          onRate={handleRateMovie}
          onViewDetail={(m) => setActiveMovie(m)}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          onOpenProfileSelector={() => setShowProfileSelector(true)}
          activeUser={activeUser}
        />
      ) : (
        mlData.similarityMatrix && svdRef.current && (
          <MLExplainer
            movies={MOVIES_DATA}
            activeUser={activeUser}
            userRatings={userRatings}
            ratingsList={mlData.flatRatingsList}
            svdModel={svdRef.current}
            contentSimilarityMatrix={mlData.similarityMatrix}
            tfidfModel={mlData.tfidfModel}
          />
        )
      )}

      {/* FOOTER */}
      <footer style={{ borderTop: "1px solid var(--border)", background: "rgba(10,10,12,0.8)", padding: "30px 4%", textAlign: "center", color: "var(--text-muted)", fontSize: "12px", zIndex: 10, position: "relative", marginTop: "auto" }}>
        <p>FlixMind Recommendation Core: Latent Factor Analysis (SVD) with Cosine text similarities (TF-IDF).</p>
        <p style={{ marginTop: "6px" }}>Developed locally inside local React Sandbox.</p>
      </footer>

      {/* MOVIE DETAIL MODAL */}
      {activeMovie && (
        <div className="modal-overlay" onClick={() => setActiveMovie(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setActiveMovie(null)}>
              <X size={18} />
            </button>

            <div
              className="modal-header-img"
              style={{ backgroundImage: `url(${activeMovie.backdropUrl})` }}
            >
              <div className="modal-header-overlay" />
              <div className="modal-header-content">
                <h2 className="modal-title">{activeMovie.title}</h2>
                <div className="hero-meta">
                  <span className="hero-rating">
                    <Star size={13} fill="currentColor" /> {activeMovie.rating}
                  </span>
                  <span>{activeMovie.year}</span>
                  <span>{activeMovie.director}</span>
                </div>
              </div>
            </div>

            <div className="modal-body">
              <div className="modal-main">
                <p className="modal-synopsis">{activeMovie.description}</p>
                
                {/* Real-time Review and Rating Input */}
                <div className="modal-rating-section">
                  <span className="rating-section-title">Your Personalized Rating</span>
                  <div className="rating-interaction">
                    <div className="star-rating-container">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          className={`star-btn ${userRatings[activeMovie.id] >= star ? "active" : ""}`}
                          onClick={() => handleRateMovie(activeMovie.id, star)}
                        >
                          <Star size={20} fill={userRatings[activeMovie.id] >= star ? "currentColor" : "none"} />
                        </button>
                      ))}
                    </div>
                    
                    {/* Thumbs shortcuts */}
                    <div style={{ display: "flex", gap: "8px" }}>
                      <button
                        className={`thumbs-btn ${userRatings[activeMovie.id] >= 4.0 ? "active-like" : ""}`}
                        onClick={() => handleRateMovie(activeMovie.id, 5.0)}
                        title="Loved it (5 stars)"
                      >
                        <ThumbsUp size={16} />
                      </button>
                      <button
                        className={`thumbs-btn ${userRatings[activeMovie.id] <= 2.0 && userRatings[activeMovie.id] > 0 ? "active-dislike" : ""}`}
                        onClick={() => handleRateMovie(activeMovie.id, 1.5)}
                        title="Disliked (1.5 stars)"
                      >
                        <ThumbsDown size={16} />
                      </button>
                      {userRatings[activeMovie.id] && (
                        <button
                          style={{ fontSize: "11px", background: "none", border: "none", color: "var(--primary)", cursor: "pointer", textDecoration: "underline" }}
                          onClick={() => handleRateMovie(activeMovie.id, 0)}
                        >
                          Reset Review
                        </button>
                      )}
                    </div>
                  </div>
                  <p style={{ fontSize: "11px", color: "var(--text-muted)", fontStyle: "italic" }}>
                    Rating updates your latent user representation, dynamically rearranging rows on your Home Screen!
                  </p>
                </div>

                {/* More Like This similarity list */}
                <div style={{ marginTop: "10px" }}>
                  <h4 style={{ fontSize: "14px", fontWeight: "700", marginBottom: "12px", borderBottom: "1px solid var(--border)", paddingBottom: "6px" }}>
                    More Like This (Content Similarity)
                  </h4>
                  <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                    {getMoreLikeThis(activeMovie, 4).map(({ movie, score }) => (
                      <div
                        key={movie.id}
                        style={{ display: "flex", gap: "12px", background: "rgba(255,255,255,0.02)", border: "1px solid var(--border)", borderRadius: "6px", overflow: "hidden", cursor: "pointer" }}
                        onClick={() => setActiveMovie(movie)}
                      >
                        <img src={movie.backdropUrl} alt={movie.title} style={{ width: "90px", objectFit: "cover", aspectRatio: "16/10" }} />
                        <div style={{ padding: "8px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
                          <span style={{ fontSize: "13px", fontWeight: "700" }}>{movie.title}</span>
                          <span style={{ fontSize: "11px", color: "var(--text-muted)", marginTop: "2px" }}>
                            {movie.genres.join(", ")} • {Math.round(score * 100)}% similarity match
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

              {/* Side panel information */}
              <div className="modal-details">
                <div className="detail-row">
                  <span className="detail-label">Cast</span>
                  <span className="detail-value">{activeMovie.cast.join(", ")}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Director</span>
                  <span className="detail-value">{activeMovie.director}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Release Year</span>
                  <span className="detail-value">{activeMovie.year}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Popularity Vector</span>
                  <span className="detail-value">{activeMovie.popularity}% index rating</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Vocabulary Tags</span>
                  <div className="modal-tags">
                    {activeMovie.tags.map((t) => (
                      <span key={t} className="tag-pill">
                        #{t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

            </div>

          </div>
        </div>
      )}

      {/* USER PROFILE SELECTOR MODAL */}
      {showProfileSelector && (
        <div className="modal-overlay" onClick={() => setShowProfileSelector(false)}>
          <div className="modal-content profile-modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setShowProfileSelector(false)}>
              <X size={18} />
            </button>
            <h2 style={{ fontFamily: "var(--font-display)", fontWeight: "800", fontSize: "28px" }}>Who's Watching?</h2>
            <p style={{ color: "var(--text-muted)", fontSize: "14px", marginTop: "6px" }}>
              Switch user profiles to load synthetic histories and observe recommendations update instantly!
            </p>

            <div className="profile-grid">
              
              {/* Active custom user */}
              <div
                className={`profile-card ${activeUser.id === ACTIVE_CUSTOM_USER_ID ? "active" : ""}`}
                onClick={() => handleSelectProfile(ACTIVE_CUSTOM_USER_ID)}
              >
                <div className="profile-card-img-container">
                  <img
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=60"
                    alt="Custom User"
                    className="profile-card-img"
                  />
                </div>
                <span className="profile-card-name">Custom User</span>
                <span className="profile-card-role">Fresh Profile</span>
              </div>

              {/* Synthetic seed profiles */}
              {Object.entries(INITIAL_RATINGS).map(([idStr, uObj]) => {
                const id = Number(idStr);
                return (
                  <div
                    key={id}
                    className={`profile-card ${activeUser.id === id ? "active" : ""}`}
                    onClick={() => handleSelectProfile(id)}
                  >
                    <div className="profile-card-img-container">
                      <img src={uObj.avatar} alt={uObj.name} className="profile-card-img" />
                    </div>
                    <span className="profile-card-name">{uObj.name}</span>
                    <span className="profile-card-role">{uObj.role}</span>
                  </div>
                );
              })}

            </div>
          </div>
        </div>
      )}

    </div>
  );
}
