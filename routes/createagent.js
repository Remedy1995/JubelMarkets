const express=require('express');
const router=express.Router();
const CreateAgent=require('../models/createsusuagents');//models to create a user
const md5=require('md5');
const cloudinary=require('cloudinary').v2;
const upload=require('../middleware/multer');
const config=require('../config/config');
const bodyparser = require('body-parser');
router.use(bodyparser.urlencoded({extended:false}));
router.use(bodyparser.json());


router.post('/createagent', upload.single('file'),async function(req,res){
   

    if (!req.file) {
        console.log("No file upload");
        res.status(400).json({error: 'Please select file' })
    }
else{

    config();//configuration of the cloudinary apis
    

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
    var imgsrc = '/images/' + req.file.filename
   const firstname=req.body.firstname;
   const lastname=req.body.lastname;
   const username=req.body.username;
   const email=req.body.email;
   const phone=req.body.phone;
   const date=req.body.date;
   const address=req.body.address;
   const occupation=req.body.occupation;
   const password=md5(req.body.password);
   const file=imgsrc;
   console.log(firstname)
   console.log(lastname);
    
    const createuser= new CreateAgent(
        {
             firstname:firstname,
             lastname:lastname,
             username:username,
             email:email,
             phone:phone,
             date:date,
             address:address,
             occupation:occupation,
             password:password,
             file:final_file,
             file_url:download_url
        }
    )
   const submit= createuser.save();
   if(submit){
       console.log("agent has been created successfully");
      
   }
   else{
       console.log("error occured in creating the agent");
   }
})

}
})


module.exports=router;