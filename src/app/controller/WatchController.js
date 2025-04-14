// src/app/controllers/WatchController.js
const User = require('../models/User');

class WatchController {
  static async saveHistory(req, res) {
    const { movieId, title, slug, episode } = req.body;
    try {
      await User.updateOne(
        { _id: req.user.id },
        { $push: { watched: { movieId, title, slug, episode } } }
      );
      res.json({ message: "Lưu lịch sử thành công" });
    } catch (err) {
      res.status(500).json({ error: "Không lưu được lịch sử" });
    }
  }

  static async getHistory(req, res) {
    try {
      const user = await User.findById(req.user.id);
      res.json(user.watched.reverse());
    } catch (err) {
      res.status(500).json({ error: "Không lấy được lịch sử" });
    }
  }
}

module.exports = WatchController;
