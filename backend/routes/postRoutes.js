const express = require('express');
const {
  getPosts,
  createPost,
  updatePost,
  deletePost,
  getMyPosts,
  upvotePost,
  downvotePost,
  getMyFeed
} = require('../controllers/postController');
const protect = require('../middleware/authMiddleware');
const router = express.Router();

router.route('/')
  .get(getPosts)         // Public access
  .post(protect, createPost); // Protected route

router.route('/:id')
  .put(protect, updatePost)    // Protected route
  .delete(protect, deletePost); // Protected route

router.route('/my-posts')
  .get(protect, getMyPosts);   // Protected route

router.route('/upvote/:id')
  .post(protect, upvotePost);  // Protected route

router.route('/downvote/:id')
  .post(protect, downvotePost); // Protected route

router.route('/my-feed')
  .get(protect, getMyFeed);    // Protected route

module.exports = router;
