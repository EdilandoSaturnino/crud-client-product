const Video = require('../models/Video');

exports.createVideo = async (req, res) => {
    try {
        const { url } = req.body;
        const newVideo = await Video.create({ url });
        res.json(newVideo);
    } catch (err) {
        res.status(500).json({ error: 'Failed to create video' });
    }
};

exports.getVideos = async (req, res) => {
    try {
        const videos = await Video.find();
        res.json(videos);
    } catch (err) {
        res.status(500).json({ error: 'Failed to retrieve videos' });
    }
};

exports.updateVideo = async (req, res) => {
    try {
        const { videoId } = req.params;
        const { url } = req.body;

        const updatedVideo = await Video.findByIdAndUpdate(videoId, { url }, { new: true });

        if (!updatedVideo) {
            return res.status(404).json({ error: 'Video not found' });
        }

        res.json(updatedVideo);
    } catch (err) {
        res.status(500).json({ error: 'Failed to update video' });
    }
};

exports.deleteVideo = async (req, res) => {
    try {
        const { videoId } = req.params;

        const deletedVideo = await Video.findByIdAndDelete(videoId);

        if (!deletedVideo) {
            return res.status(404).json({ error: 'Video not found' });
        }

        res.json({ message: 'Video deleted' });
    } catch (err) {
        res.status(500).json({ error: 'Failed to delete video' });
    }
};

exports.deleteAllVideos = async (req, res) => {
    try {
      await Video.deleteMany({});
      res.json({ message: 'All videos deleted' });
    } catch (err) {
      res.status(500).json({ error: 'Failed to delete videos' });
    }
  };
  