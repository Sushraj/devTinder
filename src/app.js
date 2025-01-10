const express = require("express");
const app = express(); // creating new web server

const { adminAuth,userAuth } = require("./middlewares/auth");

app.use("/admin", adminAuth);


app.get("/user", userAuth, (req, res) => {
  console.log("user data sent");
  res.send("user data gets")
});

app.get("/admin/getAdmin", (req, res) => {
  console.log("inside admin get ");
  res.send("get all admin data");
});

app.get("/admin/deleteAdmin", (req, res) => {
  console.log("inside admin get ");
  res.send("deleted all admin data");
});

// // Middleware to log request details
// app.use((req, res, next) => {
//   console.log(`Request Method: ${req.method}, Request URL: ${req.url}`);
//   // Call the next middleware or route handler
//   next();
// });

// // Middleware to parse JSON bodies of incoming requests
// app.use(express.json());

// // Route handler for GET requests to /hello
// app.get('/hello', (req, res) => {
//   // Response handler: Sending a simple text response
//   res.send('Hello, World!');
// });

// // Route handler for POST requests to /submit
// app.post('/submit', (req, res) => {
//   const data = req.body;

//   // Response handler: Checking for data and sending appropriate response
//   if (data) {
//     res.status(200).json({ message: 'Data received successfully', data: data });
//   } else {
//     res.status(400).send('No data received');
//   }
// });

// app.get("/user",
//     (req,res,next) =>{
//         console.log("Handling the route user 1!");
//         // res.send("Route Handler 1")
//         next();
//     },
//     (req,res,next) => {
//         console.log("Handling the route user 2!");
//        // res.send("Route Handler2")
//        next();
//     },
//     (req,res,next) => {
//         console.log("Handling the route user 3!");
//         //res.send("Route Handler3");
//         next();
//     },
//     (req,res) => {
//         console.log("Handling the route user 4!");
//         res.send("Route Handler4")
//     }
// );

// // Custom 404 middleware to handle unmatched routes
// app.use((req, res, next) => {
//     res.status(404).send("Sorry, we couldn't find that!");
//   });

//  // GET API example
// app.get("/user",(req,res) => {
//     res.send("get Data");
// })

// // POST API example
//  app.post('/user', (req, res) => {
//      res.send(`Hello, you are creating something!`);
// });

// // DELETE API example
// app.delete('/user', (req, res) => {
//     res.send(`Hello, you are deleting something!`);
// });

// app.use("/user",(req,res) => {
//     res.send("HAAAAA");
// })

// // b is optional here -> /ac , /abc
// app.get("/ab?c",(req,res) => {
//     res.send("get Data");
// })

// //  abc ,abbc, abbbbbbbbbc, you can add as many as 'b'
// app.get("/ab+c",(req,res) => {
//     res.send("get Data");
// })

// // abcd, abSushantcd, start with 'ab' in middle anything end with 'cd'
// app.get("/ab*cd",(req,res) => {
//     res.send("get Data");
// })

// app.get("/a(bc)?d",(req,res) => {
//     res.send("get Data");
// });

// app.get("/getAgents",(req,res) => {
//     console.log(req.query);
//     res.send({firstName: "Sushant", lastName: "Rajhans"});
// })

// app.get("/getAgents/:agentId/:name/:password",(req,res) => {
//     console.log(req.params);
//     res.send({firstName: "Sushant", lastName: "Rajhans"});
// })

app.listen(3000, () => {
  console.log("server running on port 3000");
});
