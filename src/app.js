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


// b is optional here -> /ac , /abc
app.get("/ab?c",(req,res) => {
    res.send("get Data");
})


//  abc ,abbc, abbbbbbbbbc, you can add as many as 'b' 
app.get("/ab+c",(req,res) => {
    res.send("get Data");
})


// abcd, abSushantcd, start with 'ab' in middle anything end with 'cd'
app.get("/ab*cd",(req,res) => {
    res.send("get Data");
})

app.get("/a(bc)?d",(req,res) => {
    res.send("get Data");
});


app.get("/getAgents",(req,res) => {
    console.log(req.query);
    res.send({firstName: "Sushant", lastName: "Rajhans"});
})


app.get("/getAgents/:agentId/:name/:password",(req,res) => {
    console.log(req.params);
    res.send({firstName: "Sushant", lastName: "Rajhans"});
})

app.listen(3000,() => {
    console.log("server running on port 7000");
});
