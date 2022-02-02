const mongoose = require('mongoose');
const WithdrawSchema={
  
     username:String,
     amount:Number,
    date:String,
   
}
const Withdrawal=mongoose.model("withdrawal",WithdrawSchema);
module.exports=Withdrawal;
