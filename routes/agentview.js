const express=require('express');
const router=express.Router();
const CreateAgent=require('../models/createsusuagents');

router.get('/agentview:id',function(req,res){
    CreateAgent.findById(req.params.id,function(err,information){
       if(information){
           res.json(information)
       }
       else{
           console.log("error")
       }
    })
})
module.exports=router;