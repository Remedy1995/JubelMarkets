const express=require('express');
const router=express.Router();
const CustomerTransactionSearch=require('../models/transactionhistory');
const bodyparser = require('body-parser');
router.use(bodyparser.urlencoded({extended:false}));
router.use(bodyparser.json());


//post

router.post('/searchcustomertransaction', async function(req,res){
    
    const date=req.body.date;
    //check if customer has an initial deposit first
    CustomerTransactionSearch.find({'date' : new RegExp(date, 'i')}, function(err, docs){
         for(i=0;i<docs.length;i++){
         var date=docs[i].date;
         
         }
         console.log(date)
         res.json(docs)
     })
   
 })




module.exports=router;