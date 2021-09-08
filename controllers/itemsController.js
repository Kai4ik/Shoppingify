const Item = require("../models/items");

exports.getAllItems = async (req, res) => {
  try {
    const items = await Item.findAll();
    return res.status(200).json(items);
  } catch (err) {
    return res.status(500).json({
      error: `Error occurred + ${err}`,
    });
  }
};

exports.addNewItem = async (req, res) => {
  try {
    await Item.create({
      itemName: req.body.itemName,
      category: req.body.category,
      imageURL: req.body.imageURL,
      note: req.body.note || null,
    });
    return res.status(201).json({ success: true });
  } catch (err) {
    return res.status(500).json({
      error: `Error occurred + ${err}`,
    });
  }
};

exports.deleteItem = async (req, res) => {
  try {
    await Item.destroy({
      where: {
        itemName: req.body.itemName,
      },
    });
    return res.status(200).json({ deleted: true });
  } catch (err) {
    return res.status(500).json({
      error: `Error occurred + ${err}`,
    });
  }
};
