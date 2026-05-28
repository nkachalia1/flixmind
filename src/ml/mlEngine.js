// FlixMind Client-Side Machine Learning Recommendation Engine

// 1. Text Processing & Tokenization Helpers
const STOP_WORDS = new Set([
  "a", "about", "above", "after", "again", "against", "all", "am", "an", "and", "any", "are", "arent", "as", "at",
  "be", "because", "been", "before", "being", "below", "between", "both", "but", "by", "cant", "cannot", "could",
  "couldnt", "did", "didnt", "do", "does", "doesnt", "doing", "dont", "down", "during", "each", "few", "for", "from",
  "further", "had", "hadnt", "has", "hasnt", "have", "havent", "having", "he", "hed", "hell", "hes", "her", "here",
  "heres", "hers", "herself", "him", "himself", "his", "how", "hows", "i", "id", "ill", "im", "ive", "if", "in",
  "into", "is", "isnt", "it", "its", "itself", "lets", "me", "more", "most", "mustnt", "my", "myself", "no", "nor",
  "not", "of", "off", "on", "once", "only", "or", "other", "ought", "our", "ours", "ourselves", "out", "over", "own",
  "same", "shant", "she", "shed", "shell", "shes", "should", "shouldnt", "so", "some", "such", "than", "that",
  "thats", "the", "their", "theirs", "them", "themselves", "then", "there", "theres", "these", "they", "theyd",
  "theyll", "theyre", "theyve", "this", "those", "through", "to", "too", "under", "until", "up", "very", "was",
  "wasnt", "we", "wed", "well", "were", "weve", "werent", "what", "whats", "when", "whens", "where", "wheres",
  "which", "while", "who", "whos", "whom", "why", "whys", "with", "wont", "would", "wouldnt", "you", "youd",
  "youll", "youre", "youve", "your", "yours", "yourself", "yourselves"
]);

export function cleanAndTokenize(text) {
  if (!text) return [];
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "") // strip punctuation
    .split(/\s+/)
    .filter(word => word.length > 2 && !STOP_WORDS.has(word));
}

// 2. TF-IDF Implementation for Content-Based Filtering
export class TFIDF {
  constructor() {
    this.vocabulary = [];
    this.vocabIndex = {};
    this.idf = {};
    this.isTrained = false;
  }

  fit(documents) {
    const termDocCounts = {};
    const numDocs = documents.length;

    // Tokenize documents and build vocabulary counts
    documents.forEach(doc => {
      const tokens = cleanAndTokenize(doc);
      const uniqueTokens = new Set(tokens);
      
      uniqueTokens.forEach(token => {
        termDocCounts[token] = (termDocCounts[token] || 0) + 1;
      });
    });

    // Create vocabulary of terms that appear in at least 1 document
    this.vocabulary = Object.keys(termDocCounts);
    this.vocabulary.forEach((term, index) => {
      this.vocabIndex[term] = index;
      
      // Calculate IDF: log(N / (df + 1)) + 1
      const df = termDocCounts[term];
      this.idf[term] = Math.log(numDocs / (df + 1)) + 1;
    });

    this.isTrained = true;
  }

  transform(document) {
    if (!this.isTrained) throw new Error("TF-IDF must be fitted before transforming documents.");

    const tokens = cleanAndTokenize(document);
    const vector = new Array(this.vocabulary.length).fill(0);
    
    // Count Term Frequencies (TF)
    const tokenCounts = {};
    tokens.forEach(token => {
      if (token in this.vocabIndex) {
        tokenCounts[token] = (tokenCounts[token] || 0) + 1;
      }
    });

    // Compute TF-IDF weight = TF * IDF
    const totalTokens = tokens.length || 1;
    Object.keys(tokenCounts).forEach(term => {
      const idx = this.vocabIndex[term];
      const tf = tokenCounts[term] / totalTokens;
      vector[idx] = tf * this.idf[term];
    });

    return vector;
  }

  getKeywordsForDocument(document, topN = 5) {
    const tokens = cleanAndTokenize(document);
    const weights = [];

    const tokenCounts = {};
    tokens.forEach(token => {
      if (token in this.vocabIndex) {
        tokenCounts[token] = (tokenCounts[token] || 0) + 1;
      }
    });

    const totalTokens = tokens.length || 1;
    Object.keys(tokenCounts).forEach(term => {
      const tf = tokenCounts[term] / totalTokens;
      const weight = tf * this.idf[term];
      weights.push({ term, weight });
    });

    return weights
      .sort((a, b) => b.weight - a.weight)
      .slice(0, topN);
  }
}

// 3. Mathematical Vector Helpers
export function dotProduct(vecA, vecB) {
  let dot = 0;
  for (let i = 0; i < vecA.length; i++) {
    dot += vecA[i] * vecB[i];
  }
  return dot;
}

export function magnitude(vec) {
  let sumSq = 0;
  for (let i = 0; i < vec.length; i++) {
    sumSq += vec[i] * vec[i];
  }
  return Math.sqrt(sumSq);
}

