const express = require('express');
const imageController = require('../controllers/imageController');

const router = express.Router();

router.post('/', imageController.createImage);
router.get('/', imageController.getImages);
router.put('/:imageId', imageController.updateImage);
router.delete('/delete-all', imageController.deleteAllImages);
router.delete('/:imageId', imageController.deleteImage);

module.exports = router;