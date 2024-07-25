import Navbar from '@/components/Global/Navbar';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'
import { Videos } from '@/components/Types/types';
import Button from '@/components/Global/Button';
import useAuth from '@/hooks/useAuth';

const backend = import.meta.env.VITE_BACKEND;


export default function Watch() {
  const { userType } =   useAuth();
  const [video,setVideo] =  useState<Videos | null >(null);
  const params = useParams<{videoId:string}>();
  const subscribe = ()=>{
    console.log(params)
  }

  useEffect(()=>{
    const getVideo= async() =>{
        const res = await fetch(`${backend}/api/video/getVideo/${params.videoId}`);
        const data = await res.json();
        if(res.ok && data.video){
            setVideo(data.video)
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
            <video src={video.url} controls/>
            <p className='text-white'>{video.title}</p>
            {
                userType==='STUDENT' &&
                <Button variant='small' text='Subscibe' onClick={subscribe}/>
            }
        </div>
      }
    </section>
  )
}
