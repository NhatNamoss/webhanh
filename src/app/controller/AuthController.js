// src/app/controllers/AuthController.js
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const secret = "baomatcuabox"; // đặt trong `.env`

class AuthController {
  static async register(req, res) {
    const { username, password } = req.body;
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new User({ username, password: hashedPassword });
      await newUser.save();
      res.status(201).json({ message: "Đăng ký thành công" });
    } catch (err) {
      res.status(400).json({ error: "Tài khoản đã tồn tại hoặc lỗi hệ thống" });
    }
  }

  static async login(req, res) {
    const { username, password } = req.body;
    try {
      const user = await User.findOne({ username });
      if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).json({ error: "Sai tài khoản hoặc mật khẩu" });
      }
      const token = jwt.sign({ id: user._id, username: user.username }, secret, { expiresIn: "7d" });
      res.json({ token });
    } catch (err) {
      res.status(500).json({ error: "Lỗi máy chủ" });
    }
  }
}

module.exports = AuthController;
