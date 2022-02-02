const mongoose = require('mongoose');
const DepositSchema={
    accountnumber:String,
    amount:Number,
    date:String,
   
}
const Deposit=mongoose.model("deposit",DepositSchema);
module.exports=Deposit;
