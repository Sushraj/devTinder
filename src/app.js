const express = require("express");
const connectDB = require("./config/database");
const app = express(); // creating new web server
const User = require("./models/users");
const { validateSignUpData } = require("./utils/validation");
const bcrypt = require("bcrypt");

// Middleware to parse JSON
app.use(express.json());

// signup api
app.post("/signup", async (req, res) => {
  try {
    //Validation of data
    validateSignUpData(req);
    const { firstName, lastName, emailId, password } = req.body;

    //encrypt password
    const passwordHash = await bcrypt.hash(password, 10);

    console.log(passwordHash);

    const user = new User({
      firstName,
      lastName,
      emailId,
      password: passwordHash,
    });

    await user.save();
    res.status(200).send("user added successfully!!");
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
});

//login api
app.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;

    const user = await User.findOne({ emailId: emailId });
    if (!user) {
      throw new Error("Invalid credentils");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (isPasswordValid) {
      // const token = createToken({ id: user.id });
      res.send("User Login Successfull!!");
    } else {
      throw new Error("Invalid credentils");
    }
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
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

    if (data?.skills.length > 10) {
      throw new Error("skills cant be more than 10");
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
