// ========================================
// COMPLETE RATING SERVER
// ========================================
// Ye file ko run karo: node rating-server.js

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/travelfy', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Rating Schema
const ratingSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  userName: { type: String, required: true },
  userEmail: { type: String, required: true },
  tourId: { type: String, required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  comment: { type: String, required: true, trim: true, maxlength: 1000 },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const Rating = mongoose.model('Rating', ratingSchema);

// Authentication Middleware (Adjust based on your auth system)
const authenticateUser = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Access denied. No token provided.'
      });
    }

    // Adjust this based on your JWT setup
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

// Routes
// GET /api/posts/:tourId/ratings
app.get('/api/posts/:tourId/ratings', async (req, res) => {
  try {
    const { tourId } = req.params;
    
    const ratings = await Rating.find({ tourId })
      .sort({ createdAt: -1 })
      .limit(50);

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
app.post('/api/posts/:tourId/ratings', authenticateUser, async (req, res) => {
  try {
    const { tourId } = req.params;
    const { rating, comment, userName, userEmail } = req.body;
    const userId = req.user.id;

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

    const existingRating = await Rating.findOne({ tourId, userId });

    if (existingRating) {
      return res.status(400).json({
        success: false,
        message: 'You have already rated this tour. You can edit your existing rating.'
      });
    }

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
app.put('/api/posts/:tourId/ratings/:ratingId', authenticateUser, async (req, res) => {
  try {
    const { tourId, ratingId } = req.params;
    const { rating, comment } = req.body;
    const userId = req.user.id;

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

    const existingRating = await Rating.findOne({ 
      _id: ratingId,
      tourId,
      userId
    });

    if (!existingRating) {
      return res.status(404).json({
        success: false,
        message: 'Rating not found or you do not have permission to update it'
      });
    }

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
app.delete('/api/posts/:tourId/ratings/:ratingId', authenticateUser, async (req, res) => {
  try {
    const { tourId, ratingId } = req.params;
    const userId = req.user.id;

    const rating = await Rating.findOne({ 
      _id: ratingId,
      tourId,
      userId
    });

    if (!rating) {
      return res.status(404).json({
        success: false,
        message: 'Rating not found or you do not have permission to delete it'
      });
    }

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
app.get('/api/ratings', async (req, res) => {
  try {
    const { limit = 20, page = 1 } = req.query;
    
    const ratings = await Rating.find()
      .sort({ createdAt: -1 })
      .limit(parseInt(limit))
      .skip((parseInt(page) - 1) * parseInt(limit));

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

// Start Server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`🌟 Rating Server running on port ${PORT}`);
  console.log(`📊 Rating API endpoints available at:`);
  console.log(`   GET    /api/posts/:tourId/ratings`);
  console.log(`   POST   /api/posts/:tourId/ratings`);
  console.log(`   PUT    /api/posts/:tourId/ratings/:ratingId`);
  console.log(`   DELETE /api/posts/:tourId/ratings/:ratingId`);
  console.log(`   GET    /api/ratings`);
});

// ========================================
// USAGE INSTRUCTIONS
// ========================================
/*
1. Install dependencies:
   npm install express mongoose cors jsonwebtoken dotenv

2. Create .env file:
   MONGODB_URI=mongodb://localhost:27017/travelfy
   JWT_SECRET=your-secret-key

3. Run server:
   node rating-server.js

4. Server will run on http://localhost:5001

5. Update frontend API URL to:
   https://tour-backend-eight.vercel.app/api
   ya
   http://localhost:5001/api
*/
