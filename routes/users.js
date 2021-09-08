const express = require("express");
const {
  addNewUser,
  verifyAndUpdateUser,
  loginUser,
  getCurrentListProducts,
  getAllLists,
} = require("../controllers/usersController");
const router = express.Router();

router.route("/").post(addNewUser);
router.route("/login").post(loginUser);
router.route("/verifyAndUpdate").post(verifyAndUpdateUser);
router.route("/").get(getCurrentListProducts);
router.route("/historyLists").get(getAllLists);

module.exports = router;
