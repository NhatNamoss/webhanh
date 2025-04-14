const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'mysql',
  }
);

sequelize
  .authenticate()
  .then(() => console.log('Kết nối cơ sở dữ liệu thành công'))
  .catch((err) => console.error('Không thể kết nối cơ sở dữ liệu:', err));

module.exports = sequelize;