const express=require('express');
const router=express.Router();
const Daily_Transaction=require('../models/dailytransactions');

router.get('/alldaily',function(req,res){
    Daily_Transaction.find({},function(err,purchase){
  res.json(purchase)
    });
})
module.exports=router;