const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const api = require('./routes/api'); //for api
const PORT = 3000 ;
const cors = require("cors"); //for cross origin request //npm install --save cors

app.use(cors()); //for cross origin request
app.use(bodyParser.json());
app.use('/api' , api); //for api

app.get("/",function(req , res){
    res.send("Hello world");
});
app.listen(PORT , function() {
    console.log("Server running on :"+PORT);
})