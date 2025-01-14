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
    res.status(200).send("user added successfully!!");
  } catch (err) {
    res.status(400).send("Error saving the user:" + err.message);
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

//get User By emailID
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

// findOne user
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

//get User By ID
app.get("/getUserById", async (req, res) => {
  const userId = req.body._id;
  try {
    const user = await User.findOne({ _id: userId });
    if (user.length === 0) {
      res.status(404).send("User not found!");
    } else {
      res.send({ success: true, data: user });
    }
  } catch (err) {
    res.status(400).send("something went wrong!!");
  }
});

//Delete user from database
app.delete("/user", async (req, res) => {
  const userId = req.body._id;

  try {
    // const user = await User.findByIdAndDelete({_id: userId})
    const user = await User.findByIdAndDelete(userId);
    res.send("user deleted successfully!");
  } catch (err) {
    res.status(400).send("Something went wrong!!");
  }
});

//Update data of the user
app.patch("/user/:userId", async (req, res) => {
  const userId = req.params?.userId;
  const data = req.body;

  try {
    const ALLOWED_UPDATES = ["skills", "photoUrl", "about", "gender", "age"];
    const isUpdateAllowed = Object.keys(data).every((k) =>
      ALLOWED_UPDATES.includes(k)
    );
    if (!isUpdateAllowed) {
      throw new Error("Update not allowed");
    }

    if(data?.skills.length > 10) {
      throw new Error("skills cant be more than 10")
    }

    // const user = await User.findByIdAndDelete({_id: userId})
    await User.findByIdAndUpdate(userId, data, {
      returnDocument: "after",
      runValidators: true,
    });
    res.send("user Updated successfully!");
  } catch (err) {
    res.status(400).send("Update failed:" + err.message);
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
