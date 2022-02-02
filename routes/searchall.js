const express=require('express');
const router=express.Router();
const AddUser=require('../models/createuser');//models to create a user

router.get('/searchuser',async function(req,res){
  await AddUser.find({}).then(purchase=>{
      res.json(purchase)
    })
})
module.exports=router;