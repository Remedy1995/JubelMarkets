const express=require('express');
const router=express.Router();
const Createpost=require('../models/createpost');

router.get('/viewpost:id',function(req,res){
    Createpost.findById(req.params.id,function(err,information){
       if(information){
           res.json(information)
       }
       else{
           console.log("error")
       }
    })
})
module.exports=router;