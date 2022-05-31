const User = require('../models/User');
const bcrypt = require('bcrypt');

class AuthController {

    //[POST api/auth/register]
    async register(req, res, next) {
        try{
            const salt = await bcrypt.genSalt(10);
            const hashedPass = await bcrypt.hash(req.body.password, salt);
            const newUser = new User({
                username: req.body.username,
                email: req.body.email,
                password: hashedPass,
            });

            const user = await newUser.save();
            res.status(200).json(user);
        }
        catch(err){
           res.status(500).json(err);
        }
    }

    //[POST api/auth/login]
    async login(req, res, next) {
       
        const user = await User.findOne({email: req.body.email});
        !user && res.status(400).json("Wrong credentials!");

        if(user){
            const validated = await bcrypt.compare(req.body.password, user.password);
            !validated && res.status(400).json("Wrong credentials!");
            
            if(validated){
                const {password, ...others} = user._doc;
                res.status(200).json(others);
            }
        }
        
        
        
    }
}

module.exports = new AuthController();