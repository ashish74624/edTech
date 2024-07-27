import Navbar from '@/components/Global/Navbar';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom'
import { Videos } from '@/components/Types/types';
import Button from '@/components/Global/Button';
import useAuth from '@/hooks/useAuth';

const backend = import.meta.env.VITE_BACKEND;

interface Teacher {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    courses: string[];  
    __v: number;
}

export default function Watch() {
  const { userType, userData } =   useAuth();
  const [video,setVideo] =  useState<Videos | null >(null);
  const [teacher,setTeacher] =  useState<Teacher|null>(null);
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
            teacherId: teacher?._id
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
            teacherId: teacher?._id
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
            setTeacher(data.teacherDetail)
        }
    }
    void getVideo();

    if(userData?.subscriptions?.includes(teacher?._id as string)){
        setIsSubscribed(true)
    }else{
        console.log("here")
        setIsSubscribed(false)
    }

  },[])

  return (
    <section className='page-class'>
      <Navbar/>
      {
        video && 
        <div>
            <video className='w-[90vw] rounded-md border border-white h-[450px] mx-auto mt-4' src={video.url} controls/>
            <div className='text-white w-[90vw] mx-auto mt-4 bg-black border border-white p-4 rounded-md'>
              <h1>{video.title}</h1>
              <p className='text-gray-200'>
                {video.description}
              </p>
            </div>
            {
                userType==='STUDENT' &&
                <div className='text-white w-[90vw] mx-auto mt-4 bg-black border border-white p-4 rounded-md flex justify-between items-center'>
                  <Link to={`/teacher/${teacher?._id}`}>
                    <p>{teacher?.firstName} {' '} {teacher?.lastName}</p>
                  </Link>
                  <Button variant='medium' text={` ${isSubscribed ? 'Unsubscribe ?' :'Subscribe'} `} onClick={isSubscribed ? Unsubscribe : subscribe}/>
                </div>
            }
        </div>
      }
    </section>
  )
}
