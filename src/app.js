const express = require("express");

const app = express();  // creating new web server


app.use("/",(req,res) => {
    res.send("Namaste From the sushant!");
})

app.use("/hello",(req,res) => {
    res.send("Hello From the hello!");
})

app.use("/test",(req,res) => {
    res.send("Hello From the test!");
})

app.listen(3000,() => {
    console.log("server running on port 3000");
});
