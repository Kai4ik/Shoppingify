require("dotenv").config();
const Sequelize = require("sequelize");

const db = new Sequelize(`${process.env.DATABASE_RL}?sslmode=require`, {
  dialect: "postgres",
  ssl: true,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});

module.exports = db;
