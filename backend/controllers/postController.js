const Post = require('../models/Post');
const Follow = require('../models/Follow');

 

// Get a feed of posts from users followed by the logged-in user
const getMyFeed = async (req, res) => {
  const { page = 1, limit = 10, sortBy = 'createdAt', order = 'desc' } = req.query;
  
  try {
    // Get the list of user IDs the logged-in user follows
    const follows = await Follow.find({ follower: req.user._id }).select('following');
    const followingUserIds = follows.map(f => f.following);

    const posts = await Post.find({ createdBy: { $in: followingUserIds }, isActive: true })
      .sort({ [sortBy]: order === 'desc' ? -1 : 1 })
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch feed' });
  }
};



// Get a list of posts with pagination and sorting options
const getPosts = async (req, res) => {
  const { page = 1, limit = 10, sortBy = 'createdAt', order = 'desc' } = req.query;
  try {
    const posts = await Post.find({ isActive: true })
      .sort({ [sortBy]: order === 'desc' ? -1 : 1 })
      .skip((page - 1) * limit)
      .limit(parseInt(limit));
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch posts' });
  }
};

// Create a new post
const createPost = async (req, res) => {
  try {
    const post = await Post.create({ ...req.body, createdBy: req.user._id });
    res.status(201).json(post);
  } catch (error) {
    res.status(400).json({ error: 'Failed to create post' });
  }
};

// Update a post (only creator can update)
const updatePost = async (req, res) => {
  try {
    const post = await Post.findOneAndUpdate(
      { _id: req.params.id, createdBy: req.user._id },
      req.body,
      { new: true }
    );
    if (!post) return res.status(403).json({ error: 'Unauthorized or Post not found' });
    res.json(post);
  } catch (error) {
    res.status(400).json({ error: 'Failed to update post' });
  }
};

// Soft delete a post (only creator can delete)
const deletePost = async (req, res) => {
  try {
    const post = await Post.findOneAndUpdate(
      { _id: req.params.id, createdBy: req.user._id },
      { isActive: false },
      { new: true }
    );
    if (!post) return res.status(403).json({ error: 'Unauthorized or Post not found' });
    res.json({ message: 'Post deactivated' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete post' });
  }
};

// Get posts created by logged-in user
const getMyPosts = async (req, res) => {
  try {
    const posts = await Post.find({ createdBy: req.user._id, isActive: true });
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch user posts' });
  }
};

// Upvote a post or comment
const upvotePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) return res.status(404).json({ error: 'Post not found' });

    if (!post.upvotes.includes(req.user._id)) {
      post.upvotes.push(req.user._id);
      post.votes += 1;
      
      // Remove from downvotes if present
      post.downvotes = post.downvotes.filter(
        (userId) => userId.toString() !== req.user._id.toString()
      );

      await post.save();
    }

    res.json(post);
  } catch (error) {
    res.status(500).json({ error: 'Failed to upvote post' });
  }
};

// Downvote a post or comment
const downvotePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) return res.status(404).json({ error: 'Post not found' });

    if (!post.downvotes.includes(req.user._id)) {
      post.downvotes.push(req.user._id);
      post.votes -= 1;
      
      // Remove from upvotes if present
      post.upvotes = post.upvotes.filter(
        (userId) => userId.toString() !== req.user._id.toString()
      );

      await post.save();
    }

    res.json(post);
  } catch (error) {
    res.status(500).json({ error: 'Failed to downvote post' });
  }
};




module.exports = { getPosts, createPost, updatePost, deletePost, getMyPosts, getMyFeed, upvotePost, downvotePost};
