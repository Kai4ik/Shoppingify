require("dotenv").config();
const Sequelize = require("sequelize");

const db = new Sequelize(
  `postgres://ghjndwqceedsmd:0650c6172353a5be5ed4e23e9ed9e874bc63ae8076b33b8dc4a9b36e97ad5ccf@ec2-54-173-138-144.compute-1.amazonaws.com:5432/d28lu6uo4sv9aa?sslmode=require`,
  {
    port: 5432,
    dialect: "postgres",
    /* protocol: "postgres",
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },*/
  }
);

module.exports = db;
