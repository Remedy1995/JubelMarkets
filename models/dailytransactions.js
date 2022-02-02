const mongoose = require('mongoose');
const DailyTransactionSchema={
    date:String,
   image:String,
   image1:String,
   fullname:String
}
const Daily_Transaction=mongoose.model("daily_transaction",DailyTransactionSchema);
module.exports=Daily_Transaction;
