const mongoose = require('mongoose');
const alldepositcustomerSchema={
    total:Number,
    
}
const CountAllDeposit=mongoose.model("countalldeposit",alldepositcustomerSchema);
module.exports=CountAllDeposit;
