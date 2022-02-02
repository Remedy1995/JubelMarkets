const express=require('express');
const router=express.Router();
const CountCustomer=require('../models/count/countcustomers');

router.get('/countallcustomers',async function(req,res){
  await CountCustomer.find({}).then(purchase=>{
      res.json(purchase)
    })
})
module.exports=router;