// src/app/models/User.js
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  watched: [
    {
      movieId: String,
      title: String,
      slug: String,
      episode: String,
      watchedAt: { type: Date, default: Date.now },
    }
  ]
});

module.exports = mongoose.model('User', UserSchema);
