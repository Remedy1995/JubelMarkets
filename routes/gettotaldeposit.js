const express=require('express');
const router=express.Router();
const Getdeposit=require('../models/count/totaldeposit');

router.get("/gettotaldeposit",async function (req,res){

    await Getdeposit.find({}).then(deposit=>{
      res.json(deposit)
      console.log(deposit)
    })
  })
  
  module.exports=router;