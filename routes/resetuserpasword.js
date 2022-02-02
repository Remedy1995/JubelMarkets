const express=require('express');
const router=express.Router();
const AddUser=require('../models/createuser');
const bodyparser = require('body-parser');
const md5=require('md5');
router.use(bodyparser.urlencoded({extended:false}));
router.use(bodyparser.json());



router.post('/resetuserpassword',function(req,res){  
    var username=req.body.username;
    AddUser.find({'username' : new RegExp(username, 'i')}, function(err, docs){
      for(i=0;i<docs.length;i++){
        var username=docs[i].username; 
     } if(username){
    
        console.log("hello")
       var password1=md5(req.body.password);
        var query = { username : username };
        var data = {password :  password1}
      AddUser.updateOne(query,data,(err,collection) => {
          if(err) throw err;
           res.status(200).json({ success: 'Password reset Succesfully' })
         
        
        console.log("password reset successfully");
          console.log(collection);
      })
      }else{
        console.log("error")
     
        res.status(404).json({ error: 'The username entered is not correct please try again' }) 
      }
      })
    })
  
  module.exports=router;