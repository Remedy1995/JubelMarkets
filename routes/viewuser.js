const express=require('express');
const router=express.Router();
const AddUser=require('../models/createuser');//models to create a user

router.get('/viewuser:id',function(req,res){
    AddUser.findById(req.params.id,function(err,information){
       if(information){
           res.json(information)
       }
       else{
           console.log("error")
       }
    })
})
module.exports=router;