import Button from '@/components/Global/Button';
import Navbar from '@/components/Global/Navbar'
import { useEffect, useState, FormEvent  } from 'react';
import { Link, useParams } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast';
import useAuth from '@/hooks/useAuth';
// import { Course } from '@/components/Types/types';
const backend = import.meta.env.VITE_BACKEND;

interface Course {
  _id: string;
  title: string;
  description: string;
  teacher: string;
  videos: string[];
  isFree: boolean;
  createdAt: string;
  thumbnail: string;
  __v: number;
}
interface Videos {
  _id: string;
  title: string;
  description: string;
  url: string;
  course: string;
  __v: number;
}

interface CourseResponse {
  message: string;
  course?: Course;
}


export default function Course() {
  const { userType } = useAuth();
  const params = useParams<{courseId:string}>();
  const [course,setCourse] = useState<Course | null>(null);
  const [showVideoForm,setShowVideoForm] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [title,setTitle] = useState('');
  const [description,setDescription] = useState('')
  const [videos,setVideos] = useState<Videos[] | null>(null);
  const [uploading,setUploading] = useState(false);
  

   const handleFileChange = async(event:React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setFile(event.target.files[0]);
    }  
  };

  const onSubmit = async(e:FormEvent<HTMLFormElement>) =>{
    setUploading(true)
    e.preventDefault();
      const formData = new FormData();
      formData.append('file', file as File);
      formData.append('title', title);
      formData.append('description', description);
      formData.append('courseId', params?.courseId as string);
        try {
            const res = await fetch(`${backend}/api/video/addVideo`,{
                method:'POST',
                body : formData
            });
            const output = await res.json();
            if(res.ok){
                toast.success(output.message);
            }else{
                toast.error(output.message);
            }
        } catch {
            toast.error("Some error");
        }
        setUploading(false)
    }
  
  useEffect(()=>{
    const getCourseDetail = async()=>{
      try {
        const res = await fetch(`${backend}/api/course/getCourseDetail/${params?.courseId}`);
        const data : CourseResponse = await res.json();
        if(res.ok && data.course){
          setCourse(data.course)
        }
      } catch (error) {
        console.log(error)
      }
    }

    const getCourseVideo = async()=>{
      const res = await fetch(`${backend}/api/video/getCourseVideo/${params?.courseId}`);
      const data = await res.json();
      if(res.ok && data.videos){
        setVideos(data.videos)
      }
    }

    void getCourseDetail();
    void getCourseVideo();
  },[params])

  return (
    <section className='page-class text-white'>
      <Navbar/>
      <div className='px-8 mt-4'>
        <div className='flex justify-between items-center'>
          <div className='w-max'>
            <h1 className='text-6xl'>{course?.title}</h1>
            <p className='text-lg text-gray-200 mt-2'>{course?.description}</p>
          </div>
          {
            userType ==='TEACHER' &&
            <div>
              <Button onClick={()=>{setShowVideoForm(!showVideoForm)}} variant="medium" text='Add Videos' />
            </div>
          }
        </div>
         {
            showVideoForm &&
            <form onSubmit={onSubmit} className="bg-black w-96 h-max border border-white rounded-md mx-auto flex flex-col items-center py-2 px-8 dark" >
              <h2 className="text-lg">Video detail</h2>
              <div className='relative z-0 w-full mb-6 group'>
                <input type='text' name='title' onChange={(e)=>{setTitle(e.target.value)}} id='title' className='login-inputs peer' placeholder=' ' required />
                <label htmlFor='title' className='login-labels'>Enter Title</label>
              </div>
              <div className='relative z-0 w-full mb-6 group'>
                <input type='text' name='description' id='description' onChange={(e)=>{setDescription(e.target.value)}} className='login-inputs peer' placeholder=' ' required />
                <label htmlFor='description' className='login-labels'>Enter Description</label>
              </div>
              <input accept="video/*" className="block mb-4 w-full text-sm text-gray-900 border border-gray-300 rounded-md cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" aria-describedby="file_input_help" onChange={handleFileChange} id="file_input" type="file"/>

              <Button disabled={uploading} type='submit' variant='small' text={`${uploading?"uploading...":"Submit"}`}/>
            </form>
          }
        <div className='w-full h-full mt-4'>
          {
            course && course.videos.length>0 
            ?
            <p>Here the videos of the following course :</p>
            :
            userType==="TEACHER" 
            ?
            <div className='w-max mx-auto'>
              Your course does not have any videos
            </div>
            :
            <p className='w-max mx-auto'>This course does not have any videos</p>
          }
         
          {
            videos &&
            <div className='grid grid-cols-1 mt-8 md:grid-cols-2 xl:grid-cols-3 gap-4 w-max mx-auto'>
            {

              videos.map((item)=>(
                <Link  key={item._id} to={`/watch/${item._id}`}>
                <div className="bg-black w-96 h-max rounded-md flex flex-col items-center overflow-hidden border border-white">
                  <video src={item.url} />
                  <p className='m-2'>
                    {item.title}
                  </p>
                </div>
                  </Link>
              ))
            }
            </div>
          }
        </div>
      </div>
      <Toaster/>
    </section>
  )
}
