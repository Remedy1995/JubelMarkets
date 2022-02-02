const express=require('express');
const router=express.Router();
const AgentUser=require('../models/createsusuagents');
const bodyparser = require('body-parser');
const md5=require('md5');
router.use(bodyparser.urlencoded({extended:false}));
router.use(bodyparser.json());



router.get("/agentchangepassword",(req,res)=>{
  username=req.session.username;
  
  AgentUser.find({'username' : new RegExp(username, 'i')}, function(err, docs){
    for(i=0;i<docs.length;i++){
    var id=docs[i].id;
    
    }
    // console.log(id)
    res.json(id)
})
})




router.post('/agentchangepassword:id', function(req,res){
    var id=req.params.id;
    var oldpassword=md5(req.body.oldpassword);
    var newpassword=md5(req.body.newpassword);
    console.log(oldpassword)
    console.log(newpassword)
    AgentUser.findOne({password:oldpassword},function(err,founduser){
        if(!founduser){
        console.log("error")
        res.status(404).json({ error: 'No password matches this please try again' })
        }
        else if(newpassword===""){
          res.status(401).json({ error: 'please enter your new  password' })
        }
        else{
        console.log("correct")
        AgentUser.findByIdAndUpdate(id,{password:newpassword},function(err,docs){
        
          if(err){
            console.log(err)
          }
          else{
            console.log("updated")
            res.status(200).json({ success: 'Password Updated Succesfully' })
    
          }
        })
        
        }
        
        })
   
 })




module.exports=router;