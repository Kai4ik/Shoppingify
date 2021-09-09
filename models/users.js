const db = require("./database");
const { DataTypes } = require("sequelize");

const User = db.define("Users", {
  userEmail: DataTypes.STRING(60),
  userPassword: DataTypes.STRING(200),
  currentListProducts: DataTypes.ARRAY(DataTypes.JSON),
  allUserLists: DataTypes.ARRAY(DataTypes.JSON),
});

User.sync({ force: true }).then(() => {
  User.create({
    userEmail: "ka@",
    userPassword: "gg",
    currentListProducts: [],
    allUserLists: [],
  });

  User.create({
    userEmail: "kai@",
    userPassword: "ggdgfdf",
    currentListProducts: [],
    allUserLists: [],
  });

  User.create({
    userEmail: "kai4ik@",
    userPassword: "ggdfgd",
    currentListProducts: [],
    allUserLists: [],
  });
});

module.exports = User;
