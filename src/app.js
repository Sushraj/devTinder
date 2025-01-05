const express = require("express");

const app = express();  // creating new web server

 // GET API example
app.get("/user",(req,res) => {
    res.send("get Data");
})

// POST API example
 app.post('/user', (req, res) => { 
     res.send(`Hello, you are creating something!`);
});

// DELETE API example
app.delete('/user', (req, res) => { 
    res.send(`Hello, you are deleting something!`);
});

app.use("/user",(req,res) => {
    res.send("HAAAAA");
})
app.listen(3000,() => {
    console.log("server running on port 7000");
});
