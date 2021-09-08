const express = require("express");
const {
  getAllItems,
  addNewItem,
  deleteItem,
} = require("../controllers/itemsController");
const router = express.Router();

router.route("/").get(getAllItems);
router.route("/").post(addNewItem);
router.route("/").delete(deleteItem);

module.exports = router;
