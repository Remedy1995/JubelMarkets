const mongoose=require('mongoose');

function Connection(){
//connection to the database 
const mongodb='mongodb://127.0.0.1/jubelmarkets';
mongoose.connect(mongodb,{useNewUrlParser:true,useUnifiedTopology:true}).then(()=>
{
  console.log("successfully connected to the database");
}).catch(err=>{
  console.log("error connecting to the database",err)
});

}

module.exports=Connection;

