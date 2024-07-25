import express from "express";
import Student from "../models/Student.js";

const subscribe = async(req,res)=>{
    try {
        const student = await Student.findById(req.body.studentId);

        if(!student){
            return res.status(404).json({message:"Student not found"});
        }

        const update = await Student.updateOne({_id:req.body.studentId},{
            $push :{ subscriptions: req.body.teacherId }
        })
        console.log(update)
        if(!update){
            return res.status(502).json({message:"Can't add subscription at the moment"})
        }

        return res.status(200).json({message:"Subscription added"});

    } catch {
        return res.status(500).json({message:"Can't add subscription at the moment"})
    }
}


const Unsubscribe = async(req,res)=>{
    try {
        const student = await Student.findById(req.body.studentId);

        if(!student){
            return res.status(404).json({message:"Student not found"});
        }

        const update = await Student.updateOne({_id:req.body.studentId},{
            $pull :{ subscriptions: req.body.teacherId }
        })
        console.log(update)
        if(!update){
            return res.status(502).json({message:"Can't remove subscription at the moment"})
        }

        return res.status(200).json({message:"Subscription removed"});

    } catch {
        return res.status(500).json({message:"Can't remove subscription at the moment"})
    }
}

export { subscribe, Unsubscribe }