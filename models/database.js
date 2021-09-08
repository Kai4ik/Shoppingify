require("dotenv").config();

const Sequelize = require("sequelize");
const db = new Sequelize(
  "shoppingify",
  "postgres",
  `${process.env.PG_PASSWORD}`,
  {
    host: "127.0.0.1",
    dialect: "postgres",
  }
);

module.exports = db;
