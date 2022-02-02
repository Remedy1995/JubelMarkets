const mongoose = require('mongoose');
const CreateUserSchema={
    agentname:String,
    firstname:String,
    lastname:String,
    username:String,
     email:String,
    phone:String,
    date:String,
    address:String,
    occupation:String,
    password:String,
    file:String,
    accountnumber:String,
    file1:String,
    file_url:String,
    file1_url:String
}
const CreateUser=mongoose.model("createuser",CreateUserSchema);
module.exports=CreateUser;
