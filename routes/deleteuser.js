const express=require('express');
const router=express.Router();
const AddUser=require('../models/createuser');
const bodyparser = require('body-parser');
const mongoose=require('mongoose');
const mongodb=require('mongodb');
const deletecustomertemplate=require('../deletecustomertemplate');

router.use(bodyparser.urlencoded({extended:false}));
router.use(bodyparser.json());

router.get('/delete:id', function(req,res){
 var id= req.params.id;
 console.log(id)
 if(id==="undefined"){
     console.log("the id is undefined")
     res.end();
    
 }
 else{
  AddUser.findByIdAndDelete(id, async function (err) {
    
    if(err){console.log(err)
    }
    else{
  

    await AddUser.find({}).then(purchase=>{
      res.json(purchase)
      console.log("Successful deletion");
      deletecustomertemplate()//decreases the total number of customers when a customers are deleted.
    })
  }
})
}



})



module.exports=router;