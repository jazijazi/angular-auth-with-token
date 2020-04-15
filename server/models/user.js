//create user table(model) in database :
const mongoose = require('mongoose') ; 

const Schema = mongoose.Schema ;
const userSchema = new Schema ({
    email : String ,
    password : String
});
module.exports = mongoose.model('user', userSchema, 'users') //mongoose.model(name , Schema , collection)