const express=require('express');
const router=express.Router();
const Deposit=require('../models/deposit');
const bodyparser = require('body-parser');
router.use(bodyparser.urlencoded({extended:false}));
router.use(bodyparser.json());
const Transaction=require('../models/transactionhistory');
const SeeHistory=require('../deposit');
const { plugin } = require('mongoose');
const CheckDate=require('../date');
const checktotaldeposit=require('../totaldeposittemplate');
const totaldeposit=require('../models/count/totaldeposit');
router.post('/deposit', async function(req,res){
    totaldeposit();
   const accountnumber=req.body.accountnumber;
   const amount=(req.body.amount);
   const date=req.body.date;
   
   console.log(req.body.agentname)
 
   console.log(Deposit());
   //check if customer has an initial deposit first
   Deposit.find({'accountnumber' : new RegExp(accountnumber, 'i')}, function(err, docs){
        for(i=0;i<docs.length;i++){
        var existing_amount=docs[i].amount;
        console.log(existing_amount)
    var new_amount=parseInt(existing_amount)+parseInt(amount);
    console.log(new_amount)
        }
        var query = { accountnumber : accountnumber };//check where there is an item and update
        var data = {amount : new_amount }
      Deposit.updateOne(query,data,(err,collection) => {



          if(err) throw err;
          console.log("Record updated successfully");
          console.log(collection);

//add deposit 


 totaldeposit.find({}).then(information=>{
  for(i=0;i<information.length;i++){
      const total=information[i].total;//get the initial total
      
      var add=parseFloat(total)+parseFloat(amount);
      var addtotal=add.toFixed(2);
      console.log(add)
      var query = { total : total };//we search for the total field 
      var data = {total :  addtotal}//we update our initial data 
      totaldeposit.updateOne(query,data,(err,collection) => {
        if(err) throw err;
        console.log("Record of deposit updated successfully");
        console.log(collection);
      })

  }
})
     
totaldeposit.find({}).then(information=>{
  if(information.length<1){
    const depositaccount= new totaldeposit(
      {
          
           total:amount,
          
      });
      depositaccount.save()
  }
})


      });
      Deposit.find({'accountnumber' : new RegExp(accountnumber, 'i')},async function(err, docs){
             if(docs.length<1) {
                const depositaccount= new Deposit(
                    {
                         accountnumber:accountnumber,
                         amount:amount,
                         date:CheckDate()
                    });
                const deposit= depositaccount.save();
                if(deposit){
                    res.send("deposit made successfully");
                    console.log("deposit made successfully")
                }
                       
             }                       
    })

    //update the transaction history whenever a customer makes a withdrawal
const deposithistory= new Transaction(
  {     
       amount:amount,
       date:CheckDate(),
       transactiondetails:SeeHistory(accountnumber,amount,CheckDate()),
       accountnumber:accountnumber,
  }
)
 deposithistory.save().then(res=>{
  if(res){
    console.log("successful recorded transaction")
  }else{
    console.log("error occured while recording transaction")
  }
 })
   })



})
module.exports=router;