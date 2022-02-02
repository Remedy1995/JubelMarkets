const express=require('express');
const router=express.Router();
const Createpost=require('../models/createpost');
const category=require('../client/src/categories');
router.get("/category1", async function(req,res){
     
    const first=category.first;
    Createpost.find({'postCategory' : new RegExp(first, 'i')}, function(err, docs){    
   res.json(docs)
  
    }).sort({date:-1})
})


router.get("/category2", async function(req,res){
     
    const second=category.second;
    Createpost.find({'postCategory' : new RegExp(second, 'i')}, function(err, docs){    
   res.json(docs)
  
    }).sort({date:-1})
})



router.get("/category3", async function(req,res){
     
    const third=category.third;
    Createpost.find({'postCategory' : new RegExp(third, 'i')}, function(err, docs){    
   res.json(docs)
  
    }).sort({date:-1})
})

router.get("/category4", async function(req,res){
     
    var fourth=category.fourth;
    Createpost.find({'postCategory' : new RegExp(fourth, 'i')}, function(err, docs){    
   res.json(docs)
  
    }).sort({date:-1})
})



module.exports=router;


