const express=require('express');
const router=express.Router();
const CreateAgent=require('../models/createsusuagents');
const bodyparser = require('body-parser');
router.use(bodyparser.urlencoded({extended:false}));
router.use(bodyparser.json());


router.get('/agentsearch', async function(req,res){
    
   const username=req.body.username;
   const amount=req.body.amount;
   const date=req.body.date;

   //check if customer has an initial deposit first
   CreateAgent.find({'username' : new RegExp(username, 'i')}, function(err, docs){
        // for(i=0;i<docs.length;i++){
        // var username=docs[i].username;
        
        // }
        // console.log(docs)
        res.json(docs)
    })
  
})

//post


router.post('/agentsearch', async function(req,res){
    
    const username=req.body.username;
    //check if customer has an initial deposit first
    CreateAgent.find({'username' : new RegExp(username, 'i')}, function(err, docs){
         for(i=0;i<docs.length;i++){
         var username=docs[i].username;
         
         }
         console.log(username)
         res.json(docs)
     })
   
 })




module.exports=router;