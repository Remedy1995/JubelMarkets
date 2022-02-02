const express=require('express');
const router=express.Router();
const CreateUsers=require('../models/createusers')
const bodyparser = require('body-parser');
const cloudinary=require('cloudinary').v2;
const cloudinary_config=require('../config/cloudinaryconfig');
cloudinary_config();//for the cloudinary configurations
const upload=require('../middleware/multer');
router.use(bodyparser.urlencoded({extended:false}));
router.use(bodyparser.json());

router.post('/editusers:id',upload.single('file'), async function(req,res){
  
    
    if (!req.file) {
        console.log("No file upload");
        res.status(400).json({error: 'Please select file' })
    }
else{

// config();//configuration of the cloudinary apis
    

var imgsrc = 'client/public/images/' + req.file.filename
console.log(imgsrc)
cloudinary.uploader.upload(imgsrc,
  { public_id:  req.file.filename }, 
  function(error, result) {
      try{
      console.log(result.secure_url);
      console.log(result);
      //create a download url for the image 
      var image_version=result.version;
      var public_id=result.public_id;
      image_version="fl_attachment/";
      var format=result.format;
      var download_url ='https://res.cloudinary.com/dtcdazdpk/image/upload/'+image_version+public_id+"."+format;
console.log(download_url)
  var final_file=result.secure_url;
      }
      catch(err){
          console.log("please you have to set your time and date");
          res.status(400).json({error: 'please you have to set your time and date'})
      }



    
    var id=req.params.id;
    const firstname=req.body.firstname;
    const lastname=req.body.lastname;
    const username=req.body.username;
    const email=req.body.email;
    const phone=req.body.phone;
    const password=req.body.password;
    const date=req.body.date;
    const address=req.body.address;
    const gender=req.body.gender;
   const file=final_file;

   

    CreateUsers.findByIdAndUpdate(id, {firstname:firstname,lastname:lastname,username:username,email:email,phone:phone,password:password,date:date,address:address,gender:gender,file:file},
        function (err, docs) {                          
if (err){ 
console.log(err) 
} 
else{ 
console.log("data successfully updated");
} 
        })
    


    })
}
})
module.exports=router;