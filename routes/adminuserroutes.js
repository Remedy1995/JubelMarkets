const express=require('express');
const router=express.Router();
const  AdminUser=require('../models/adminuser');//models to create a admin
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

router.post('/adminuser',function(req,res,next){
AdminUser();
const defaultusername="Admin";
const defaultpasword=md5("12345");

  req.session.username=req.body.username;
    var username=req.session.username;
   req.session.password=md5(req.body.password);
   var password=req.session.password;
  
//check whether this is registered in the database and post the username and password

AdminUser.find({}).then(information=>{
  if(information.length<1){
    const adminuser= new AdminUser(
      {
        agentname:"",
        firstname:"",
        lastname:"",
        username:defaultusername,
         email:"",
        phone:"",
        date:"",
        password:defaultpasword,
        file:"",
        accountnumber:"" 
          
          
      });
      adminuser.save()
  }
})





















  console.log(req.session.username)
  //  console.log(password)
    AdminUser.findOne({username:username},function(err,founduser){
      if(!founduser){
        console.log("wrong username")
        res.status(400).json({error: 'this username is not available ' })
      }
      else{

     if(founduser.password !=password){
      console.log("incorrect password")
      res.status(400).json({ error: 'incorrect pasword ' })
    }
   else{
     console.log("you have logged in ")
     res.status(200).json({ success: 'you have logged in ' })
   }
    

  }


})
  
});



module.exports=router;