const mongoose = require('mongoose');
const CreateUserSchema={
    firstname:String,
    file:String,
    lastname:String,
    username:String,
     email:String,
    phone:String,
    address:String,
    password:String,
    gender:String,
    date:{
        type: Date,
        required: 'Please fill From Date'
},
isAdmin:{
    type: Boolean,
    default:false
}
}
const CreateUser=mongoose.model("createuser",CreateUserSchema);
module.exports=CreateUser;
