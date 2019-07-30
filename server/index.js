// Enables the .env file, therefore add a env property ot process object
// recomment to require it at the top of the file
require("dotenv").config();

const bodyParser = require("body-parser");
//Require the session for saving user data and giving a user a unique experience.
const session = require("express-session");
//Use cors for enable cross origin requests
const cors = require("cors");
// //Import your mongoose module to connect to your mongodb database instance using it's connection string.
const mongoose = require("mongoose");
//Import your express server
const express = require("express");
//Set instance of the express server to a variable
const app = express();

//Define the Port your will be running your server on.
const PORT = 4000;

//Controllers
const adminController = require("./controllers/adminController");
const cloudinaryController = require("./controllers/cloudinaryController");
const userController = require("./controllers/userController");
const productsController = require("./controllers/productsController");

//Connect the mongoose to the database using it's connect method.
mongoose.connect(
  process.env.CONNECTION_STRING,
  { useNewUrlParser: true },
  err => {
    if (err) {
      console.log("Database Error----------------", err);
    }
    console.log("Connected to database");
  }
);

// middleware

// for initializing the req.body. if the middleware is not used, the req.body is undefined
app.use(bodyParser.json());
// for storing cookies for the user
app.use(
  session({
    // create a secret for the cookie store it in .env file
    // secret can be anything
    secret: process.env.SESSION_SECRET,

    // this for resaving the cookie false, if true can cause memory leak
    resave: false,

    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 14
    }
  })
);
// Allow cross origin requests
app.use(cors());

setTimeout(() => {
  // All our endpoints

  //Read the user's session.
  app.get("/api/user-data", userController.readUserData);

  app.post("/api/user-data/cart", userController.addToCart);

  app.delete("/api/user-data/cart/:id", userController.removeFromCart);

  app.post("/api/login", userController.login);

  app.post("/api/logout", userController.logout);

  // Products endpoints
  app.get("/api/products", productsController.readAllProducts);

  app.get("/api/products/:id", productsController.readProduct);

  // Admin endpoints
  app.get("/api/users", adminController.getAdminUsers);

  app.post("/api/products", adminController.createProduct);

  app.put("/api/products/:id", adminController.updateProduct);

  app.delete("/api/products/:id", adminController.deleteProduct);
}, 200);

// Then listen on PORT
app.listen(PORT, () => {
  console.log("listening on port:", PORT);
});
