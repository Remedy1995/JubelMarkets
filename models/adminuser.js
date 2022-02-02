const mongoose = require('mongoose');
const CreateAdminSchema={
    agentname:String,
    firstname:String,
    lastname:String,
    username:String,
     email:String,
    phone:String,
    date:String,
    password:String,
    file:String,
    accountnumber:String
}
const CreateAdminUser=mongoose.model("createadmin",CreateAdminSchema);
module.exports=CreateAdminUser;
