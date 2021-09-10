require("dotenv").config();
const Sequelize = require("sequelize");

// creating sequelize instance and connecting to the database (Postgres)
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
