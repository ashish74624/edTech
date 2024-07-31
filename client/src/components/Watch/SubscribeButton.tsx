import { useEffect, useState } from "react"
import Button from "../Global/Button"

interface Props {
    subscriptions : string[];
    teacherId:string;
    studentId:string
}

const backend = import.meta.env.VITE_BACKEND;


export default function SubscribeButton({teacherId,studentId}:Props) {
    
    const [isSubscribed ,setIsSubscribed] = useState(true);
    console.log(isSubscribed)
    const subscribe = async()=>{
    const res = await fetch(`${backend}/api/student/subscribe`,{
        method:'PUT',
        headers:{
            'Content-type':'application/json'
        },
        body: JSON.stringify({
            studentId : studentId,
            teacherId: teacherId
        })
    })
    if(res.ok){
        setIsSubscribed(true)
    }
  }

  const Unsubscribe = async () => {
    const res = await fetch(`${backend}/api/student/unSubscribe`,{
        method :'PUT',
        headers:{
            'Content-type':'application/json'
        },
        body: JSON.stringify({
            studentId : studentId,
            teacherId: teacherId
        })
    })
    if(res.ok){
        setIsSubscribed(false)
    }
  }

  useEffect(()=>{
    const getSubInfo= async()=>{
        const res = await fetch(`${backend}/api/student/getSubInfo/${studentId}/${teacherId}`);
        const data = await res.json();
        if(res.ok){
            setIsSubscribed(data.isSubscribed);
        }else{
            setIsSubscribed(false);
        }
    }
    void getSubInfo();
  })

  return <Button variant='medium' text={` ${isSubscribed ? 'Unsubscribe ?' :'Subscribe'} `} onClick={isSubscribed ? Unsubscribe : subscribe}/>
}
