const express = require("express");
const connectDB = require("./config/database");
const app = express(); // creating new web server
const User = require("./models/users");

app.post("/signup", async (req, res) => {
  //create new instance of User model

  const user = new User({
    firstName: "virat",
    lastName: "Kohli",
    emailId: "virat@gmail.com",
    password: "vk123",
    age: 38,
    gender: "Male",
  });

  try {
    await user.save();
    res.send("user added successfully!!");
  } catch (err) {
    res.status(400).send("Error saving the user:", +err.message);
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
