const express=require('express');
const router=express.Router();
const CreateUser=require("../models/createusers");
const bodyparser = require('body-parser');
router.use(bodyparser.urlencoded({extended:false}));
router.use(bodyparser.json());

 router.post('/searchusers', async function(req,res){
    
    const username=req.body.username;
    
    CreateUser.find({'username' : new RegExp(username, 'i')}, function(err, docs){
       console.log(docs)
         res.json(docs)
     })

    })



module.exports=router;