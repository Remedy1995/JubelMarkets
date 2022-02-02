const express=require('express');
const router=express.Router();
const Agents=require('../models/createsusuagents');//models to create a user

router.get('/allsusuagents',async function(req,res){
  await Agents.find({}).then(information=>{
      res.json(information)
    })
})
module.exports=router;