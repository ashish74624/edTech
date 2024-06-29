import mongoose from 'mongoose'

const VideoSchema = new mongoose.Schema({
    title: {type:String,required:true},
    description : {type:String,required:true},
    course : {type:mongoose.Schema.Types.ObjectId, ref :'Course'},
    imageCloud : {type:{
        versionName:{type:String},  // Cloudinary version name
        generatedName:{type:String}, // Cloudinary generated name
        url: { type: String, required: true },  // Cloudinary URL
        publicId: { type: String, required: true }  // Cloudinary public ID
        },
        default:{}
    },
    createdAt: { type: Date, default: Date.now }
})

const Video = mongoose.model('Video',VideoSchema);

export default Video