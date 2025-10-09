// ========================================
// RATING SYSTEM BACKEND CODE
// ========================================
// Add this code to your backend server

const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

// ========================================
// RATING SCHEMA
// ========================================
const ratingSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    ref: 'User'
  },
  userName: {
    type: String,
    required: true
  },
  userEmail: {
    type: String,
    required: true
  },
  tourId: {
    type: String,
    required: true,
    ref: 'Post'
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  comment: {
    type: String,
    required: true,
    trim: true,
    maxlength: 1000
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update updatedAt on save
ratingSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

const Rating = mongoose.model('Rating', ratingSchema);

// ========================================
// MIDDLEWARE
// ========================================
const authenticateUser = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Access denied. No token provided.'
      });
    }

    // Verify token (adjust based on your auth system)
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
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
router.get('/posts/:tourId/ratings', async (req, res) => {
  try {
    const { tourId } = req.params;
    
    const ratings = await Rating.find({ tourId })
      .sort({ createdAt: -1 })
      .limit(50); // Limit to prevent large responses

    // Calculate statistics
    const totalRatings = ratings.length;
    const averageRating = totalRatings > 0 
      ? ratings.reduce((sum, rating) => sum + rating.rating, 0) / totalRatings 
      : 0;

    const ratingDistribution = {
      5: ratings.filter(r => r.rating === 5).length,
      4: ratings.filter(r => r.rating === 4).length,
      3: ratings.filter(r => r.rating === 3).length,
      2: ratings.filter(r => r.rating === 2).length,
      1: ratings.filter(r => r.rating === 1).length
    };

    res.json({
      success: true,
      data: ratings,
      statistics: {
        totalRatings,
        averageRating: Math.round(averageRating * 10) / 10,
        ratingDistribution
      }
    });

  } catch (error) {
    console.error('Error fetching ratings:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch ratings',
      error: error.message
    });
  }
});

// POST /api/posts/:tourId/ratings
// Add a new rating for a tour
router.post('/posts/:tourId/ratings', authenticateUser, async (req, res) => {
  try {
    const { tourId } = req.params;
    const { rating, comment, userName, userEmail } = req.body;
    const userId = req.user.id;

    // Validation
    if (!rating || rating < 1 || rating > 5) {
      return res.status(400).json({
        success: false,
        message: 'Rating must be between 1 and 5'
      });
    }

    if (!comment || comment.trim().length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Comment is required'
      });
    }

    if (comment.trim().length > 1000) {
      return res.status(400).json({
        success: false,
        message: 'Comment must be less than 1000 characters'
      });
    }

    // Check if user already rated this tour
    const existingRating = await Rating.findOne({ 
      tourId, 
      userId 
    });

    if (existingRating) {
      return res.status(400).json({
        success: false,
        message: 'You have already rated this tour. You can edit your existing rating.'
      });
    }

    // Create new rating
    const newRating = new Rating({
      userId,
      userName: userName || req.user.name || 'Anonymous',
      userEmail: userEmail || req.user.email || '',
      tourId,
      rating,
      comment: comment.trim()
    });

    await newRating.save();

    res.status(201).json({
      success: true,
      message: 'Rating added successfully',
      data: newRating
    });

  } catch (error) {
    console.error('Error adding rating:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to add rating',
      error: error.message
    });
  }
});

// PUT /api/posts/:tourId/ratings/:ratingId
// Update an existing rating
router.put('/posts/:tourId/ratings/:ratingId', authenticateUser, async (req, res) => {
  try {
    const { tourId, ratingId } = req.params;
    const { rating, comment } = req.body;
    const userId = req.user.id;

    // Validation
    if (!rating || rating < 1 || rating > 5) {
      return res.status(400).json({
        success: false,
        message: 'Rating must be between 1 and 5'
      });
    }

    if (!comment || comment.trim().length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Comment is required'
      });
    }

    if (comment.trim().length > 1000) {
      return res.status(400).json({
        success: false,
        message: 'Comment must be less than 1000 characters'
      });
    }

    // Find the rating
    const existingRating = await Rating.findOne({ 
      _id: ratingId,
      tourId,
      userId // Ensure user can only update their own rating
    });

    if (!existingRating) {
      return res.status(404).json({
        success: false,
        message: 'Rating not found or you do not have permission to update it'
      });
    }

    // Update the rating
    existingRating.rating = rating;
    existingRating.comment = comment.trim();
    existingRating.updatedAt = new Date();

    await existingRating.save();

    res.json({
      success: true,
      message: 'Rating updated successfully',
      data: existingRating
    });

  } catch (error) {
    console.error('Error updating rating:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update rating',
      error: error.message
    });
  }
});

