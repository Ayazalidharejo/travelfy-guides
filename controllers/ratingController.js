// ========================================
// RATING CONTROLLER
// ========================================
// File: controllers/ratingController.js

const Rating = require('../models/Rating');

// Get all ratings for a specific tour
const getRatings = async (req, res) => {
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
};

// Add a new rating for a tour
const addRating = async (req, res) => {
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
};

// Update an existing rating
const updateRating = async (req, res) => {
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
};

// Delete a rating
const deleteRating = async (req, res) => {
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
};

// Get all ratings for homepage (recent ratings across all tours)
const getAllRatings = async (req, res) => {
  try {
    const { limit = 20, page = 1 } = req.query;
    
    const ratings = await Rating.find()
      .sort({ createdAt: -1 })
      .limit(parseInt(limit))
      .skip((parseInt(page) - 1) * parseInt(limit));

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
};

// Update tour rating statistics (helper function)
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

module.exports = {
  getRatings,
  addRating,
  updateRating,
  deleteRating,
  getAllRatings,
  updateTourRatingStats
};
