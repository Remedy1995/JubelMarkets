const express=require('express');
const router=express.Router();
const Daily_Transaction=require('../models/dailytransactions');
const multer = require("multer");
const path = require('path')
const Checkdate=require('../date')
const bodyParser = require('body-parser');
const cors = require("cors");
const cloudinary=require('cloudinary').v2;
const config=require('../config/config');
const upload=require('../middleware/multer');
router.use(cors());
router.use(express.static("./public"))
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));
 
 
//@type   POST
//route for post data
router.post("/upload", upload.single('file'), (req, res) => {
    const fullname=req.body.fullname;
    console.log(fullname)
    if (!req.file) {
        console.log("No file upload");
        res.status(400).json({error: 'Please select file' })
    } else {
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



        // var imgsrc = '/images/' + req.file.filename
        // console.log(imgsrc)
      const upload=new Daily_Transaction({
          image:final_file,
          fullname:fullname,
          image1:download_url,
          date:Checkdate()
      })
      const up=upload.save();
      if(up){
          console.log("successfully uploaded the transaction")
      }
    }
        )


}
}
)

console.log(Checkdate())



module.exports=router;