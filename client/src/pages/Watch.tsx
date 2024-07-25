import Navbar from '@/components/Global/Navbar';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'
import { Videos } from '@/components/Types/types';
import Button from '@/components/Global/Button';
import useAuth from '@/hooks/useAuth';

const backend = import.meta.env.VITE_BACKEND;


export default function Watch() {
  const { userType, userData } =   useAuth();
  const [video,setVideo] =  useState<Videos | null >(null);
  const [teacherId,setTeacherId] =  useState<string>('');
  const [isSubscribed,setIsSubscribed] = useState(false);
  const params = useParams<{videoId:string}>();
  const subscribe = async()=>{
    const res = await fetch(`${backend}/api/student/subscribe`,{
        method:'PUT',
        headers:{
            'Content-type':'application/json'
        },
        body: JSON.stringify({
            studentId : userData?._id,
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
            studentId : userData?._id,
            teacherId: teacherId
        })
    })
    if(res.ok){
        setIsSubscribed(false)
    }
  }

  useEffect(()=>{
    const getVideo= async() =>{
        const res = await fetch(`${backend}/api/video/getVideo/${params.videoId}`);
        const data = await res.json();
        if(res.ok && data.video){
            setVideo(data.video)
            setTeacherId(data.teacherId)
        }
    }
    void getVideo();

    if(userData?.subscriptions?.includes(teacherId)){
        setIsSubscribed(true)
    }else{
        console.log("here")
        setIsSubscribed(false)
    }

  },[params.videoId,userData,teacherId])

  return (
    <section className='page-class'>
      <Navbar/>
      {
        video && 
        <div>
            <video src={video.url} controls/>
            <p className='text-white'>{video.title}</p>
            {
                userType==='STUDENT' &&
                <Button variant='medium' text={` ${isSubscribed ? 'Unsubscribe ?' :'Subscribe'} `} onClick={isSubscribed ? Unsubscribe : subscribe}/>
            }
        </div>
      }
    </section>
  )
}
