// src/app/controllers/AuthController.js
const User = require('../models/User'); // Model User
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET;

class AuthController {
  // Xử lý đăng ký
  static async register(req, res) {
    const { username, password } = req.body;
    try {
      // Kiểm tra xem username đã tồn tại chưa
      const existingUser = await User.findOne({ where: { username } });
      if (existingUser) {
        return res.status(400).json({ error: "Tài khoản đã tồn tại" });
      }

      // Mã hóa mật khẩu và lưu vào cơ sở dữ liệu
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = await User.create({ username, password: hashedPassword });
      res.status(201).json({ message: "Đăng ký thành công", user: newUser });
    } catch (err) {
      res.status(500).json({ error: "Lỗi hệ thống" });
    }
  }

  // Xử lý đăng nhập
  static async login(req, res) {
    const { username, password } = req.body;
    try {
      // Tìm người dùng trong cơ sở dữ liệu
      const user = await User.findOne({ where: { username } });
      if (!user) {
        console.log(`Không tìm thấy tài khoản: ${username}`);
        return res.status(401).json({ error: "Sai tài khoản hoặc mật khẩu" });
      }

      // Kiểm tra mật khẩu
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        console.log(`Mật khẩu không đúng cho tài khoản: ${username}`);
        return res.status(401).json({ error: "Sai tài khoản hoặc mật khẩu" });
      }

      // Tạo token JWT
      const token = jwt.sign({ id: user.id, username: user.username }, secret, { expiresIn: "7d" });
      console.log(`Đăng nhập thành công: ${username}`);
      res.json({ message: "Đăng nhập thành công", token });
    } catch (err) {
      console.error("Lỗi hệ thống:", err);
      res.status(500).json({ error: "Lỗi hệ thống" });
    }
  }
}

module.exports = AuthController;
