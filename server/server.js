require("dotenv").config();
const express = require("express")
const app = express();
const PORT = 3000;
const url = "mongodb://localhost:27017/adzdb";
const userRouter = require('./Routes/Auth')
const todoRouter = require('./Routes/Todos')
const bodyParser=require("body-parser");
const mongoose = require('mongoose');

//connect mongodb
mongoose.connect(url);
var db=mongoose.connection;
db.on('error', console.log.bind(console, "connection error"));
db.once('open', function(callback){
    console.log("connection to Mongodb is succeeded");
})

app.use(bodyParser.json());
app.use(express.json()); 
app.use(bodyParser.urlencoded({
    extended: true
}));


//to log any errors in the console
app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send('Something broke!')
  })

// routes
app.use('/user', userRouter);
app.use('/todo',todoRouter);

app.listen(PORT, () => {
     console.log("Listening on port: " + PORT);
}); 