// DELETE /api/posts/:tourId/ratings/:ratingId
// Delete a rating
router.delete('/posts/:tourId/ratings/:ratingId', authenticateUser, async (req, res) => {
  try {
    const { tourId, ratingId } = req.params;
    const userId = req.user.id;

    // Find the rating
    const rating = await Rating.findOne({ 
      _id: ratingId,
      tourId,
      userId // Ensure user can only delete their own rating
    });

    if (!rating) {
      return res.status(404).json({
        success: false,
        message: 'Rating not found or you do not have permission to delete it'
      });
    }

    // Delete the rating
    await Rating.findByIdAndDelete(ratingId);

    res.json({
      success: true,
      message: 'Rating deleted successfully'
    });

  } catch (error) {
    console.error('Error deleting rating:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete rating',
      error: error.message
    });
  }
});

// GET /api/ratings
// Get all ratings for homepage (recent ratings across all tours)
router.get('/ratings', async (req, res) => {
  try {
    const { limit = 20, page = 1 } = req.query;
    
    const ratings = await Rating.find()
      .sort({ createdAt: -1 })
      .limit(parseInt(limit))
      .skip((parseInt(page) - 1) * parseInt(limit))
      .populate('tourId', 'title mainImage'); // Populate tour info

    // Get overall statistics
    const totalRatings = await Rating.countDocuments();
    const averageRating = await Rating.aggregate([
      { $group: { _id: null, avgRating: { $avg: '$rating' } } }
    ]);

    res.json({
      success: true,
      data: ratings,
      statistics: {
        totalRatings,
        averageRating: averageRating.length > 0 ? Math.round(averageRating[0].avgRating * 10) / 10 : 0
      },
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total: totalRatings
      }
    });

  } catch (error) {
    console.error('Error fetching all ratings:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch ratings',
      error: error.message
    });
  }
});

// ========================================
// TOUR STATISTICS UPDATE
// ========================================
// This function can be called to update tour statistics
const updateTourRatingStats = async (tourId) => {
  try {
    const ratings = await Rating.find({ tourId });
    
    if (ratings.length === 0) {
      return {
        totalRatings: 0,
        averageRating: 0,
        ratingDistribution: { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 }
      };
    }

    const totalRatings = ratings.length;
    const averageRating = ratings.reduce((sum, rating) => sum + rating.rating, 0) / totalRatings;
    
    const ratingDistribution = {
      5: ratings.filter(r => r.rating === 5).length,
      4: ratings.filter(r => r.rating === 4).length,
      3: ratings.filter(r => r.rating === 3).length,
      2: ratings.filter(r => r.rating === 2).length,
      1: ratings.filter(r => r.rating === 1).length
    };

    // Update tour document with rating stats (if you have a Tour/Post model)
    // await Post.findByIdAndUpdate(tourId, {
    //   ratingStats: {
    //     totalRatings,
    //     averageRating: Math.round(averageRating * 10) / 10,
    //     ratingDistribution
    //   }
    // });

    return {
      totalRatings,
      averageRating: Math.round(averageRating * 10) / 10,
      ratingDistribution
    };

  } catch (error) {
    console.error('Error updating tour rating stats:', error);
    throw error;
  }
};

// ========================================
// EXPORT ROUTES
// ========================================
module.exports = router;

// ========================================
// USAGE INSTRUCTIONS
// ========================================
/*
1. Add this file to your backend project
2. Import and use in your main server file:

const ratingRoutes = require('./path/to/this/file');
app.use('/api', ratingRoutes);

3. Make sure you have:
   - mongoose connected
   - JWT authentication working
   - User model with id field
   - Post/Tour model (optional for population)

4. The routes will be available at:
   - GET /api/posts/:tourId/ratings
   - POST /api/posts/:tourId/ratings
   - PUT /api/posts/:tourId/ratings/:ratingId
   - DELETE /api/posts/:tourId/ratings/:ratingId
   - GET /api/ratings

5. Frontend is already configured to use these endpoints!
*/
