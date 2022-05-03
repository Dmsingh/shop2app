require('dotenv').config();
const mongoose = require('mongoose');
const express = require ('express');
app = express();
const bodyParser = require("body-parser");
const cors = require("cors");

// Importing from other files the routes
const authRoutes = require("./routes/auth");

// Database connection
mongoose.connect(process.env.DATABASE, {useNewUrlParser: true , useUnifiedTopology: true  }
).then(()=>{
        console.log('DB connected');
    },
    err=>{ console.log('DB Connection failed',err); } 
);


// Middle-wares
app.use(bodyParser.json() );
app.use(cors());

// MY Routs
app.get("/", (req,res)=>{ res.send("HOME") })
app.use("/api", authRoutes);


// Port 
const port = process.env.PORT || 8001 ;

// Listening to port
app.listen(port , ()=> { console.log( `Conncted on port http://localhost:${port}`)}  );


