const Category = require('../models/Category');

class CategoryController {

    // CREATE CATEGORY
    //[POST api/categories/create]
    async createOne(req, res, next) {
        const newCat = new Category(req.body);
        try {
            const oldCat = await Category.findOne({ name: req.body.name });
            if (!oldCat) {
                try {
                    const saveCat = await newCat.save();
                    res.status(200).json(saveCat);
                }
                catch (err) {
                    res.status(500).json(err);
                }

            }
            else {
                res.status(401).json("This category had created before");
            }
        }
        catch (err) {
            res.status(500).json(err);
        }

    }

    // GET ALL CATEGORIES
    // [GET api/categories/]
    async getAll(req, res, next) {
        try {
            const cates = await Category.find();
            res.status(200).json(cates);
        }
        catch (err) {
            res.status(500).json(err);
        }

    }

}

module.exports = new CategoryController();