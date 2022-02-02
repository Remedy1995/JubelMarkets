const express=require('express');
const router=express.Router();
const AgentUser=require('../models/createsusuagents');
const bodyparser = require('body-parser');
const mongoose=require('mongoose');
const mongodb=require('mongodb');


router.use(bodyparser.urlencoded({extended:false}));
router.use(bodyparser.json());

router.get('/agentdelete:id', function(req,res){
  var id= req.params.id;
  console.log(id)
  if(id==="undefined"){
      console.log("the id is undefined")
     res.end();
  }
  else{
   AgentUser.findByIdAndDelete(id, async function (err) {
     
     if(err){console.log(err)
     }
     else{
   
 
     await AgentUser.find({}).then(purchase=>{
       res.json(purchase)
       console.log("Successful deletion");
     })
   }
 })
 }
})



module.exports=router;