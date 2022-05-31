// const User = require('../models/User');
const { post } = require('../../routes/users');
const Post = require('../models/Post');
const convertToSlug = require('../../utils/convertToSlug');
class PostController {

    // CREATE POST
    // [POST api/posts/create]
    async createPost(req, res, next) {
        const newPost = new Post({
            username: req.body.username,
            title: req.body.title,
            desc: req.body.desc,
            photo: convertToSlug(req.body.photo)
        });

        try {
            const savedPost = await newPost.save();
            res.status(200).json(savedPost);
        }
        catch (err) {
            res.status(500).json(err);
        }
    }

    // UPDATE POST
    // [PUT api/posts/:id]
    async updatePost(req, res, next) {
        try {
            const post = await Post.findById(req.params.id);
            if (post.username === req.body.username) {
                try {
                    const updatePost = await Post.findByIdAndUpdate(
                        req.params.id,
                        {
                            $set: req.body,
                        },
                        { new: true }
                    );

                    res.status(200).json(updatePost);
                }
                catch (err) {
                    res.status(500).json(err);
                }
            }
            else {
                res.status(401).json("You can update only your post");
            }
        }
        catch (err) {
            res.status(500).json(err);
        }
    }

    // DELETE POST     
    // [DELETE api/posts/:id]
    async deletePost(req, res, next) {
        try {
            const post = await Post.findById(req.params.id);
            console.log(req.body.username + " " + post.username)
            if (post.username === req.body.username) {
                try {
                    await post.delete();
                    res.status(200).json("Post has been deleted...");
                }
                catch (err) {
                    res.status(500).json(err);
                }
            }
            else {
                res.status(401).json("You can delete only your post!");
            }
        }
        catch (err) {
            res.status(500).json(err);
        }
    }

    // GET one POST
    //[GET api/posts/:id ]
    async getOnePost(req, res, next) {
        try {
            const post = await Post.findById(req.params.id);
            res.status(200).json(post);
        }
        catch (err) {
            res.status(500).json(err);
        }
    }

    // GET many POSTS
    // [GET api/posts/?user=]
    // [GET api/posts/?cat=]
    // [GET api/posts/]

    async getManyPost(req, res, next) {
        const username = req.query.user;
        const cateName = req.query.cat;
        try {
            let posts;
            if(username) {
                posts = await Post.find({ username }); 
            }
            else if(cateName) {
                posts = await Post.find({
                    categories: {
                        $in: [cateName],
                    },
                });
            }
            else {
                posts = await Post.find();
            }
            res.status(200).json(posts);
        }
        catch(err) {
            res.status(500).json(err);
        }
    }

}

module.exports = new PostController();