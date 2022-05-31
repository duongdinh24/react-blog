const User = require('../models/User');
const Post = require('../models/Post');
const bcrypt = require('bcrypt');
const convertToSlug = require('../../utils/convertToSlug');
class UserController {

    //[PUT api/users/:id]
    async updateUser(req, res, next) {
        if (req.body.userId === req.params.id) {
            if (req.body.password) {
                const salt = await bcrypt.genSalt(10);
                req.body.password = await bcrypt.hash(req.body.password, salt);
                const updateUser = {
                    username: req.body.username,
                    email: req.body.email,
                    password: req.body.password,
                }
                if(req.body.profilePic){
                    
                    updateUser.profilePic = convertToSlug(req.body.profilePic);
                }

                try {
                    const updatedUser = await User.findByIdAndUpdate(
                         req.params.id,
                        updateUser,
                        { new: true, }
                    );
                    const { password, ...others } = updatedUser._doc;
                    res.status(200).json(others);
                }
                catch (err) {
                    res.status(500).json(err);
                }
            }
            else {
                res.status(401).json("Password is required");
            }
        }
        else {
            res.status(401).json("You can update only your account");
        }
    }

    // [DELETE api/users/:id]
    async deleteUser(req, res, next) {
        if (req.body.userId === req.params.id) {
            const user = await User.findById(req.params.id);
            if (user) {
                try {
                    await Post.deleteMany({ username: user.username });
                    await User.findByIdAndDelete(req.params.id);
                    res.status(200).json("User has been deleted");
                }
                catch (err) {
                    res.status(500).json(err);
                }
            }
            else {
                res.status(404).json("User not found");
            }
        }
        else {
            res.status(401).json("You can delter only your account");
        }
    }

    //[GET api/users/:id ]
    async getUser(req, res, next) {
        try {
            const user = await User.findById(req.params.id);
            const { password, ...others } = user._doc;
            res.status(200).json(others);
        }
        catch (err) {
            res.status(500).json(err);
        }
    }

}

module.exports = new UserController();