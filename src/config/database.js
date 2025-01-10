const mongoose = require("mongoose");

const connectDB = async ()  => {
    await mongoose.connect(
        "mongodb+srv://sushantrajhans:rAlFAR73lWWOAMg4@namstenode311220024.6yhum.mongodb.net/")
};


module.exports = connectDB
