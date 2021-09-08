require("dotenv").config();

const Sequelize = require("sequelize");
const db = new Sequelize(
  "shoppingify",
  "postgres",
  `${process.env.PG_PASSWORD}`,
  {
    host: "localhost",
    dialect: "postgres",
  }
);

module.exports = db;
