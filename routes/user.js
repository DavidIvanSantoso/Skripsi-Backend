const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.route('/')
    .get(userController.getUser)
    .post(userController.createUser)
    .put(userController.updateUser)
    .delete(userController.deleteUser);

router.route('/:userid')
    .get(userController.getUserById);

module.exports = router;
