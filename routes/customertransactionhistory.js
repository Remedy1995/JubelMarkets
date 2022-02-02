const express=require('express');
const router=express.Router();
const session=require("cookie-session");
const MongoDbStore = require('connect-mongo');
const mongoDB=process.env.MONGO_PASSWORD;
const AddUser=require('../models/createuser');
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
    
router.get('/customertransaction',function(req,res){
  //get the username first 
    username=req.session.username;
    //use the username to get our account number
    AddUser.find({'username' : new RegExp(username, 'i')}, function(err, docs){

        for (i=0;i<docs.length;i++){
            var accountnumber=docs[i].accountnumber;
        }
        
          console.log(accountnumber)
      

   //we can now use our account number to display customer transactions
    Transaction.find({'accountnumber' : new RegExp(accountnumber, 'i')}, function(err, docs){
     res.json(docs)
       console.log(docs)
    })
})
})
module.exports=router;