const Follow = require('../models/Follow');
const User = require('../models/User');

// Follow a user
const followUser = async (req, res) => {
  try {
    if (req.user._id.toString() === req.params.userId) {
      return res.status(400).json({ error: "You cannot follow yourself" });
    }

    const follow = await Follow.findOneAndUpdate(
      { follower: req.user._id, following: req.params.userId },
      { isActive: true },
      { upsert: true, new: true }
    );
    res.json(follow);
  } catch (error) {
    res.status(500).json({ error: 'Failed to follow user' });
  }
};

// Unfollow a user
const unfollowUser = async (req, res) => {
  try {
    const follow = await Follow.findOneAndUpdate(
      { follower: req.user._id, following: req.params.userId },
      { isActive: false },
      { new: true }
    );
    res.json({ message: 'Unfollowed user' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to unfollow user' });
  }
};

// Get followers for logged-in user
const getFollowers = async (req, res) => {
  try {
    const followers = await Follow.find({ following: req.user._id, isActive: true }).populate('follower');
    res.json(followers);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch followers' });
  }
};

module.exports = { followUser, unfollowUser, getFollowers };
