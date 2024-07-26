import Navbar from "@/components/Global/Navbar";
import { useEffect, useState } from "react";
import { Link, useParams } from 'react-router-dom'


const backend = import.meta.env.VITE_BACKEND;

interface Video {
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

interface Teacher {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  courses: Video[];
  __v: number;
}


export default function Teacher() {
  const [teacher,setTeacher] = useState<Teacher | null>(null);
  const params = useParams<{teacherId:string}>();

  useEffect(()=>{
    const getTeacherDetail= async () => {
      const res = await fetch(`${backend}/api/teacher/getTeacherData/${params.teacherId}`);
      const data = await res.json();
      
      if(res.ok && data.teacher){
        setTeacher(data.teacher);
      }
    }
    void getTeacherDetail();
  },[params])

  return (
    <section className='page-class text-white'>
      <Navbar/>
      <p>Teacher courses</p>
      {
        teacher 
        ?
        <div>
          <p>{teacher.firstName} {' '} {teacher.lastName}</p>
          {teacher.courses.map((item)=>(
            <Link to={`/course/${item._id}`}>
              <div>
                <img className="w-40 h-40" src={`https://res.cloudinary.com/dknsgexk8/image/upload/v1721739667/${item.thumbnail}`} alt={item.title}/>
              </div>
            </Link>
          ))}
        </div>
        :
        <p>This Teacher has no courses currently</p>
      }
    </section>
  )
}
