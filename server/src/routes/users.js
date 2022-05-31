const express = require('express');
const router = express.Router();
const userController = require('../app/controllers/UserController');

// update user
router.put('/:id', userController.updateUser);

//delete user
router.delete('/:id', userController.deleteUser);

//get one user
router.get('/:id', userController.getUser);

module.exports = router;