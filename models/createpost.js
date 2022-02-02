const mongoose = require('mongoose');
const CreatePostSchema={
    postTitle:String,
    file:String,
    postCategory:String,
    options:String,
    content:String,
    date:{
        type: Date,
        required: 'Please fill From Date'
}

}
const CreatePost=mongoose.model("createpost",CreatePostSchema);

module.exports=CreatePost;
