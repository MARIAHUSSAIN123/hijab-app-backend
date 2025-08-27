// routes/reviews.js
const express = require('express');
const router = express.Router();
const Review = require('../models/Review');
const HijabStyle = require('../models/HijabStyle');
const auth = require('../middleware/authMiddleware');

// POST a new review
router.post('/:hijabId', auth, async (req, res) => {
  const { text, rating } = req.body;
  const hijabId = req.params.hijabId;

  try {
    const review = new Review({
      text,
      rating,
      hijabStyle: hijabId,
      user: req.user
    });

    await review.save();

    // Update HijabStyle's review array
    const hijab = await HijabStyle.findById(hijabId);
    hijab.reviews.push(review._id);

    // Recalculate average rating
    const allReviews = await Review.find({ hijabStyle: hijabId });
    const avgRating =
      allReviews.reduce((sum, r) => sum + r.rating, 0) / allReviews.length;

    hijab.avgRating = avgRating.toFixed(1);
    await hijab.save();

    res.status(201).json(review);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// ✅ GET reviews for a hijab
router.get('/:hijabId', async (req, res) => {
  try {
    const reviews = await Review.find({ hijabStyle: req.params.hijabId })
      .populate('user', 'email');
    res.json(reviews);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
