const mongoose = require("mongoose");

const connectDB = async ()  => {
    console.log("variable set--->",process.env.DB_CONNECTION_SCRET )
    await mongoose.connect(process.env.DB_CONNECTION_SCRET);
};


module.exports = connectDB
