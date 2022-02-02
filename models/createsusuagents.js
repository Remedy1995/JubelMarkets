const mongoose = require('mongoose');
const CreateAgentSchema={
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
    file1:String,
    file_url:String,
    file1_url:String
}
const CreateAgent=mongoose.model("createagent",CreateAgentSchema);
module.exports=CreateAgent;
