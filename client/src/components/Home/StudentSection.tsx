import { useEffect, useState } from "react"
import { Course } from "../Types/types";
import { Link } from "react-router-dom";
import useAuth from "@/hooks/useAuth";

const backend = import.meta.env.VITE_BACKEND;

interface Subscription {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    courses: string[];  // Array of course IDs
    __v: number;        // Version key (typically used by Mongoose)
}


export default function StudentSection() {
    const { userData } = useAuth();
    const [courses,setCourses] = useState<Course[] | null >(null);
    const [subscriptions,setSubscriptions] = useState<Subscription[] | null>(null);
    useEffect(()=>{
        const getCourseRecomendation = async() =>{
            const res = await fetch(`${backend}/api/course/getCourseRecomendation`);
            const data = await res.json();
            if(res.ok && data.courses ){
                setCourses(data.courses);
            }
        }
        void getCourseRecomendation();
        
        const mySubscriptions = async () => {
            const res = await fetch(`${backend}/api/student/mySubscriptions/${userData?._id}`);
            const data = await res.json();
            if(res.ok && data.subscriptions){
                setSubscriptions(data.subscriptions);
            }
        } 
        void mySubscriptions();
    },[userData]);

  return (
    <section className="text-white">
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
        {
            subscriptions 
            ?
            subscriptions.map((item,i)=>(
                <div key={i}>
                    {item.email}
                </div>
            ))
            :
            <div>You currently have no subscriptions</div>
        }
      </div>
    </section>
  )
}