export function cosineSimilarity(vecA, vecB) {
  const magA = magnitude(vecA);
  const magB = magnitude(vecB);
  if (magA === 0 || magB === 0) return 0;
  return dotProduct(vecA, vecB) / (magA * magB);
}

// Jaccard similarity for categoricals like genres
export function jaccardSimilarity(arrA, arrB) {
  const setA = new Set(arrA);
  const setB = new Set(arrB);
  const intersection = new Set([...setA].filter(x => setB.has(x)));
  const union = new Set([...setA, ...setB]);
  if (union.size === 0) return 0;
  return intersection.size / union.size;
}

// Compute comprehensive Content-Based Similarity Matrix
export function computeContentSimilarities(movies) {
  // Create unified content string (synopsis + tags + genres)
  const documents = movies.map(m => {
    return `${m.description} ${m.tags.join(" ")} ${m.genres.join(" ")}`;
  });

  const tfidf = new TFIDF();
  tfidf.fit(documents);

  const vectors = documents.map(doc => tfidf.transform(doc));
  const matrix = {};

  for (let i = 0; i < movies.length; i++) {
    const movieA = movies[i];
    matrix[movieA.id] = {};

    for (let j = 0; j < movies.length; j++) {
      const movieB = movies[j];

      if (i === j) {
        matrix[movieA.id][movieB.id] = 1.0;
        continue;
      }

      // 1. Text Similarity (TF-IDF Cosine Similarity) - Weight: 50%
      const textSim = cosineSimilarity(vectors[i], vectors[j]);

      // 2. Genre Similarity (Jaccard Similarity) - Weight: 30%
      const genreSim = jaccardSimilarity(movieA.genres, movieB.genres);

      // 3. Director Match - Weight: 10%
      const directorSim = movieA.director === movieB.director ? 1.0 : 0.0;

      // 4. Cast Intersection - Weight: 10%
      const castSim = jaccardSimilarity(movieA.cast, movieB.cast);

      // Weighted score
      const hybridSim = (textSim * 0.5) + (genreSim * 0.3) + (directorSim * 0.1) + (castSim * 0.1);
      matrix[movieA.id][movieB.id] = parseFloat(hybridSim.toFixed(4));
    }
  }

  return { matrix, tfidf };
}

// 4. Collaborative Filtering Matrix Factorization (SVD) with Stochastic Gradient Descent (SGD)
export class SVDRecommender {
  constructor(numUsers, numItems, numFactors = 6, lr = 0.015, reg = 0.02) {
    this.numFactors = numFactors;
    this.lr = lr; // Learning rate
    this.reg = reg; // Regularization parameter

    this.globalMean = 3.5;
    this.userBiases = {};
    this.itemBiases = {};
    
    // User and Item Latent Feature Matrices
    this.userFactors = {};
    this.itemFactors = {};

    this.trainingHistory = [];
  }

  // Initialize weights with small random values
  initModel(userIds, itemIds) {
    this.userBiases = {};
    this.itemBiases = {};
    this.userFactors = {};
    this.itemFactors = {};
    this.trainingHistory = [];

    userIds.forEach(uid => {
      this.userBiases[uid] = 0.0;
      this.userFactors[uid] = Array.from({ length: this.numFactors }, () => (Math.random() - 0.5) * 0.1);
    });

    itemIds.forEach(iid => {
      this.itemBiases[iid] = 0.0;
      this.itemFactors[iid] = Array.from({ length: this.numFactors }, () => (Math.random() - 0.5) * 0.1);
    });
  }

  // Predict rating for a user and item
  // Formula: Prediction = globalMean + userBias + itemBias + dot(userFactors, itemFactors)
  predict(userId, itemId) {
    // Return mean if new item/user (cold-start mitigation)
    const uBias = this.userBiases[userId] !== undefined ? this.userBiases[userId] : 0.0;
    const iBias = this.itemBiases[itemId] !== undefined ? this.itemBiases[itemId] : 0.0;
    const uFactors = this.userFactors[userId] || new Array(this.numFactors).fill(0);
    const iFactors = this.itemFactors[itemId] || new Array(this.numFactors).fill(0);

    const dot = dotProduct(uFactors, iFactors);
    let pred = this.globalMean + uBias + iBias + dot;
    
    // Clamp predicted rating to [1, 5]
    return Math.max(1, Math.min(5, pred));
  }

