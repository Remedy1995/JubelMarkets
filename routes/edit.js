const express=require('express');
const router=express.Router();
const AddUser=require('../models/createuser');//models to create a user
const bodyparser = require('body-parser');
router.use(bodyparser.urlencoded({extended:false}));
router.use(bodyparser.json());


router.get('/edit:id',function(req,res){

    console.log(req.params.id)
})


router.post('/edit:id',function(req,res){
  var username=req.body.username;
  var firstname=req.body.firstname;
  var lastname=req.body.lastname;
  var email=req.body.email;
  var phone=req.body.phone;
  var date=req.body.date;
    var id=req.params.id;
    var address=req.body.address;
    var occupation=req.body.occupation;

    AddUser.findByIdAndUpdate(id, { username:username,firstname:firstname,lastname:lastname,email:email,
        phone:phone,date:date,address:address,occupation:occupation}, 
        function (err, docs) {                          
if (err){ 
console.log(err) 
} 
else{ 
console.log("data successfully updated");
} 
})
})
module.exports=router;