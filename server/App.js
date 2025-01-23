const cookieParser = require("cookie-parser");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const user = require("./Controllers/user");
const ErrorHandler = require("./Middlewares/Error");
const cors = require ("cors");

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended:true}));


// Configure CORS
const corsOptions = {
    origin: "http://localhost:5173", // Replace with your frontend origin
    credentials: true, // Allow cookies and credentials
  };
  
app.use(cors(corsOptions)); // Use the configured CORS
app.use("/api/v1",user)
app.use(ErrorHandler)

module.exports = app;