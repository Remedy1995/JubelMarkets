const mongoose = require('mongoose');
const countcustomerSchema={
    total:Number
}
const CountCustomer=mongoose.model("countcustomer",countcustomerSchema);
module.exports=CountCustomer;
