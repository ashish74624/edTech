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
      <p className="text-4xl mt-4 mx-2">Teacher courses</p>
      {
        teacher 
        ?
        <div>
          <p className="text-3xl w-max mx-auto">{teacher.firstName} {' '} {teacher.lastName}</p>
          <div className="grid grid-cols-1 mt-8 md:grid-cols-2 xl:grid-cols-3 gap-4 w-max mx-auto">

          {teacher.courses.map((item)=>(
            <Link to={`/course/${item._id}`}>
              <div className="bg-black w-96 max-h-72 h-max rounded-md overflow-hidden border border-white">
                <img className="w-full h-56 rounded-md" src={`https://res.cloudinary.com/dknsgexk8/image/upload/v1721739667/${item.thumbnail}`} alt={item.title}/>
                <p className="m-4">
                  {item.title}
                </p>
              </div>
            </Link>
          ))}
          </div>
        </div>
        :
        <p>This Teacher has no courses currently</p>
      }
    </section>
  )
}
