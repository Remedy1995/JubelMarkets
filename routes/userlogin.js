const express=require('express');
const router=express.Router();
const AddUser=require('../models/createuser');//models to create a user
const bodyparser = require('body-parser');
const session=require("express-session");
const cookie=require("cookie-parser");
const md5=require('md5');
const oneDay = 1000 * 60 * 60 * 24;
router.use(session({secret: 'ssshhhhh',saveUninitialized: true,
cookie: { maxAge: oneDay },
resave: false}
));
router.use(cookie());
router.use(express.json());
router.use(express.urlencoded({ extended: true }));
router.use(bodyparser.urlencoded({extended:false}));
router.use(bodyparser.json());

router.post('/userlogin',function(req,res,next){
AddUser();
  req.session.username=req.body.username;
    var username=req.session.username;
   req.session.password=md5(req.body.password);
   var password=req.session.password;
  
  console.log(req.session.username)
  //  console.log(password)
    AddUser.findOne({username:username},function(err,founduser){
      if(!founduser){
        console.log("wrong username")
        res.status(400).json({error: 'this username is not available ' })
      }
      else{

     if(founduser.password !=password){
      console.log("incorrect password")
      res.status(400).json({ error: 'incorrect password ' })
    }
   else{
     console.log("you have logged in ")
     res.status(200).json({ success: 'you have logged in ' })
   }
    

  }


})
  
});



module.exports=router;