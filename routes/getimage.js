const express=require('express');
const router=express.Router();
const CreateAgent=require('../models/createsusuagents');
router.get("/getimage",(req,res)=>{
    username=req.session.username;
    CreateAgent.find({'username' : new RegExp(username, 'i')}, function(err, docs){
      for(i=0;i<docs.length;i++){
      
         var file=docs[i].file;
      }
     res.json(file)
    })
  
  })

  module.exports=router;