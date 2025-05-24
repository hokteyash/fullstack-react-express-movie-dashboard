const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name:{
        type:String
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    favorites:[
        {
            poster_path:String,
            title:String,
            release_date:String,
            id:Number,
        }
    ]
});

module.exports = mongoose.model('User',userSchema);