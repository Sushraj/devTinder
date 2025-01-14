const mongoose = require('mongoose');
const validator = require("validator");

function arrayLimit(val) { return val.length > 0 && val.length < 5; }

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minLength: 4,
        maxLength: 50
    },
    lastName: {
        type: String
    },
    emailId: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        validate(value) {
            if(!validator.isEmail(value)){
                throw new Error("Invalid Email Address:"+ value)
            }
        }
    },
    password: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        min:18
    },
    gender: {
        type: String,
        validate(value){
          if(!["male","female","others"].includes(value)){
            throw new Error ("Gender data is not valid");
          }  
        }
    },
    photoUrl: {
        type: String,
        default: "https://toppng.com/public/uploads/preview/donna-picarro-dummy-avatar-115633298255iautrofxa.png",
        validate(value) {
            if(!validator.isURL(value)){
                throw new Error("Invalid Photo URL address:" + value);
            }
        }
    },
    about : {
        type: String,
        default: "this is default description of user"
    },
    skills: {
        type: [String],
        validate: [arrayLimit,"Must provide  skills beetween 1 to 5"]
    }

},{timestamps: true});

const User = mongoose.model("User",userSchema);


module.exports = User;


