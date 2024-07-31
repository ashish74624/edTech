import express from "express";
import Student from "../models/Student.js";

const subscribe = async(req,res)=>{
    try {
        const student = await Student.findById(req.body.studentId);

        if(!student){
            return res.status(404).json({message:"Student not found"});
        }

        if(student.subscriptions.includes(req.body.teacherId)){
            return res.status(409).json({message:"Subscription already added"})
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

const mySubscriptions = async(req,res)=>{
    try {
        const sub = await Student.findById(req.params.studentId).populate('subscriptions');
        if(sub.length<=0){
            return res.status(404).json({message:"No subscriptions found"});
        }
        return res.status(200).json({message:"Subscription found", subscriptions:sub.subscriptions});
    } catch {
        return res.status(500).json({message:"Can't get subscriptions at the moment"})
    }
}

const getSubInfo = async(req,res)=>{
    try {
        const student = await Student.findById(req.params.studentId);

        if(student.subscriptions.includes(req.params.teacherId)){
            return res.status(200).json({message:"Subscription already added", isSubscribed:true})
        }else{
            return res.status(200).json({message:"Subscription not added", isSubscribed:false})
        }
    } catch (error) {
        return res.status(500).json({message:"Can't get subscriptions at the moment"})
    }
}

export { subscribe, Unsubscribe, mySubscriptions, getSubInfo }