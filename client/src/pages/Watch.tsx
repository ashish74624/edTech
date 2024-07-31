import Navbar from '@/components/Global/Navbar';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom'
import { Videos } from '@/components/Types/types';
import useAuth from '@/hooks/useAuth';
import SubscribeButton from '@/components/Watch/SubscribeButton';

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
  const params = useParams<{videoId:string}>();

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

  },[params.videoId])

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
                  {userData &&

                  <SubscribeButton subscriptions={userData.subscriptions as string[]} teacherId={teacher?._id as string} studentId={userData._id}/>
                  }
                </div>
            }
        </div>
      }
    </section>
  )
}
