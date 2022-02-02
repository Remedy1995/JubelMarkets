const mongoose = require('mongoose');
const WithdrawHistorySchema={
  
     username:String,
     firstname:String,
     amount:Number,
    date:String,
   
}
const WithdrawalHistory=mongoose.model("withdrawal",WithdrawHistorySchema);
module.exports=WithdrawalHistory;
