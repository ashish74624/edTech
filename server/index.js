import express from "express";
import mongoose from "mongoose";
import AuthRouter from './Routes/AuthRoute.js'
import TeacherRouter from './Routes/Teacher.js'
import CourseRoute from './Routes/Course.js'
import VideoRoute from './Routes/Video.js'
import StudentRoute from './Routes/Student.js'
import cors from 'cors'

const app = express();
app.use(cors({
    origin:'*',
    methods:['GET','POST','PUT','DELETE'],
    credentials:true
}))
app.use(express.json({limit:'500mb'}));
app.use(express.urlencoded({ limit: '500mb', extended: true }));

app.use('/api',AuthRouter);
app.use('/api/teacher',TeacherRouter)
app.use('/api/course',CourseRoute)
app.use('/api/video',VideoRoute)
app.use('/api/student',StudentRoute)

mongoose.connect(process.env.MONGO_URL)
.then(()=>{
    console.log("Connected to MongoDb")
}).catch(()=>{
    console.log('Failed to connect to MongoDb')
})

app.listen(process.env.PORT,()=>{
    console.log(`Server started on port : ${process.env.PORT}`);
})