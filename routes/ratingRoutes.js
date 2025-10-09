// ========================================
// RATING ROUTES
// ========================================
// File: routes/ratingRoutes.js

const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

// Import rating controller
const {
  getRatings,
  addRating,
  updateRating,
  deleteRating,
  getAllRatings
} = require('../controllers/ratingController');

// Authentication Middleware
const authenticateUser = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Access denied. No token provided.'
      });
    }

    // Verify token (adjust based on your JWT setup)
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      message: 'Invalid token.'
    });
  }
};

// ========================================
// RATING ROUTES
// ========================================

// GET /api/posts/:tourId/ratings
// Get all ratings for a specific tour
router.get('/posts/:tourId/ratings', getRatings);

// POST /api/posts/:tourId/ratings
// Add a new rating for a tour (requires authentication)
router.post('/posts/:tourId/ratings', authenticateUser, addRating);

// PUT /api/posts/:tourId/ratings/:ratingId
// Update an existing rating (requires authentication)
router.put('/posts/:tourId/ratings/:ratingId', authenticateUser, updateRating);

// DELETE /api/posts/:tourId/ratings/:ratingId
// Delete a rating (requires authentication)
router.delete('/posts/:tourId/ratings/:ratingId', authenticateUser, deleteRating);

// GET /api/ratings
// Get all ratings for homepage (recent ratings across all tours)
router.get('/ratings', getAllRatings);

// ========================================
// ROUTE INFO (for debugging)
// ========================================
router.get('/rating-routes-info', (req, res) => {
  res.json({
    success: true,
    message: 'Rating routes are working!',
    availableRoutes: [
      'GET /api/posts/:tourId/ratings - Get all ratings for a tour',
      'POST /api/posts/:tourId/ratings - Add new rating (auth required)',
      'PUT /api/posts/:tourId/ratings/:ratingId - Update rating (auth required)',
      'DELETE /api/posts/:tourId/ratings/:ratingId - Delete rating (auth required)',
      'GET /api/ratings - Get all ratings for homepage'
    ]
  });
});

module.exports = router;
