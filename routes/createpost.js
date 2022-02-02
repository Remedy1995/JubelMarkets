const express=require('express');
const router=express.Router();

// const md5=require('md5');
// const countcustomer=require('../models/count/countcustomers');
const cloudinary=require('cloudinary').v2;
const cloudinary_config=require('../config/cloudinaryconfig');
cloudinary_config();//for the cloudinary configurations
const CreatePost=require('../models/createpost');//model to create new posts
const bodyparser = require('body-parser');
// const customtemplate=require('../countcustomertemplate');
const upload=require('../middleware/multer');
router.use(bodyparser.urlencoded({extended:false}));
router.use(bodyparser.json());


router.post('/createpost',upload.single('file'), async function(req,res){


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

  const postTitle=req.body.postTitle;
  const file=final_file;
  const postCategory=req.body.postCategory;
  const content=req.body.content;
  const options=req.body.options;


  const Create=  new CreatePost(
    {
       postTitle:postTitle,
       file:file,
       postCategory:postCategory,
       content:content,
       options:options,
       date:Date.now()
    }
)
const submit= Create.save();
if(submit){
   console.log("data has been submitted successfully");
//update the count field in the database when a customer is registered
// customtemplate();//function for the recording of customers

}
else{
   console.log("error in sending data");
}



      }
      catch(err){
          console.log("please you have to set your time and date");
          res.status(400).json({error: 'please you have to set your time and date'})


       

          
      }
  

    

 }

 )
}

})

module.exports=router;