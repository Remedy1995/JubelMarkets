const express=require('express');
const router=express.Router();
const TransactionSearch=require('../models/transactionhistory');
const bodyparser = require('body-parser');
router.use(bodyparser.urlencoded({extended:false}));
router.use(bodyparser.json());


router.get('/transactionsearch', async function(req,res){
    
  const accountnumber=req.body.accountnumber;
   const amount=req.body.amount;
   const date=req.body.date;

   //check if customer has an initial deposit first
   TransactionSearch.find({'accountnumber' : new RegExp(accountnumber, 'i')}, function(err, docs){
        // for(i=0;i<docs.length;i++){
        // var username=docs[i].username;
        
        // }
        // console.log(docs)
        res.json(docs)
    })
  
})

//post


router.post('/transactionsearch', async function(req,res){
    
    const accountnumber=req.body.accountnumber;
    //check if customer has an initial deposit first
    TransactionSearch.find({'accountnumber' : new RegExp(accountnumber, 'i')}, function(err, docs){
         for(i=0;i<docs.length;i++){
         var accountnumber=docs[i].accountnumber;
         
         }
         console.log(accountnumber)
         res.json(docs)
     })
   
 })




module.exports=router;