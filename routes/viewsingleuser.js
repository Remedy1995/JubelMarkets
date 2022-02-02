const express=require('express');
const router=express.Router();
const CreateUser=require('../models/createusers');

router.get('/viewsingleuser:id',function(req,res){
    CreateUser.findById(req.params.id,function(err,information){
       if(information){
           res.json(information)
       }
       else{
           console.log("error")
       }
    })
})
module.exports=router;