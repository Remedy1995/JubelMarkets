const express=require('express');
const router=express.Router();
const Createpost=require('../models/createpost');
router.get("/checkfeaturedposts", async function(req,res){
     
    var options="Featured posts";
    Createpost.find({'options' : new RegExp(options, 'i')}, function(err, docs){    
   res.json(docs)
  
    }).sort({date:-1}).limit(7)//limit to only the last seven posts
})


router.get("/checklatestposts", async function(req,res){
     
    var options="Latest posts";
    Createpost.find({'options' : new RegExp(options, 'i')}, function(err, docs){    
   res.json(docs)
  
    })
})



router.get("/checktopposts", async function(req,res){
     
    var options="Top posts";
    Createpost.find({'options' : new RegExp(options, 'i')}, function(err, docs){    
   res.json(docs)
  
    })
})



module.exports=router;


