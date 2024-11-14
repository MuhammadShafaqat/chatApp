const Comment = require('../models/Comment');

// Get comments for a specific post with pagination
const getComments = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  try {
    const comments = await Comment.find({ postId: req.params.id, isActive: true })
      .skip((page - 1) * limit)
      .limit(parseInt(limit));
    res.json(comments);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch comments' });
  }
};

// Add a new comment
const createComment = async (req, res) => {
  try {
    const comment = await Comment.create({ ...req.body, createdBy: req.user._id, postId: req.params.id });
    res.status(201).json(comment);
  } catch (error) {
    res.status(400).json({ error: 'Failed to create comment' });
  }
};

// Update a comment (only creator can update)
const updateComment = async (req, res) => {
  try {
    const comment = await Comment.findOneAndUpdate(
      { _id: req.params.commentId, createdBy: req.user._id },
      req.body,
      { new: true }
    );
    if (!comment) return res.status(403).json({ error: 'Unauthorized or Comment not found' });
    res.json(comment);
  } catch (error) {
    res.status(400).json({ error: 'Failed to update comment' });
  }
};

// Soft delete a comment (only creator can delete)
const deleteComment = async (req, res) => {
  try {
    const comment = await Comment.findOneAndUpdate(
      { _id: req.params.commentId, createdBy: req.user._id },
      { isActive: false },
      { new: true }
    );
    if (!comment) return res.status(403).json({ error: 'Unauthorized or Comment not found' });
    res.json({ message: 'Comment deactivated' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete comment' });
  }
};

module.exports = { getComments, createComment, updateComment, deleteComment };
