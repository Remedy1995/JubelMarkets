const express=require('express');
const router=express.Router();
const Deposit=require('../models/deposit');
const bodyparser = require('body-parser');
router.use(bodyparser.urlencoded({extended:false}));
router.use(bodyparser.json());
const WithdrawalHistory=require('../models/withdrawalhistory');
const Transaction=require('../models/transactionhistory');
const SeeHistory=require('../withdraw');
const Checkdate=require('../date');
const Allwithdrawal=require('../models/count/totalwithdrawal');
const AllCommission=require('../models/count/totalcommision');

console.log(SeeHistory("ama",10,"2020"))

router.post('/makewithdrawal',async function(req,res){ 
  console.log(WithdrawalHistory());
  console.log(Deposit());
   const accountnumber=req.body.accountnumber;
   const amount=req.body.amount;
   
   console.log(accountnumber)
   console.log(amount)
   // //check if customer has an initial deposit first
   Deposit.find({'accountnumber' : new RegExp(accountnumber, 'i')}, function(err, docs){
        for(i=0;i<docs.length;i++){
        var existing_amount=docs[i].amount;
        console.log(existing_amount)
        }
        if(existing_amount<amount){
            
            console.log("please you cannot withdraw this amount of money");
            console.log(amount);
        }
        else{
         const new_amount=parseFloat(existing_amount)-parseFloat(amount);
        console.log(new_amount)
        var parsenewamount=new_amount.toFixed(2)
//calculate commissions whenever we make a withdrawal 
//withdrawal commission is one percent per withdrawal
    var commission=parseFloat(0.01)*amount;
    var commission1=commission.toFixed(2)
   console.log(commission1)
var grossamount=parsenewamount-commission1;

        var queryaccount = { accountnumber : accountnumber };//check where there is an item and update
        var remainingamount = {amount : grossamount}
      Deposit.updateOne(queryaccount,remainingamount,(err,collection) => {
          if(err) throw err;
          console.log("Record updated successfully");
          console.log(collection);
 //now let update our commissions in the database
 
 AllCommission.find({}).then(information=>{
  for(i=0;i<information.length;i++){
      const totalcommission=information[i].totalcommission;//get the initial total
      
      var addcommission=parseFloat(totalcommission)+parseFloat(commission1);
      var addcommissiontotal=addcommission.toFixed(2);
      console.log(addcommissiontotal)
      var query1 = { totalcommission : totalcommission };//we search for the total field 
      var data1 = {totalcommission:  addcommissiontotal}//we update our initial data 
      AllCommission.updateOne(query1,data1,(err,collection) => {
        if(err) throw err;
        console.log("Commissions updated successfully");
        console.log(collection);
      })

  }
})


//check if commission data is null
AllCommission.find({}).then(information=>{
  if(information.length<1){
    const checkcommission= new AllCommission(
      {
          
           totalcommission:commission1,
          
      });
      checkcommission.save()
  }
})
   









////////////////////////////////////////////////////



Allwithdrawal.find({}).then(information=>{
  for(i=0;i<information.length;i++){
      const total=information[i].total;//get the initial total
      
      var add=parseFloat(total)+parseFloat(amount);
      var addtotal=add.toFixed(2);
      console.log(add)
      var query = { total : total };//we search for the total field 
      var data = {total :  addtotal}//we update our initial data 
      Allwithdrawal.updateOne(query,data,(err,collection) => {
        if(err) throw err;
        console.log("Record of withdrawal updated successfully");
        console.log(collection);
      })

  }
})
  



Allwithdrawal.find({}).then(information=>{
  if(information.length<1){
    const withdrawaccount= new Allwithdrawal(
      {
          
           total:amount,
          
      });
      withdrawaccount.save()
  }
})
      });

   }


   })

   //record the withdrawal history of a customer
   const withdrawalhistory= await new WithdrawalHistory(
    {     accountnumber:accountnumber,
         amount:amount,
         date:Checkdate()
    }
)
const submit= withdrawalhistory.save();
if(submit){
   console.log("data has been submitted successfully");
}
else{
   console.log("error in sending data");
}



//update the transaction history whenever a customer makes a withdrawal
const transactionhistory= new Transaction(
  {   
       amount:amount,
       date:Checkdate(),
       transactiondetails:SeeHistory(accountnumber,amount,Checkdate()),
       accountnumber:accountnumber,
  }
)
 transactionhistory.save().then(res=>{
  if(res){
    console.log("successful recorded transaction")
  }else{
    console.log("error occured while recording transaction")
  }
 })





})
module.exports=router;