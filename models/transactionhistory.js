const mongoose = require('mongoose');
const TransactionSchema={
  
     username:String,
     firstname:String,
     amount:Number,
    date:String,
   transactiondetails:String,
   accountnumber:String,
   agentname:String
}
const Transaction=mongoose.model("transaction",TransactionSchema);
module.exports=Transaction;
