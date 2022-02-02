const express=require('express');
const router=express.Router();
const UploadTransactionSearch=require('../models/dailytransactions');
const bodyparser = require('body-parser');
router.use(bodyparser.urlencoded({extended:false}));
router.use(bodyparser.json());


router.get('/uploadtransactionsearch', async function(req,res){
    
  const fullname=req.body.fullname;
   UploadTransactionSearch.find({'fullname' : new RegExp(fullname, 'i')}, function(err, docs){
      
        res.json(docs)
    })
  
})

//post


router.post('/uploadtransactionsearch', async function(req,res){
    
    const fullname=req.body.fullname;
    //check if customer has an initial deposit first
    UploadTransactionSearch.find({'fullname' : new RegExp(fullname, 'i')}, function(err, docs){
         for(i=0;i<docs.length;i++){
         var fullname=docs[i].fullname;
         
         }
         console.log(fullname)
         res.json(docs)
     })
   
 })




module.exports=router;