  // Run a single training epoch across all provided ratings
  // ratings: array of { userId, itemId, rating }
  trainEpoch(ratings) {
    // 1. Calculate global average
    if (ratings.length > 0) {
      const sum = ratings.reduce((acc, r) => acc + r.rating, 0);
      this.globalMean = sum / ratings.length;
    }

    let squaredErrorSum = 0;

    // Shuffle ratings for better SGD convergence
    const shuffledRatings = [...ratings].sort(() => Math.random() - 0.5);

    shuffledRatings.forEach(({ userId, itemId, rating }) => {
      // Ensure dimensions exist (dynamic registration)
      if (this.userBiases[userId] === undefined) {
        this.userBiases[userId] = 0.0;
        this.userFactors[userId] = Array.from({ length: this.numFactors }, () => (Math.random() - 0.5) * 0.1);
      }
      if (this.itemBiases[itemId] === undefined) {
        this.itemBiases[itemId] = 0.0;
        this.itemFactors[itemId] = Array.from({ length: this.numFactors }, () => (Math.random() - 0.5) * 0.1);
      }

      const pred = this.predict(userId, itemId);
      const err = rating - pred;
      
      squaredErrorSum += err * err;

      // Update biases
      this.userBiases[userId] += this.lr * (err - this.reg * this.userBiases[userId]);
      this.itemBiases[itemId] += this.lr * (err - this.reg * this.itemBiases[itemId]);

      // Update latent factors
      const P_u = this.userFactors[userId];
      const Q_i = this.itemFactors[itemId];

      for (let f = 0; f < this.numFactors; f++) {
        const p_uf = P_u[f];
        const q_if = Q_i[f];

        P_u[f] += this.lr * (err * q_if - this.reg * p_uf);
        Q_i[f] += this.lr * (err * p_uf - this.reg * q_if);
      }
    });

    const rmse = Math.sqrt(squaredErrorSum / ratings.length);
    this.trainingHistory.push(parseFloat(rmse.toFixed(4)));
    return rmse;
  }

  // Train for multiple epochs
  fit(ratings, userIds, itemIds, epochs = 40) {
    this.initModel(userIds, itemIds);
    for (let epoch = 0; epoch < epochs; epoch++) {
      this.trainEpoch(ratings);
    }
    return this.trainingHistory;
  }
}

// 5. Hybrid Recommendation Blender
// Blends Content-Based lists and SVD-predicted ratings
export function generateHybridRecommendations({
  activeUserId,
  userRatings,      // current ratings of active user { movieId: score }
  allMovies,
  ratingsDatabase,  // full flat array of { userId, itemId, rating } for historical users
  similarityMatrix, // precomputed content similarity matrix
  svdModel,         // trained SVDRecommender
  contentWeight = 0.4
}) {
  const recommendations = [];
  const ratedMovieIds = new Set(Object.keys(userRatings).map(Number));

  // Determine user positive profile vectors for content-based recommendations
  // Content affinities are derived from movies rated >= 3.5 stars
  const highRatedMovies = [];
  const lowRatedMovies = [];

  Object.entries(userRatings).forEach(([movieIdStr, score]) => {
    const movieId = Number(movieIdStr);
    if (score >= 3.5) {
      highRatedMovies.push({ id: movieId, weight: score - 3 }); // weight high scores more
    } else if (score <= 2.5) {
      lowRatedMovies.push({ id: movieId, weight: 3 - score }); // weight lower scores
    }
  });

  allMovies.forEach(movie => {
    // Skip movies already rated by the user
    if (ratedMovieIds.has(movie.id)) return;

    // A. Compute Content Similarity Score (average similarity to user's liked movies minus disliked movies)
    let contentScore = 0.0;
    
    if (highRatedMovies.length > 0) {
      let positiveSimSum = 0;
      let positiveWeightSum = 0;

      highRatedMovies.forEach(liked => {
        const sim = similarityMatrix[movie.id]?.[liked.id] || 0;
        positiveSimSum += sim * liked.weight;
        positiveWeightSum += liked.weight;
      });

      let positiveScore = positiveSimSum / positiveWeightSum;

      // Penalize similarity to disliked movies
      let negativeScore = 0;
      if (lowRatedMovies.length > 0) {
        let negativeSimSum = 0;
        let negativeWeightSum = 0;

        lowRatedMovies.forEach(disliked => {
          const sim = similarityMatrix[movie.id]?.[disliked.id] || 0;
          negativeSimSum += sim * disliked.weight;
          negativeWeightSum += disliked.weight;
        });
        negativeScore = negativeSimSum / negativeWeightSum;
      }

      contentScore = Math.max(0, positiveScore - (negativeScore * 0.4));
    } else {
      // Cold-start fallback for content: popularity and baseline scores
      contentScore = movie.rating / 5.0; // scale 0-1
    }

    // B. Compute Collaborative SVD Prediction Score (scaled to [0,1] range)
    // SVD prediction is on scale 1 to 5
    const predictedRating = svdModel.predict(activeUserId, movie.id);
    const collabScore = (predictedRating - 1) / 4.0; // scale to 0-1

    // C. Combine into Hybrid Score
    const hybridScore = (contentScore * contentWeight) + (collabScore * (1 - contentWeight));

    recommendations.push({
      movie,
      scores: {
        content: parseFloat(contentScore.toFixed(3)),
        collab: parseFloat(collabScore.toFixed(3)),
        predictedRating: parseFloat(predictedRating.toFixed(2)),
        hybrid: parseFloat(hybridScore.toFixed(3))
      }
    });
  });

  // Sort recommendations descending by hybrid score
  return recommendations.sort((a, b) => b.scores.hybrid - a.scores.hybrid);
}
