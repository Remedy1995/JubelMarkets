const express=require('express');
const router=express.Router();
const CreatePost=require('../models/createpost')
const bodyparser = require('body-parser');
const mongoose=require('mongoose');



router.use(bodyparser.urlencoded({extended:false}));
router.use(bodyparser.json());

router.get('/deletepost:id', function(req,res){
 var id= req.params.id;
 console.log(id)
 if(id==="undefined"){
     console.log("the id is undefined")
     res.end();
    
 }
 else{
  CreatePost.findByIdAndDelete(id, async function (err) {
    
    if(err){console.log(err)
    }
    else{
  

    await CreatePost.find({}).then(purchase=>{
      res.json(purchase)
      console.log("Successful deletion");
    
    })
  }
})
}



})



module.exports=router;