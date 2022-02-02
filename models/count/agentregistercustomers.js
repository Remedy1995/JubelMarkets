const mongoose = require('mongoose');
const countagentcustomerSchema={
    total:Number,
    agentname:String
}
const CountAgentCustomer=mongoose.model("countagentcustomer",countagentcustomerSchema);
module.exports=CountAgentCustomer;
