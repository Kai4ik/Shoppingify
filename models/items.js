const db = require("./database");
const { DataTypes } = require("sequelize");

const Item = db.define("Items", {
  itemName: DataTypes.STRING(60),
  note: { type: DataTypes.TEXT, allowNull: true },
  imageURL: DataTypes.STRING,
  category: DataTypes.STRING(60),
});

Item.sync({ force: true }).then(() => {
  console.log("Drop and Resync with { force: true }");
  Item.create({
    itemName: "banana",
    imageURL: "banana",
    category: "Fruits",
  });
});

module.exports = Item;
