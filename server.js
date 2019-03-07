const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const { mongoURI } = require("./config/keys");
const passport = require("passport");

// connecto to mongoDB
mongoose
  .connect(mongoURI, { useNewUrlParser: true })
  .then(console.log("MongoDB connected"))
  .catch(err => console.log("Error connecting to MongoDB", err.message));

// express setup
const app = express();
const port = process.env.PORT || 5000;

// body parser settings
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// passport settings
app.use(passport.initialize());
require("./config/passport")(passport);

// routings
app.use("/api/users", require("./routes/api/users"));
app.use("/api/profile", require("./routes/api/profile"));
app.use("/api/posts", require("./routes/api/posts"));

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
