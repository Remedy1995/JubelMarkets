const mongoose = require('mongoose');
const AllCommissionSchema={
    totalcommission:Number,
    
}
const AllCommission=mongoose.model("allcommission",AllCommissionSchema);
module.exports=AllCommission;
