import express from "express";
import mongoose from "mongoose";
import AuthRouter from './Routes/AuthRoute'


const app = express();
app.use(express.json());

app.use('/api',AuthRouter);

mongoose.connect(process.env.MONGO_URL)
.then(()=>{
    console.log("Connected to MongoDb")
}).catch(()=>{
    console.log('Failed to connect to MongoDb')
})

app.listen(process.env.PORT,()=>{
    console.log(`Server started on port : ${process.env.PORT}`);
})