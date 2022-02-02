const express=require('express');
const router=express.Router();
const CountAgentCustomer=require('../models/count/agentregistercustomers');
const session=require("cookie-session");
const MongoDbStore = require('connect-mongo');
const cookie=require("cookie-parser");
const mongoDB=process.env.MONGO_PASSWORD;
router.use(
  
  session({
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
  router.use(function(req,res,next){
    if(!req.session){
      res.redirect("/")
        return next(new Error('Oh no')) //handle error

    }
    next() //otherwise continue
    });
router.use(cookie());

  
router.get('/countallagentcustomers', function(req,res){
  const agentname=req.session.username;
   CountAgentCustomer.find({'agentname' : new RegExp(agentname, 'i')}, function(err, docs){
   for(i=0;i<docs.length;i++){
     var total=docs[i].total;
   }

res.json(total)
  })

})
module.exports=router;