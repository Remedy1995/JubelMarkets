const express=require('express');
const router=express.Router();
const AllCommission=require('../models/count/totalcommision');

router.get('/allcommission',async function(req,res){
  await AllCommission.find({}).then(commission=>{
      res.json(commission)
    })
})
module.exports=router;