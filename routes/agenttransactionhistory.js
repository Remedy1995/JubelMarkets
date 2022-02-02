const express=require('express');
const router=express.Router();
const session=require("cookie-session");
const MongoDbStore = require('connect-mongo');
const mongoDB=process.env.MONGO_PASSWORD;
const Transaction=require('../models/transactionhistory');
router.use(session({
    cookie:{
        secure: true,
        maxAge:60000
           },
    secret: 'secret',
    saveUninitialized: true,
    resave: false,
    store: MongoDbStore.create({
      mongoUrl: mongoDB
    
    })
    }));
    
router.get('/agenttransaction',function(req,res){
  
   const agentname=req.session.username;
   //we can now use our account number to display customer transactions
    Transaction.find({'agentname' : new RegExp(agentname, 'i')}, function(err, docs){
     res.json(docs)
       console.log(docs)
    })

})
module.exports=router;