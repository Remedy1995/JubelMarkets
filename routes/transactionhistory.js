const express=require('express');
const router=express.Router();
const AddUser=require('../models/createuser');//models to create a user
const Transaction=require('../models/transactionhistory');
router.get('/transaction',function(req,res){
   Transaction.find({},function(err,data){
  res.json(data)
    });
})
module.exports=router;