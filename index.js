// connect MongoDB
require("dotenv").config("env");
const database = require("./src/database");
//
const express = require("express");
const app = express();

const PORT = process.env.PORT || 3000;

app.listen(PORT,()=>{
    console.log("Server is running ... ?");
})
app.set("view engine","ejs");
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({extended:true}));
// start session
const session = require("express-session");
app.use(session({
    resave:true,
    saveUninitialized:true,
    secret: "T2203E",
    cookie:{
        maxAge: 36000000,  //miliseconds
        // secure: true
    }
}))
