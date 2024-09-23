const http=require('http');
const express=require('express');
const bodyParser = require("body-parser");
const { connectDB } = require("./src/db/dbConnection");
const config = require("./src/config/config");
const router=require('./src/routes/v1')
const app=express();

/**
 * allow form-data from body
 * form-data is use for image upload
 * parse application/x-www-form-urlencoded
 */
app.use(bodyParser.urlencoded({ extended: false }));

/**
 * allow json data from body
 * parse application/json
 */
app.use(bodyParser.json());

// router with name space 
app.use('/v1',router);

/** whenever   route not created and you try to use that route then throw error. */
app.use((req, res, next) => {
  // res.send("hi") 
  // res._write('hi');
  // next(new Error("Route not found!"));
    // next()
  });

/** Database connection */
connectDB()

const server= http.createServer(app);
server.listen(config.port,()=>{
    console.log("server listing the port 3000");
});




