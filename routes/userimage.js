const express=require('express');
const router=express.Router();
const AddUser=require('../models/createuser');
router.get("/userimage",(req,res)=>{
    username=req.session.username;
    AddUser.find({'username' : new RegExp(username, 'i')}, function(err, docs){
      for(i=0;i<docs.length;i++){
      
         var file=docs[i].file;
      }
     res.json(file)
    })
  
  })
  module.exports=router;