const express=require('express');
const router=express.Router();
const Getagentdeposit=require('../models/count/agenttotaldeposit');

router.get('/countagentdeposit', function(req,res){
    const agentname=req.session.username;
     Getagentdeposit.find({'agentname' : new RegExp(agentname, 'i')}, function(err, docs){
     for(i=0;i<docs.length;i++){
       var total=docs[i].total;
     }
  
  res.json(total)
    })
  
  })



  module.exports=router;