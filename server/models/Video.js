import mongoose from 'mongoose'

const VideoSchema = new mongoose.Schema({
    title: {type:String,required:true},
    description : {type:String,required:true},
    course : {type:mongoose.Schema.Types.ObjectId, ref :'Course'},
    url : {type:String},
    createdAt: { type: Date, default: Date.now }
})

const Video = mongoose.model('Video',VideoSchema);

export default Video