const express=require('express');
const router=express.Router();
const Createpost=require('../models/createpost');
router.get("/getallposts", async function(req,res){

    await Createpost.find({}).then(details=>{
        console.log(details)
        res.json(details)
      })
})

module.exports=router;