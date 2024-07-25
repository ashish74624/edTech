import Button from '@/components/Global/Button';
import Navbar from '@/components/Global/Navbar'
import { useEffect, useState, FormEvent  } from 'react';
import { useParams } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast';

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
  const params = useParams<{courseId:string}>();
  const [course,setCourse] = useState<Course | null>(null);
  const [showVideoForm,setShowVideoForm] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [title,setTitle] = useState('');
  const [description,setDescription] = useState('')
  const [videos,setVideos] = useState<Videos[] | null>(null);

  

   const handleFileChange = async(event:React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setFile(event.target.files[0]);
    }  
  };

  const onSubmit = async(e:FormEvent<HTMLFormElement>) =>{
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
    <section className='page-class'>
      <Navbar/>
      {params.courseId}
      <div className='text-white px-8'>
        <h1>{course?.title}</h1>
        <div className='w-full h-full'>
          {
            course && course.videos.length>0 
            ?
            <></>
            :
            <div>
              Your course does not have any videos
              <Button onClick={()=>{setShowVideoForm(!showVideoForm)}} variant="medium" text='Add Videos' />
            </div>
          }
          {
            showVideoForm &&
            <form onSubmit={onSubmit} className="bg-black w-96 h-max border border-white rounded-md mx-auto flex flex-col items-center py-2 px-8" >
              <h2 className="text-lg">Course detail</h2>
                        <div className='relative z-0 w-full mb-6 group'>
                            <input type="file" accept="video/*" onChange={handleFileChange}  />
                            <input type='text' name='title' onChange={(e)=>{setTitle(e.target.value)}} id='title' className='login-inputs peer' placeholder=' ' required />
                            <label htmlFor='title' className='login-labels'>Enter Title</label>
                        </div>
                        <div className='relative z-0 w-full mb-6 group'>
                            <input type='text' name='description' id='description' onChange={(e)=>{setDescription(e.target.value)}} className='login-inputs peer' placeholder=' ' required />
                            <label htmlFor='description' className='login-labels'>Enter Description</label>
                        </div>
                        <Button type='submit' variant='small' text='Submit'/>
            </form>
          }
          {
            videos &&
            videos.map((item)=>(
              <div key={item.title}>
                <video src={item.url} />
                {item.title}
              </div>
            ))
          }
        </div>
      </div>
      <Toaster/>
    </section>
  )
}
