import express from "express";
import mongoose from "mongoose";
import AuthRouter from './Routes/AuthRoute.js'
import TeacherRouter from './Routes/Teacher.js'
import cors from 'cors'

const app = express();
app.use(cors({
    origin:'*',
    methods:['GET','POST','PUT','DELETE'],
    credentials:true
}))
app.use(express.json());

app.use('/api',AuthRouter);
app.use('/api/teacher',TeacherRouter)

mongoose.connect(process.env.MONGO_URL)
.then(()=>{
    console.log("Connected to MongoDb")
}).catch(()=>{
    console.log('Failed to connect to MongoDb')
})

app.listen(process.env.PORT,()=>{
    console.log(`Server started on port : ${process.env.PORT}`);
})