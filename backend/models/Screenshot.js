const mongoose = require('mongoose');
const ScreenshotSchema = new mongoose.Schema({
    title:{type:String,required : true},
    description :{type:String},
    rating:{type:Number,min: 1, max: 10, required : true},
    imageURL:{type:String,required : true},
    category:{type:String, enum:['Anime','Series','Movie'],required : true},
    createdAt: {type: Date,default: Date.now}
});

module.exports = mongoose.model('Screenshot',ScreenshotSchema);