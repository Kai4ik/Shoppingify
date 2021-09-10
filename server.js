const express = require("express");
const cors = require("cors");
const db = require("./models/database");
require("dotenv").config();

// creating express app object
const app = express();
const PORT = process.env.PORT;

//application/json parser
const jsonParser = express.json();

//configuring cors
app.use(
  cors({
    origin: "*",
    methods: "GET, POST, DELETE",
    allowedHeaders: "Authorization, Content-Type",
  })
);

const items = require("./routes/items");
app.use("/api/items", jsonParser, items);

const users = require("./routes/users");
app.use("/api/users", jsonParser, users);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("shoppingify/build"));
}
//testing the database connection
db.authenticate()
  .then(() =>
    console.log("Connection to the Postgres DB was successfully established! ")
  )
  .catch((err) => console.log(`Error occurred: ` + err));

// callback function that called after server starts listening for requests
const serverStart = () => console.log(`Server listening on ${PORT}`);

// setups server that listens on specified port
app.listen(PORT, serverStart);
