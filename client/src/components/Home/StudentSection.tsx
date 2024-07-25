import { useEffect, useState } from "react"
import { Course } from "../Types/types";
import { Link } from "react-router-dom";

const backend = import.meta.env.VITE_BACKEND;


export default function StudentSection() {
    const [courses,setCourses] = useState<Course[] | null >(null);

    useEffect(()=>{
        const getCourseRecomendation = async() =>{
            const res = await fetch(`${backend}/api/course/getCourseRecomendation`);
            const data = await res.json();
            if(res.ok && data.courses ){
                setCourses(data.courses);
            }
        }
        void getCourseRecomendation();
    },[]);

  return (
    <section>
      <div>
        <p>All Coures</p>
        {
            courses && 
            courses.map((item)=>(
                <Link key={item._id} to={`/course/${item._id}`}>
                <div>
                    <img className="w-40 h-40" src={`https://res.cloudinary.com/dknsgexk8/image/upload/v1721739667/${item.thumbnail}`}/>
                </div>
                </Link>
            ))
        }
      </div>
      <div>
        <p>Your subscriptions</p>
      </div>
    </section>
  )
}
