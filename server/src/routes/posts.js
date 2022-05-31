const express = require('express');
const router = express.Router();
const postController = require('../app/controllers/PostController');
const { route } = require('./users');

// create post
router.post('/create', postController.createPost);

// update post
router.put('/:id', postController.updatePost);

// delete post
router.delete('/:id', postController.deletePost);

// get one post
router.get('/:id', postController.getOnePost);

// get many posts
router.get('/', postController.getManyPost);

module.exports = router;