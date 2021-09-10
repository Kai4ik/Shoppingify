require("dotenv").config();
const Sequelize = require("sequelize");

const db = new Sequelize(process.env.DATABASE_URL, {
  port: 5432,
  dialect: "postgres",
  protocol: "postgres",
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});

module.exports = db;
