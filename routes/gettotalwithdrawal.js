const express=require('express');
const router=express.Router();
const Getwithdrawal=require('../models/count/totalwithdrawal');

router.get("/gettotalwithdrawal",async function (req,res){

    await Getwithdrawal.find({}).then(withdrawal=>{
      res.json(withdrawal)
      console.log(withdrawal)
    })
  })
  
  module.exports=router;