const express = require('express');
const { getComments, createComment, updateComment, deleteComment } = require('../controllers/commentController');
const protect = require('../middleware/authMiddleware');
const router = express.Router();

router.route('/:id')
  .get(getComments)      // Public access
  .post(protect, createComment); // Protected route

router.route('/:id/:commentId')
  .put(protect, updateComment)    // Protected route
  .delete(protect, deleteComment); // Protected route

module.exports = router;
