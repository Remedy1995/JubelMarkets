const mongoose = require('mongoose');
const allwithdrawalSchema={
    total:Number,
    
}
const CountAllWithdrawal=mongoose.model("countallwithdrawal",allwithdrawalSchema);
module.exports=CountAllWithdrawal;
