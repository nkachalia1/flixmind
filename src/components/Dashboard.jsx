import React, { useState, useEffect, useRef } from "react";
import { Play, Info, ThumbsUp, ThumbsDown, Star, Sparkles, Flame, Heart, Search, Tv } from "lucide-react";

export default function Dashboard({
  movies,
  recommendations,
  userRatings,
  onRate,
  onViewDetail,
  searchQuery,
  setSearchQuery,
  onOpenProfileSelector,
  activeUser
}) {
  const [heroMovie, setHeroMovie] = useState(null);

  // Set the top hybrid recommendation as the Hero movie, or default to Interstellar
  useEffect(() => {
    if (recommendations && recommendations.length > 0) {
      setHeroMovie(recommendations[0].movie);
    } else if (movies && movies.length > 0) {
      setHeroMovie(movies[0]);
    }
  }, [recommendations, movies]);

  // Group movies by genre
  const getMoviesByGenre = (genre) => {
    return movies.filter((m) => m.genres.includes(genre));
  };

  // Find a highly-rated movie by user to show "Because You Liked"
  const getBecauseYouLiked = () => {
    const highRated = Object.entries(userRatings)
      .filter(([_, rating]) => rating >= 4)
      .map(([id, _]) => Number(id));

    if (highRated.length === 0) return null;
    
    // Pick the most recently rated or first highly rated movie
    const targetId = highRated[highRated.length - 1];
    const targetMovie = movies.find(m => m.id === targetId);
    if (!targetMovie) return null;

    // Filter out movies already rated
    const ratedIds = new Set(Object.keys(userRatings).map(Number));

    // Sort all movies by their similarity to the target movie
    // We compute this on the fly for simplicity
    const contentRow = movies
      .filter(m => m.id !== targetId && !ratedIds.has(m.id))
      .map(m => {
        // Simple direct genre/tag overlap calculation for the row
        const commonGenres = m.genres.filter(g => targetMovie.genres.includes(g)).length;
        const commonTags = m.tags.filter(t => targetMovie.tags.includes(t)).length;
        const score = (commonGenres * 0.4) + (commonTags * 0.6);
        return { movie: m, score };
      })
      .sort((a, b) => b.score - a.score)
      .slice(0, 10)
      .map(item => item.movie);

    return { targetMovie, recommendations: contentRow };
  };

  const becauseYouLikedData = getBecauseYouLiked();

  // Handle Search filtering
  const filteredMovies = searchQuery
    ? movies.filter(
        (m) =>
          m.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          m.genres.some((g) => g.toLowerCase().includes(searchQuery.toLowerCase())) ||
          m.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase())) ||
          m.director.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  return (
    <div style={{ marginTop: "70px" }}>
      {/* Search Results Display */}
      {searchQuery ? (
        <div className="movie-section" style={{ minHeight: "60vh", paddingTop: "40px" }}>
          <div className="section-header">
            <div>
              <h2 className="section-title">
                <Search size={22} /> Search Results for "{searchQuery}"
              </h2>
              <p className="section-subtitle">
                Found {filteredMovies.length} movies matching your query
              </p>
            </div>
          </div>
          {filteredMovies.length > 0 ? (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: "20px", padding: "20px 0" }}>
              {filteredMovies.map((movie) => {
                // Find matching score if available
                const matchScore = recommendations.find(r => r.movie.id === movie.id)?.scores.hybrid;
                const matchPercent = matchScore ? Math.round(matchScore * 100) : null;
                
                return (
                  <div
                    key={movie.id}
                    className="movie-card"
                    onClick={() => onViewDetail(movie)}
                    style={{ flex: "none" }}
                  >
                    <img src={movie.backdropUrl} alt={movie.title} className="movie-card-img" />
                    <div className="movie-card-info">
                      <h3 className="card-title">{movie.title}</h3>
                      <div className="card-meta">
                        <span className="card-rating">
                          <Star size={11} fill="currentColor" /> {movie.rating}
                        </span>
                        {matchPercent !== null && (
                          <span className="card-match-badge">{matchPercent}% Match</span>
                        )}
                        <span>{movie.year}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div style={{ textAlign: "center", color: "var(--text-muted)", padding: "100px 0" }}>
              <p style={{ fontSize: "18px" }}>No movies found matching your search.</p>
              <p style={{ fontSize: "14px", marginTop: "10px" }}>Try searching for keywords like "space", "cyberpunk", "magic", "assassin", or genres like "Sci-Fi".</p>
            </div>
          )}
        </div>
      ) : (
        /* Standard Netflix Landing Dashboard */
        <>
          {/* Hero Movie Banner */}
          {heroMovie && (
            <div
              className="hero-banner"
              style={{ backgroundImage: `url(${heroMovie.backdropUrl})` }}
            >
              <div className="hero-overlay" />
              <div className="hero-content">
                <span className="hero-tag">
                  <Sparkles size={12} style={{ display: "inline", marginRight: "6px", verticalAlign: "middle" }} /> Top Match for You
                </span>
                <h1 className="hero-title">{heroMovie.title}</h1>
                <div className="hero-meta">
                  <span className="hero-rating">
                    <Star size={14} fill="currentColor" /> {heroMovie.rating}
                  </span>
                  <span>{heroMovie.year}</span>
                  <span>Dir: {heroMovie.director}</span>
                  <div className="hero-genres">
                    {heroMovie.genres.map((g) => (
                      <span key={g} className="hero-genre-pill">
                        {g}
                      </span>
                    ))}
                  </div>
                </div>
                <p className="hero-desc">{heroMovie.description}</p>
                <div className="hero-actions">
                  <button className="btn btn-primary" onClick={() => onViewDetail(heroMovie)}>
                    <Play size={16} fill="currentColor" /> Play Preview
                  </button>
                  <button className="btn btn-secondary" onClick={() => onViewDetail(heroMovie)}>
                    <Info size={16} /> More Info
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Carousel Rows */}
          <div style={{ paddingBottom: "80px", position: "relative", zIndex: 10, marginTop: "-40px" }}>
            
            {/* 1. Recommended for You (ML Engine) */}
            <div className="movie-section">
              <div className="section-header">
                <div>
                  <h2 className="section-title">
                    <Sparkles size={20} /> Recommended for {activeUser.name}
                  </h2>
                  <p className="section-subtitle">
                    Personalized hybrid recommendations using TF-IDF & Matrix Factorization
                  </p>
                </div>
              </div>
              <div className="carousel-wrapper">
                <div className="carousel-container">
                  {recommendations.slice(0, 15).map(({ movie, scores }) => {
                    const matchPercent = Math.round(scores.hybrid * 100);
                    return (
                      <div
                        key={movie.id}
                        className="movie-card"
                        onClick={() => onViewDetail(movie)}
                      >
                        <img src={movie.backdropUrl} alt={movie.title} className="movie-card-img" />
                        <div className="movie-card-info">
                          <h3 className="card-title">{movie.title}</h3>
                          <div className="card-meta">
                            <span className="card-rating">
                              <Star size={11} fill="currentColor" /> {movie.rating}
                            </span>
                            <span className="card-match-badge">{matchPercent}% Match</span>
                            <span>{movie.year}</span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* 2. Because You Liked [Movie] (Dynamic Cosine Similarity Row) */}
            {becauseYouLikedData && (
              <div className="movie-section">
                <div className="section-header">
                  <div>
                    <h2 className="section-title">
                      <Heart size={20} /> Because you rated "{becauseYouLikedData.targetMovie.title}"
                    </h2>
                    <p className="section-subtitle">
                      Similar movies based on content similarity and tags overlap
                    </p>
                  </div>
                </div>
                <div className="carousel-wrapper">
                  <div className="carousel-container">
                    {becauseYouLikedData.recommendations.map((movie) => (
                      <div
                        key={movie.id}
                        className="movie-card"
                        onClick={() => onViewDetail(movie)}
                      >
                        <img src={movie.backdropUrl} alt={movie.title} className="movie-card-img" />
                        <div className="movie-card-info">
                          <h3 className="card-title">{movie.title}</h3>
                          <div className="card-meta">
                            <span className="card-rating">
                              <Star size={11} fill="currentColor" /> {movie.rating}
                            </span>
                            <span>{movie.year}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* 3. Trending Now (Popularity Sorting) */}
            <div className="movie-section">
              <div className="section-header">
                <div>
                  <h2 className="section-title">
                    <Flame size={20} /> Trending Now
                  </h2>
                  <p className="section-subtitle">
                    Most watched and rated movies by the FlixMind network
                  </p>
                </div>
              </div>
              <div className="carousel-wrapper">
                <div className="carousel-container">
                  {[...movies]
                    .sort((a, b) => b.popularity - a.popularity)
                    .slice(0, 12)
                    .map((movie) => (
                      <div
                        key={movie.id}
                        className="movie-card"
                        onClick={() => onViewDetail(movie)}
                      >
                        <img src={movie.backdropUrl} alt={movie.title} className="movie-card-img" />
                        <div className="movie-card-info">
                          <h3 className="card-title">{movie.title}</h3>
                          <div className="card-meta">
                            <span className="card-rating">
                              <Star size={11} fill="currentColor" /> {movie.rating}
                            </span>
                            <span>{movie.year}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>

            {/* 4. Sci-Fi & Adventure */}
            <div className="movie-section">
              <div className="section-header">
                <div>
                  <h2 className="section-title">
                    <Tv size={20} /> Sci-Fi & Deep Space
                  </h2>
                </div>
              </div>
              <div className="carousel-wrapper">
                <div className="carousel-container">
                  {getMoviesByGenre("Sci-Fi").map((movie) => (
                    <div
                      key={movie.id}
                      className="movie-card"
                      onClick={() => onViewDetail(movie)}
                    >
                      <img src={movie.backdropUrl} alt={movie.title} className="movie-card-img" />
                      <div className="movie-card-info">
                        <h3 className="card-title">{movie.title}</h3>
                        <div className="card-meta">
                          <span className="card-rating">
                            <Star size={11} fill="currentColor" /> {movie.rating}
                          </span>
                          <span>{movie.year}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* 5. Award Winning Dramas */}
            <div className="movie-section">
              <div className="section-header">
                <div>
                  <h2 className="section-title">
                    <Tv size={20} /> Critically Acclaimed Dramas
                  </h2>
                </div>
              </div>
              <div className="carousel-wrapper">
                <div className="carousel-container">
                  {getMoviesByGenre("Drama").map((movie) => (
                    <div
                      key={movie.id}
                      className="movie-card"
                      onClick={() => onViewDetail(movie)}
                    >
                      <img src={movie.backdropUrl} alt={movie.title} className="movie-card-img" />
                      <div className="movie-card-info">
                        <h3 className="card-title">{movie.title}</h3>
                        <div className="card-meta">
                          <span className="card-rating">
                            <Star size={11} fill="currentColor" /> {movie.rating}
                          </span>
                          <span>{movie.year}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* 6. Romantic & Heartwarming */}
            <div className="movie-section">
              <div className="section-header">
                <div>
                  <h2 className="section-title">
                    <Tv size={20} /> Romance & Musicals
                  </h2>
                </div>
              </div>
              <div className="carousel-wrapper">
                <div className="carousel-container">
                  {getMoviesByGenre("Romance").map((movie) => (
                    <div
                      key={movie.id}
                      className="movie-card"
                      onClick={() => onViewDetail(movie)}
                    >
                      <img src={movie.backdropUrl} alt={movie.title} className="movie-card-img" />
                      <div className="movie-card-info">
                        <h3 className="card-title">{movie.title}</h3>
                        <div className="card-meta">
                          <span className="card-rating">
                            <Star size={11} fill="currentColor" /> {movie.rating}
                          </span>
                          <span>{movie.year}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </>
      )}
    </div>
  );
}
