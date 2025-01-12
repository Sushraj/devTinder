const express = require("express");
const connectDB = require("./config/database");
const app = express(); // creating new web server
const User = require("./models/users");

// Middleware to parse JSON
app.use(express.json());

app.post("/signup", async (req, res) => {
  //create new instance of User model and Access the parsed JSON data
  const user = new User(req.body);

  try {
    await user.save();
    res.send("user added successfully!!");
  } catch (err) {
    res.status(400).send("Error saving the user:", +err.message);
  }
});

//feed API - GET /feed - get all the users from the database.
app.get("/feed", async (req, res) => {
  try {
    const users = await User.find();
    if (users.length > 0) {
      res.status(200).json({ success: true, data: users });
    } else {
      res.status(404).json({ success: false, message: "No profiles found" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ succes: false, message: "Server error", error: error.message });
  }
});

app.get("/getUserByEmaiId", async (req, res) => {
  const userEmail = req.body.emailId;

  try {
    const users = await User.find({ emailId: userEmail });
    if (users.length === 0) {
      res.status(404).send("User not found!");
    } else {
      res.send({ success: true, data: users });
    }
  } catch (err) {
    res.status(400).send("something went wrong!!");
  }
});

app.get("/getUserByEmaiIdFindOne", async (req, res) => {
  const userEmail = req.body.emailId;

  try {
    const user = await User.findOne({ emailId: userEmail });
    if (user.length === 0) {
      res.status(404).send("User not found!");
    } else {
      res.send({ success: true, data: user });
    }
  } catch (err) {
    res.status(400).send("something went wrong!!");
  }
});

connectDB()
  .then(() => {
    console.log("Database connection established ...");
    app.listen(3000, () => {
      console.log("Server is successfull listening on port 3000");
    });
  })
  .catch((err) => {
    console.log("Database connection connected!! ");
  });
