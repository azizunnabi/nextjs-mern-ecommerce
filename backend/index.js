const express = require("express");
const connect = require("./config/DataBase")
const cors = require("cors")
//import mongoose from "mongoose";
//Middleware to parse JSON request bodies
require("dotenv").config();
const productRoutes = require("./routes/product_routes.js");
const { home } = require("./controllers/product");

const app=express();
app.use(express.json());
connect();
app.use(cors())
app.use('/api',productRoutes)
app.use('/api',home)

const port=5001;
app.listen(port, ()=> {
    console.log(`server is listening to to this port: ${port}`)
})



