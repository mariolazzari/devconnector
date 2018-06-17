const express = require("express");
const mongoose = require("mongoose");
const { mongoURI } = require("./config/keys");

// connecto to mongoDB
mongoose
    .connect(mongoURI)
    .then(console.log("MongoDB connected"))
    .catch(err => console.log("Error connecting to MongoDB", err.message));

const app = express();
const port = process.env.PORT || 5000;

// routings
app.use("/api/users", require("./routes/api/users"));
app.use("/api/profile", require("./routes/api/profile"));
app.use("/api/posts", require("./routes/api/posts"));

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
