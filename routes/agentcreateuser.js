const express=require('express');
const router=express.Router();
const customtemplate=require('../countcustomertemplate');
const countagentcustomer=require('../models/count/agentregistercustomers');
const AddUser=require('../models/createuser');//models to create a user
const bodyparser = require('body-parser');
const md5=require('md5');
const CountAgentCustomer = require('../models/count/agentregistercustomers');
const cloudinary=require('cloudinary').v2;
const upload=require('../middleware/multer');
const config=require('../config/config');
router.use(bodyparser.urlencoded({extended:false}));
router.use(bodyparser.json());


router.post('/agentcreateuser',upload.single('file'), async function(req,res){

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



var imgsrc = 'client/public/images/' + req.file.filename
console.log(imgsrc)

   const agentname=req.body.agentname;
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
   console.log(agentname)
   console.log(firstname)
console.log(phone)
   //generate account numbers for the newly created customers
   //get only the first character from the customer firstname;
   let trimfirst=firstname;
    trimmedfirstname=trimfirst.charAt(0)
   //get the last character from the customer lastname;
   let trimlast=lastname;
   trimmedlastname=trimlast.charAt(0);

   //now let generate 4 random numbers
   var random = Math.floor(1000 + Math.random() * 9000);
    
   //we now have to cocatenate all our variables

   let accountnumber=trimmedfirstname+trimmedlastname+random;


    const adduser=  new AddUser(
        {
            agentname:agentname,
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
             accountnumber:accountnumber,
             file_url:download_url
        }
    )
   const submit= adduser.save();
   if(submit){

       customtemplate();

       console.log("data has been submitted successfully");
    //update the count field in the database when a customer is registered
     countagentcustomer.find({}).then(information=>{
        for(i=0;i<information.length;i++){
            const total=information[i].total;//get the initial total
            console.log(total)
            var add=total+1;//we increment by 1 when a customer is registered
            var query = { agentname : agentname };//we search for the total field 
            var data = {total :  add}//we update our initial data 
            countagentcustomer.updateOne(query,data,(err,collection) => {
              if(err) throw err;
              console.log("Record updated successfully");
              console.log(collection);
            })

        }
   })
   countagentcustomer.find({'agentname' : new RegExp(agentname, 'i')}, function(err, docs){
    if(docs.length<1){
    
    const initialsave=new countagentcustomer(
       {
           total:1,
           agentname:agentname
       }
   )
   initialsave.save();//start the initial count of customers
    }
    })

}
   else{
       res.send("error in sending data");
   }
})
}
})


module.exports=router;