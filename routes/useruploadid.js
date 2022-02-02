const express=require('express');
const router=express.Router();
const path=require('path');
const multer=require("multer");
const AddUser=require('../models/createuser');
const countcustomer=require('../models/count/countcustomers');
const bodyparser = require('body-parser');
const upload=require('../middleware/multer');
const cloudinary=require('cloudinary').v2;
const config=require('../config/config');
router.use(bodyparser.urlencoded({extended:false}));
router.use(bodyparser.json());


router.post('/useruploadid:id', upload.single('file'),async function(req,res){
    var id=req.params.id;






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




//     var imgsrc = '/images/' + req.file.filename
//    const file1=imgsrc;
//  console.log(file1)
   AddUser.findByIdAndUpdate(id, { file1:final_file,file1_url:download_url},
    function (err, docs) {                          
if (err){ 
console.log(err) 
} 
else{ 
console.log("idcard successfully updated for user");
} 
})
})
}
})


module.exports=router;