require("dotenv").config();
const Sequelize = require("sequelize");

const db = new Sequelize(process.env.DATABASE_URL, {
  host: "localhost",
  dialect: "postgres",
  port: 5432,
  logging: true,
});

module.exports = db;
