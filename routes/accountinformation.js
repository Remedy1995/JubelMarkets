const express=require('express');
const router=express.Router();
const AddUser=require('../models/createuser');
const bodyparser = require('body-parser');
router.use(bodyparser.urlencoded({extended:false}));
router.use(bodyparser.json());


router.post('/accountinfo', async function(req,res){
    
   const username=req.body.username;
  
   //check if customer has an initial deposit first
   AddUser.find({'username' : new RegExp(username, 'i')}, function(err, docs){
        for(i=0;i<docs.length;i++){
        var accountinfo=docs[i].accountnumber;
        
        }
        console.log(accountinfo)
        res.json(docs)
    })
  
})

//post


// router.post('/depositorinfo', async function(req,res){
    
//     const username=req.body.username;
//     const account=req.body.account;
//     const amount=req.body.amount;
//     const date=req.body.date;
 
//     console.log(Deposit());
//     //check if customer has an initial deposit first
//     Deposit.find({'username' : new RegExp(username, 'i')}, function(err, docs){
//          for(i=0;i<docs.length;i++){
//          var username=docs[i].username;
         
//          }
//          console.log(username)
//          res.json(docs)
//      })
   
//  })




module.exports=router;