const express = require('express');
const { followUser, unfollowUser, getFollowers } = require('../controllers/followController');
const protect = require('../middleware/authMiddleware');
const router = express.Router();

router.route('/:userId')
  .post(protect, followUser)       // Protected route
  .delete(protect, unfollowUser);  // Protected route

router.route('/my-followers')
  .get(protect, getFollowers);    // Protected route

module.exports = router;
