const express=require('express');
const router=express.Router();
const CreateUsers=require('../models/createusers');
router.get("/viewallusers", async function(req,res){

    await CreateUsers.find({}).then(details=>{
        console.log(details)
        res.json(details)
      })
})

module.exports=router;