import React, { useState, useEffect } from "react";
import { Sparkles, BarChart2, Award, Zap, RefreshCw, Cpu, Activity, Info, Star } from "lucide-react";

export default function MLExplainer({
  movies,
  activeUser,
  userRatings,
  ratingsList, // flat ratings database { userId, itemId, rating }
  svdModel,
  onRetrainSVD,
  contentSimilarityMatrix,
  tfidfModel
}) {
  const [selectedMovieId, setSelectedMovieId] = useState(movies[0]?.id || 1);
  const [trainingHistory, setTrainingHistory] = useState([]);
  const [currentLoss, setCurrentLoss] = useState(0.42); // synthetic/real RMSE indicator
  const [epochCount, setEpochCount] = useState(40);
  const [isTraining, setIsTraining] = useState(false);
  const [scatterMovies, setScatterMovies] = useState([]);

  // Load training history and calculate scatter positions for 16 distinct movies
  useEffect(() => {
    if (svdModel) {
      setTrainingHistory(svdModel.trainingHistory || []);
      setCurrentLoss(svdModel.trainingHistory[svdModel.trainingHistory.length - 1] || 0.42);
      setEpochCount(svdModel.trainingHistory.length || 40);
      
      // Select 16 representative movies from different genres to display in the 2D Latent space
      const representativeIds = [1, 2, 3, 6, 9, 11, 12, 16, 19, 21, 22, 26, 29, 31, 34, 36];
      const selected = movies.filter(m => representativeIds.includes(m.id));
      setScatterMovies(selected);
    }
  }, [svdModel, movies]);

  // Run live training animation
  const handleLiveTrain = () => {
    if (isTraining) return;
    setIsTraining(true);

    let currentEpoch = 0;
    const targetEpochs = 20;

    const interval = setInterval(() => {
      if (currentEpoch >= targetEpochs) {
        clearInterval(interval);
        setIsTraining(false);
      } else {
        // Run 1 training epoch on the actual SVD engine!
        const rmse = svdModel.trainEpoch(ratingsList);
        
        // Update states to trigger rendering
        setTrainingHistory([...svdModel.trainingHistory]);
        setCurrentLoss(rmse);
        setEpochCount(svdModel.trainingHistory.length);
        currentEpoch++;
      }
    }, 120); // 120ms per epoch for satisfying progress bar ticks
  };

  // Get TF-IDF keyword weights for the selected movie
  const getSelectedMovieKeywords = () => {
    const movie = movies.find(m => m.id === Number(selectedMovieId));
    if (!movie || !tfidfModel) return [];

    const contentStr = `${movie.description} ${movie.tags.join(" ")} ${movie.genres.join(" ")}`;
    return tfidfModel.getKeywordsForDocument(contentStr, 6);
  };

  const keywords = getSelectedMovieKeywords();

  // Get active user's current rating data list
  const getActiveUserRatings = () => {
    return Object.entries(userRatings).map(([id, rating]) => {
      const movie = movies.find(m => m.id === Number(id));
      return { movie, rating };
    });
  };

  const activeRatings = getActiveUserRatings();

  // Selected movies for 10x10 Similarity Heatmap grid
  const heatmapMovies = movies.slice(0, 10);

  // Map user's latent SVD factors into human-readable genres
  // Factor indices represent dimensions computed during Matrix Factorization (SVD)
  const getUserTasteAffinities = () => {
    const factors = svdModel?.userFactors[activeUser.id] || new Array(6).fill(0);
    
    // Give descriptive labels to SVD latent factors based on the seeded profiles
    const labels = [
      "Cosmic / Sci-Fi Scale",
      "Combat & Action",
      "Whimsy & Comedy",
      "Heartfelt Romance",
      "Dark Scares & Thrills",
      "Nature & Realism"
    ];

    return labels.map((label, idx) => {
      // Latent factors can be negative or positive. Normalise to 0-1 for visualization
      const val = factors[idx] || 0;
      // map [-0.5, 0.5] range to [0, 100]
      const percentage = Math.round(Math.max(0, Math.min(100, (val + 0.3) * 166)));
      return { label, val: val.toFixed(3), percentage };
    });
  };

  const tasteAffinities = getUserTasteAffinities();

  // Map 2D latent points of items for the scatter plot
  const getScatterCoordinates = (movie) => {
    const factors = svdModel?.itemFactors[movie.id] || [0, 0];
    const f0 = factors[0] || 0;
    const f1 = factors[1] || 0;

    // Normalise factors to 10%-90% coordinates inside the 280px SVG box
    // Assuming factors range roughly between -0.4 and 0.4
    const x = 50 + (f0 * 100);
    const y = 50 - (f1 * 100); // invert y for cartesian representation

    return { x: `${Math.max(5, Math.min(95, x))}%`, y: `${Math.max(5, Math.min(95, y))}%`, f0, f1 };
  };

  return (
    <div className="ml-dashboard">
      
      {/* Sidebar: Profile Vector & SVD Info */}
      <div className="ml-sidebar">
        
        {/* Active Profile Taste Vector */}
        <div className="ml-panel">
          <h3 className="panel-title">
            <Cpu size={18} /> Active Taste Vector
          </h3>
          <div className="ml-user-header">
            <img src={activeUser.avatar} alt={activeUser.name} className="ml-user-img" />
            <div>
              <h4 className="ml-user-name">{activeUser.name}</h4>
              <p className="ml-user-role">{activeUser.role}</p>
            </div>
          </div>
          <p className="ml-user-bio">"{activeUser.bio}"</p>
          
          <div style={{ marginTop: "10px" }}>
            <h4 style={{ fontSize: "12px", fontWeight: "700", marginBottom: "12px", textTransform: "uppercase", letterSpacing: "0.5px", color: "var(--text-muted)" }}>
              SVD Latent Features Map
            </h4>
            <div className="taste-vector-grid">
              {tasteAffinities.map((affinity) => (
                <div key={affinity.label} className="taste-vector-row">
                  <span>{affinity.label}</span>
                  <div className="taste-vector-bar-bg">
                    <div
                      className="taste-vector-bar-fill"
                      style={{ width: `${affinity.percentage}%` }}
                    />
                  </div>
                  <span style={{ fontFamily: "monospace", textAlign: "right", color: "var(--accent)", fontSize: "11px" }}>
                    {affinity.val}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* SVD Engine Stats & Live SGD Optimization */}
        <div className="ml-panel">
          <h3 className="panel-title">
            <Activity size={18} /> SVD Engine Live (SGD)
          </h3>
          <div className="svd-training-panel">
            <div className="training-stats">
              <div className="stat-box">
                <span className="stat-num">{epochCount}</span>
                <span className="stat-label">Total Epochs</span>
              </div>
              <div className="stat-box">
                <span className="stat-num" style={{ color: "var(--primary)" }}>
                  {currentLoss.toFixed(4)}
                </span>
                <span className="stat-label">Training RMSE</span>
              </div>
            </div>

            <div className="training-visual">
              <div className="training-gridlines">
                <div className="gridline" />
                <div className="gridline" />
                <div className="gridline" />
              </div>
              {trainingHistory.slice(-24).map((loss, idx) => {
                // Map RMSE height (range roughly 0.2 to 1.2) to percentage height
                const heightPercent = Math.max(10, Math.min(100, (1.3 - loss) * 80));
                return (
                  <div
                    key={idx}
                    className="training-bar"
                    style={{ height: `${heightPercent}%` }}
                    title={`Epoch ${epochCount - trainingHistory.slice(-24).length + idx + 1}: RMSE ${loss}`}
                  />
                );
              })}
            </div>

            <button
              className="btn btn-primary"
              style={{
                width: "100%",
                background: isTraining ? "rgba(255, 255, 255, 0.05)" : "var(--accent)",
                boxShadow: isTraining ? "none" : "0 4px 12px var(--accent-glow)"
              }}
              onClick={handleLiveTrain}
              disabled={isTraining}
            >
              {isTraining ? (
                <>
                  <RefreshCw size={14} className="animate-spin" style={{ animation: "spin 1s linear infinite" }} />
                  Running SGD...
                </>
              ) : (
                <>
                  <RefreshCw size={14} />
                  Retrain SVD Latents (20 epochs)
                </>
              )}
            </button>
            <p style={{ fontSize: "10px", color: "var(--text-muted)", textAlign: "center", lineHeight: "1.4" }}>
              Clicking retrain runs Stochastic Gradient Descent in real time. Notice the error curve decrease.
            </p>
          </div>
        </div>

      </div>

      {/* Main Content: Explainability Workspace */}
      <div className="ml-content-area">
        
        {/* Core Charts Row */}
        <div className="explainability-grid">
          
          {/* A. Content-Based TF-IDF keyword weights */}
          <div className="explanation-section">
            <h3 className="explanation-title">
              <BarChart2 size={18} /> TF-IDF Feature Weights
            </h3>
            <div className="explanation-card">
              <div style={{ width: "100%" }}>
                <div className="tf-idf-selector">
                  <label style={{ fontSize: "11px", color: "var(--text-muted)", display: "block", marginBottom: "6px", textTransform: "uppercase" }}>
                    Select Movie to inspect NLP weights
                  </label>
                  <select
                    className="custom-select"
                    value={selectedMovieId}
                    onChange={(e) => setSelectedMovieId(Number(e.target.value))}
                  >
                    {movies.map((m) => (
                      <option key={m.id} value={m.id}>
                        {m.title} ({m.genres[0]})
                      </option>
                    ))}
                  </select>
                </div>

                <div className="keyword-weights-list">
                  {keywords.map(({ term, weight }, index) => {
                    const percent = Math.min(100, Math.max(15, weight * 450));
                    return (
                      <div key={term} className="keyword-weight-row">
                        <div className="keyword-header">
                          <span className="keyword-term">
                            #{index + 1} {term}
                          </span>
                          <span style={{ color: "var(--text-muted)", fontFamily: "monospace" }}>
                            {weight.toFixed(4)}
                          </span>
                        </div>
                        <div className="keyword-bar-bg">
                          <div
                            className="keyword-bar-fill"
                            style={{ width: `${percent}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
              <p style={{ fontSize: "11px", color: "var(--text-muted)", borderTop: "1px solid var(--border)", paddingTop: "12px", marginTop: "12px" }}>
                <Info size={11} style={{ display: "inline", marginRight: "4px", verticalAlign: "middle" }} />
                Weights represent the TF-IDF score calculated over the dataset vocabulary. These tokens form the features used in movie similarity profiles.
              </p>
            </div>
          </div>

          {/* B. Cosine Similarity Heatmap Correlation Matrix */}
          <div className="explanation-section">
            <h3 className="explanation-title">
              <Award size={18} /> Cosine Similarity Correlation
            </h3>
            <div className="explanation-card" style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
              <div className="heatmap-container">
                <div
                  className="heatmap-grid"
                  style={{ gridTemplateColumns: `repeat(${heatmapMovies.length}, 1fr)` }}
                >
                  {heatmapMovies.map((movieA) =>
                    heatmapMovies.map((movieB) => {
                      const score = contentSimilarityMatrix[movieA.id]?.[movieB.id] || 0;
                      
                      // HSL color mappings: dark blue/gray for low, glowing primary red for high
                      // range of hue: 240 (blue) to 350 (red)
                      const hue = 240 + Math.round(score * 110);
                      const sat = 10 + Math.round(score * 80);
                      const light = 8 + Math.round(score * 35);
                      
                      return (
                        <div
                          key={`${movieA.id}-${movieB.id}`}
                          className="heatmap-cell"
                          style={{
                            backgroundColor: `hsl(${hue}, ${sat}%, ${light}%)`,
                            border: movieA.id === movieB.id ? "1.5px solid var(--primary)" : "none"
                          }}
                          data-tooltip={`${movieA.title} ↔ ${movieB.title}: ${Math.round(score * 100)}% Similarity`}
                        />
                      );
                    })
                  )}
                </div>
              </div>
              <p style={{ fontSize: "11px", color: "var(--text-muted)", borderTop: "1px solid var(--border)", paddingTop: "12px", marginTop: "12px" }}>
                <Info size={11} style={{ display: "inline", marginRight: "4px", verticalAlign: "middle" }} />
                A 10x10 correlation matrix showing content overlapping between movies. Bright red represents high cosine overlap (e.g. Interstellar/The Martian). Hover cells to see metadata scores.
              </p>
            </div>
          </div>

        </div>

        {/* SVD Collaborative Filtering 2D Latent Vector Space */}
        <div className="explanation-section">
          <h3 className="explanation-title">
            <Zap size={18} /> 2D Latent Space Projection (Collaborative Embeddings)
          </h3>
          <div className="scatter-plot-card">
            <div>
              <h4 style={{ fontSize: "14px", fontWeight: "600", marginBottom: "4px" }}>SVD Latent Factors Scatter Space</h4>
              <p style={{ fontSize: "12px", color: "var(--text-muted)" }}>
                This scatter plot shows where movies are mapped in the recommendation space based on collaborative user preferences. Movies positioned closer together represent similar latent tastes.
              </p>
            </div>
            
            <div className="plot-area">
              <div className="plot-axis-x" />
              <div className="plot-axis-y" />
              <div className="plot-label-x">Latent Factor 1 (Intensity scale) →</div>
              <div className="plot-label-y">← Latent Factor 2 (Narrative scale)</div>

              {scatterMovies.map((movie) => {
                const { x, y, f0, f1 } = getScatterCoordinates(movie);
                
                // Color dots depending on genre family
                let dotColor = "hsl(210, 80%, 55%)"; // Sci-Fi (blue)
                if (movie.genres.includes("Action")) dotColor = "hsl(0, 80%, 55%)"; // Action (red)
                else if (movie.genres.includes("Romance")) dotColor = "hsl(330, 80%, 65%)"; // Romance (pink)
                else if (movie.genres.includes("Comedy")) dotColor = "hsl(45, 90%, 50%)"; // Comedy (gold)
                else if (movie.genres.includes("Horror") || movie.genres.includes("Mystery")) dotColor = "hsl(280, 80%, 55%)"; // Horror (purple)
                else if (movie.genres.includes("Documentary")) dotColor = "hsl(140, 80%, 45%)"; // Documentary (green)

                return (
                  <div
                    key={movie.id}
                    className="plot-dot"
                    style={{
                      left: x,
                      top: y,
                      backgroundColor: dotColor,
                      boxShadow: `0 0 10px ${dotColor}`,
                      border: `1.5px solid var(--text-primary)`
                    }}
                    title={`${movie.title} (${movie.genres[0]})\nF1: ${f0.toFixed(2)}, F2: ${f1.toFixed(2)}`}
                  />
                );
              })}
            </div>

            {/* Scatter Plot Legend */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: "16px", fontSize: "11px", borderTop: "1px solid var(--border)", paddingTop: "12px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "hsl(210, 80%, 55%)", boxShadow: "0 0 5px hsl(210, 80%, 55%)" }} />
                <span>Sci-Fi & Tech</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "hsl(0, 80%, 55%)", boxShadow: "0 0 5px hsl(0, 80%, 55%)" }} />
                <span>Action & Thrillers</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "hsl(330, 80%, 65%)", boxShadow: "0 0 5px hsl(330, 80%, 65%)" }} />
                <span>Romance & Musicals</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "hsl(45, 90%, 50%)", boxShadow: "0 0 5px hsl(45, 90%, 50%)" }} />
                <span>Comedy & Animation</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "hsl(280, 80%, 55%)", boxShadow: "0 0 5px hsl(280, 80%, 55%)" }} />
                <span>Horror & Mysteries</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "hsl(140, 80%, 45%)", boxShadow: "0 0 5px hsl(140, 80%, 45%)" }} />
                <span>Nature & Documents</span>
              </div>
            </div>
          </div>
        </div>

        {/* User Ratings History Panel */}
        <div className="explanation-section">
          <h3 className="explanation-title">
            Active Profile Ratings History
          </h3>
          <div className="explanation-card" style={{ minHeight: "200px" }}>
            <div className="user-ratings-panel">
              {activeRatings.length > 0 ? (
                activeRatings.map(({ movie, rating }) => (
                  <div key={movie.id} className="rated-movie-row">
                    <div>
                      <span className="rated-title">{movie.title}</span>
                      <div className="rated-genres">{movie.genres.join(", ")}</div>
                    </div>
                    <div className="rated-score">
                      <Star size={14} fill="currentColor" /> {rating} ★
                    </div>
                  </div>
                ))
              ) : (
                <div style={{ textAlign: "center", padding: "40px 0", color: "var(--text-muted)" }}>
                  <p>You haven't rated any movies yet.</p>
                  <p style={{ fontSize: "11px", marginTop: "4px" }}>Click on any movie in the home screen to add reviews.</p>
                </div>
              )}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
