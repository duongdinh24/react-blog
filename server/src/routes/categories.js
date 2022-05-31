const express = require('express');
const router = express.Router();
const categoryController = require('../app/controllers/CategoryController');

//CREATE
router.post('/create', categoryController.createOne);

//GET all
 router.get('/', categoryController.getAll);

module.exports = router;
