// ========================================
// RATING MODEL
// ========================================
// File: models/Rating.js

const mongoose = require('mongoose');

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

// Index for better performance
ratingSchema.index({ tourId: 1, createdAt: -1 });
ratingSchema.index({ userId: 1, tourId: 1 }, { unique: true });

module.exports = mongoose.model('Rating', ratingSchema);
