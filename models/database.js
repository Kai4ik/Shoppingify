require("dotenv").config();

const Sequelize = require("sequelize");
const db = new Sequelize("shoppingify", "postgres", `qwAS12==66`, {
  host: "localhost",
  dialect: "postgres",
});

module.exports = db;
