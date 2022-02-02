const express=require('express');
const router=express.Router();
const CreatePost=require('../models/createpost');
const bodyparser = require('body-parser');
router.use(bodyparser.urlencoded({extended:false}));
router.use(bodyparser.json());

 router.post('/searchpost', async function(req,res){
    
    const postTitle=req.body.postTitle;
    
    CreatePost.find({'postTitle' : new RegExp(postTitle, 'i')}, function(err, docs){
       console.log(docs)
         res.json(docs)
     })

    })



module.exports=router;