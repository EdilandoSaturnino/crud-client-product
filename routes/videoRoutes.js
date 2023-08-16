const express = require('express');
const videoController = require('../controllers/videoController');

const router = express.Router();

router.post('/', videoController.createVideo);
router.get('/', videoController.getVideos);
router.put('/:videoId', videoController.updateVideo);
router.delete('/delete-all', videoController.deleteAllVideos);
router.delete('/:videoId', videoController.deleteVideo);

module.exports = router;