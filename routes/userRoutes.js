const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

router.post('/', userController.createUser);
router.get('/', userController.getUsers);
router.put('/:userId', userController.updateUser);
router.delete('/delete-all', userController.deleteAllUsers); 
router.delete('/:userId', userController.deleteUser);
router.get('/:id', userController.getUserById);

module.exports = router;