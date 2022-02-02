const mongoose = require('mongoose');
const countagentdepositcustomerSchema={
    total:Number,
    agentname:String
}
const CountAgentDeposit=mongoose.model("countagentdeposit",countagentdepositcustomerSchema);
module.exports=CountAgentDeposit;