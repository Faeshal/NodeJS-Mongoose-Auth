const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const PORT = 3000;

const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const flash = require("connect-flash");
const app = express();

const adminRoutes = require("./routes/admin");
const authRoutes = require("./routes/auth");

// NOTE : Atlas
// const MONGODB_URI =
//   "mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<dbname>";

// NOTE : Local
const MONGODB_URI = "mongodb://localhost:27017/shop";

app.set("view engine", "ejs");
app.set("views", "views");

app.use(flash());

const store = new MongoDBStore({
  uri: MONGODB_URI,
  collection: "sessions"
});

app.use(bodyParser.urlencoded({ extended: false }));

app.use(
  session({
    secret: "my secret",
    resave: false,
    saveUninitialized: false,
    store: store
  })
);

app.use(adminRoutes);
app.use(authRoutes);

mongoose
  .connect(MONGODB_URI, { useNewUrlParser: true })
  .then(result => {
    app.listen(PORT);
    console.log("Web Server is Running");
  })
  .catch(err => {
    console.log(err);
  });
