const express=require('express');
const database_conection=require('./config/databaseconfig')
const app=express();
const path=require('path');
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('public'));
app.use(express.static('files'));
app.use(express.static(__dirname + '/public'));
// parse application/json
app.use(bodyParser.json())
const cors = require("cors");
app.use(cors());
const port=5000;
database_conection();//connection to the database
const createpost=require('./routes/createpost');
const searchpost=require('./routes/searchpost');
const getallposts=require('./routes/getallposts')
const editpost=require('./routes/editpost');
const viewpost=require('./routes/viewpost');
const deletepost=require('./routes/deletepost');
const checkposts=require('./routes/checkposts');
const categorypost=require('./routes/categorypost');
const singleadmincategory=require('./routes/singleadmincategory');
const createusers=require("./routes/createusers");
const viewallusers=require("./routes/viewallusers")
const editusers=require("./routes/editusers");
const deleteusers=require("./routes/deleteusers");
const viewsingleuser=require("./routes/viewsingleuser");
const searchusers=require("./routes/searchusers");
app.use('/createpost',createpost)
app.use('/getallposts',getallposts)
app.use('/viewpost',viewpost)
app.use('/editpost',editpost)
app.use('/deletepost',deletepost)
app.use('/searchpost',searchpost)
app.use('/checkposts',checkposts)
app.use('/categorypost',categorypost);
app.use('/singleadmincategory',singleadmincategory);
app.use('/createusers',createusers);
app.use('/viewallusers',viewallusers);
app.use('/editusers',editusers);
app.use('/deleteusers',deleteusers);
app.use('/viewsingleuser',viewsingleuser);
app.use('/searchusers',searchusers);
app.listen(port,()=>{
    console.log("you have successfully connected to " +port);
});

