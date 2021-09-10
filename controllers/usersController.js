const User = require("../models/users");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

require("dotenv").config();

// verifyToken() used to check whether provided token (taken from Authorization header) is valid (was it changed) or not.
// returns the decoded payload that contains user email
const verifyToken = (req, res) => {
  const token = req.headers["authorization"];
  if (!token)
    return res.status(401).json({ msg: "No token, authorization denied" });
  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    return decoded;
  } catch (error) {
    return res.status(400).json({
      error: "Token is not valid",
    });
  }
};

// verifyEmail() used to check whether user with provided email exists in database or not.
// returns user object in case it finds one, otherwise returns error
const verifyEmail = async (decoded, res) => {
  const findUserWithGivenEmail = await User.findOne({
    where: { userEmail: decoded.email },
  });

  if (!findUserWithGivenEmail)
    return res.status(200).json({
      error: "User with such email does not exist!",
      success: false,
    });
  return findUserWithGivenEmail;
};

const createToken = (email) => {
  return jwt.sign({ email: email }, process.env.SECRET_KEY, {
    expiresIn: "3h",
    algorithm: "HS256",
  });
};

// addNewUser() used to create a new user using given in request information
// provided by user password hashed using "bcrypt" package
// function also generates a new jwt token and returns it back to the client
exports.addNewUser = async (req, res) => {
  try {
    const findUserWithGivenEmail = await User.findAll({
      where: {
        userEmail: req.body.userEmail,
      },
    });
    if (findUserWithGivenEmail.length === 0) {
      await bcrypt
        .genSalt(15)
        .then((salt) => bcrypt.hash(req.body.userPassword, salt))
        .then((hashedPassword) => (req.body.userPassword = hashedPassword));
      const token = createToken(req.body.userEmail);
      await User.create({
        userEmail: req.body.userEmail,
        userPassword: req.body.userPassword,
        allUserLists: req.body.allUserLists,
        currentListProducts: req.body.currentListProducts,
      });
      return res.status(201).json({ created: true, token: token });
    }
    return res.status(200).json({ created: false });
  } catch (err) {
    return res.status(500).json({
      error: `Error occurred + ${err}`,
    });
  }
};

exports.loginUser = async (req, res) => {
  try {
    let user = null;
    await verifyEmail(req.body, res).then((response) => (user = response));

    await bcrypt
      .compare(req.body.password, user.userPassword)
      .then((existingUser) => {
        if (existingUser) {
          const token = createToken(req.body.email);
          return res.status(200).json({
            loggedIn: true,
            token: token,
            user: user,
          });
        } else
          return res.status(200).json({
            error: "Incorrect password",
            success: false,
          });
      });
  } catch (err) {
    return res.status(500).json({
      error: `Error occurred + ${err}`,
    });
  }
};

// verifyAndUpdateUser() used to update user - list products or user lists
// before updating user, function checks whether valid token was provided or not
exports.verifyAndUpdateUser = async (req, res) => {
  try {
    const decoded = verifyToken(req, res);
    if (req.body.listProducts) {
      await User.update(
        {
          currentListProducts: [...req.body.listProducts],
        },
        {
          where: {
            userEmail: decoded.email,
          },
        }
      );
    }

    if (req.body.allUserLists) {
      await User.update(
        {
          allUserLists: [...req.body.allUserLists],
        },
        {
          where: { userEmail: decoded.email },
        }
      );
    }

    return res.status(200).json({
      updated: true,
    });
  } catch (err) {
    return res.status(500).json({
      error: `Error occurred + ${err}`,
    });
  }
};

// function that returns all products from user's current list
exports.getCurrentListProducts = async (req, res) => {
  try {
    const decoded = verifyToken(req, res);
    const findUserWithGivenEmail = await User.findOne({
      where: { userEmail: decoded.email },
    });
    return res.status(200).json({
      success: true,
      listProducts: findUserWithGivenEmail.currentListProducts,
    });
  } catch (err) {
    return res.status(500).json({
      error: `Error occurred + ${err}`,
    });
  }
};

// function that returns all user's previously saved lists
exports.getAllLists = async (req, res) => {
  try {
    const decoded = verifyToken(req, res);
    let user = null;
    await verifyEmail(decoded, res).then((response) => (user = response));
    return res.status(200).json({
      success: true,
      allUserLists: user.allUserLists,
    });
  } catch (err) {
    return res.status(500).json({
      error: `Error occurred + ${err}`,
    });
  }
};
