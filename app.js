require('dotenv').config();
const mongoose = require('mongoose');
const express = require ('express');


app = express();
const bodyParser = require("body-parser");
const cors = require("cors");

// Importing from other files the routes
const authRoutes = require("./routes/auth");
const productRoutes = require("./routes/product");
const shopifyRoutes = require("./routes/shopify");

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

// MY Routes
app.get("/", (req,res)=>{ res.send("HOME") })
app.use("/api", authRoutes);
app.use("/api", productRoutes);
app.use("/shopify",shopifyRoutes)

// Port 
const port = process.env.PORT || 8001 ;

// Listening to port
app.listen(port , ()=> { console.log( `Conncted on port http://localhost:${port}`)}  );


