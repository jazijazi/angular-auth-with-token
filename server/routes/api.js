const express = require("express");
const router = express.Router(); 

const User = require("../models/user");

const jwt = require('jsonwebtoken') ;

const mongoose = require("mongoose");
const db = ("mongodb://localhost/eventsdb");
mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true }, err=>{
    if(err){
        console.error("Error in db"+err);
    }
    else{
        console.log("connect to Database");
    }
});

function verifyToken (req , res , next){
    if (!req.headers.authorization){ //why always with error return this???
        return res.status(401).send("Unauthorized request --no Authorization") ;
    }
    let token = req.headers.authorization.split(' ')[1] ; // 0 is Bearer & 1 is token value
    if (token === 'null'){
        return res.status(401).send("Unauthorized request --token is null");
    }
    let payload = jwt.verify(token, 'secretkey');  
    if(!payload){
        return res.status(401).send("Unauthorized request payload is invalid");
    }
    console.log("Subject token:  "+payload.subject);
    req.userId = payload.subject ;
    next()
}

router.get('/' , (req , res)=>{
    res.send("HELLO FROM API");
});

router.post('/register' , (req , res)=>{
    let userData = req.body ;
    let user = new User(userData);
    user.save((err , registeredUser)=>{
        if(err){
            console.log("Error in register User  "+err);
        }
        else{
            let payload = { subject : registeredUser._id } //create payload for token
            let token = jwt.sign(payload , 'secretKey') //create token //secretkey can be anything
            res.status(200).send({"token":token}); //token is text change to json
            //res.status(200).send(registeredUser); //for none token
        }
    });
});

router.post('/login' , (req , res)=>{
    let userData = req.body ;
    User.findOne({ email: userData.email} , (err , user)=>{
        if (err){
            console.log("Error in Login"+err);
        }
        else{
            if(!user){
                res.status(401).send('User Not Found');
            }
            else if(user.password !== userData.password){
                res.status(401).send('Invalid Password');
            }
            else{
                let payload = {subject:user._id}
                let token = jwt.sign(payload , 'secretkey')
                res.status(200).send({ "token": token });
            }
        }
    });
});

router.get('/events' , (req , res)=>{
    //for Simple event not a model just a hard code
    let events = [
        {
            "_id": "1",
            "name": "Auto Expo",
            "description": "lorem ipsum",
            "date": "2012-04-23T18:25:43.511Z"
        },
        {
            "_id": "2",
            "name": "Auto Expo",
            "description": "lorem ipsum",
            "date": "2012-04-23T18:25:43.511Z"
        },
        {
            "_id": "3",
            "name": "Auto Expo",
            "description": "lorem ipsum",
            "date": "2012-04-23T18:25:43.511Z"
        },
        {
            "_id": "4",
            "name": "Auto Expo",
            "description": "lorem ipsum",
            "date": "2012-04-23T18:25:43.511Z"
        },
        {
            "_id": "5",
            "name": "Auto Expo",
            "description": "lorem ipsum",
            "date": "2012-04-23T18:25:43.511Z"
        },
        {
            "_id": "6",
            "name": "Auto Expo",
            "description": "lorem ipsum",
            "date": "2012-04-23T18:25:43.511Z"
        }
    ];
    res.json(events);
});
router.get('/special', verifyToken , (req, res) => {
    //for Simple event not a model just a hard code
    let events = [
        {
            "_id": "1",
            "name": "Auto spcial Expo",
            "description": "lorem ipsum",
            "date": "2012-04-23T18:25:43.511Z"
        },
        {
            "_id": "2",
            "name": "Auto spcial Expo",
            "description": "lorem ipsum",
            "date": "2012-04-23T18:25:43.511Z"
        },
        {
            "_id": "3",
            "name": "Auto spcial Expo",
            "description": "lorem ipsum",
            "date": "2012-04-23T18:25:43.511Z"
        },
        {
            "_id": "4",
            "name": "Auto spcial Expo",
            "description": "lorem ipsum",
            "date": "2012-04-23T18:25:43.511Z"
        },
        {
            "_id": "5",
            "name": "Auto spcial Expo",
            "description": "lorem ipsum",
            "date": "2012-04-23T18:25:43.511Z"
        },
        {
            "_id": "6",
            "name": "Auto spcial Expo",
            "description": "lorem ipsum",
            "date": "2012-04-23T18:25:43.511Z"
        }
    ];

    User.findById(req.userId , function(err , user) {
       if(err){
           console.log("Error in find user  "+err);
       }
       else{
           //console.log("FInd user:  "+user.email);
           res.json({ "events": events, "useremail":user.email});
       }
    });
});

module.exports = router ;