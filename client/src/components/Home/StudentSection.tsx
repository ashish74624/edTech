import { useEffect, useState } from "react"
import { Course } from "../Types/types";
import { Link } from "react-router-dom";
import useAuth from "@/hooks/useAuth";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"

const backend = import.meta.env.VITE_BACKEND;

interface SubscriptionTeachers {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    courses: string[]; 
    __v: number;        
}


export default function StudentSection() {
    const { userData } = useAuth();
    const [courses,setCourses] = useState<Course[] | null >(null);
    const [subscriptions,setSubscriptions] = useState<SubscriptionTeachers[] | null>(null);
    useEffect(()=>{
        const getCourseRecomendation = async() =>{
            const res = await fetch(`${backend}/api/course/getCourseRecomendation`);
            const data = await res.json();
            if(res.ok && data.courses ){
                setCourses(data.courses);
            }
        }
        
        const mySubscriptions = async () => {
            const res = await fetch(`${backend}/api/student/mySubscriptions/${userData?._id}`);
            const data = await res.json();
            if(res.ok && data.subscriptions){
                setSubscriptions(data.subscriptions);
            }
        } 
        if(userData){

            void getCourseRecomendation();
            void mySubscriptions();
        }
    },[userData]);

  return (
    <section className="text-white">
      <div>
        {/* <p>All Coures</p> */}
        {
            courses && 
            <>
            <Carousel plugins={[ Autoplay({ delay: 2000 }) ]} className="w-[80vw] mx-auto mt-4">
                <CarouselContent>
                {courses.slice(0,5).map((item)=>(
                    <Link key={item._id} to={`/course/${item._id}`}>
                    <CarouselItem className="w-[80vw] h-96">
                        <img className="w-[80vw] h-96 rounded-md border-white border" src={`https://res.cloudinary.com/dknsgexk8/image/upload/v1721739667/${item.thumbnail}`}/>
                    </CarouselItem>
                    </Link>
                ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>
            <div className="mt-4 w-[80vw] mx-auto">
                <h2 className="text-4xl mb-4">All Courses</h2>
                <div className="grid-cols-8 md:grid-cols-2 xl:grid-cols-3 gap-4 w-max mx-auto grid">

                {
                    courses.map((item)=>(
                        <Link key={item._id} to={`/course/${item._id}`}>
                            <div className="bg-black w-96 max-h-72 h-max rounded-md overflow-hidden border border-white" >
                                <img className="w-full h-56 rounded-md" src={`https://res.cloudinary.com/dknsgexk8/image/upload/v1721739667/${item.thumbnail}`} alt={item.title}/>
                                <p className="m-4">
                                    {item.title}
                                </p>
                            </div>
                            </Link>
                    ))
                }
                </div>
            </div>
            </>

        }
      </div>
      <div className="w-[80vw] mx-auto mt-8">
        <p className="text-4xl">Your subscriptions</p>
        <div className="grid place-content-center grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 w-max mx-auto">

        {
            subscriptions 
            ?
            subscriptions.map((item,i)=>(
                <Link to={`/teacher/${item._id}`} key={i}>
                    <div className="bg-black border border-white px-8 py-2 rounded-md">
                        <p className="text-xl text-teal w-max mx-auto">{item.firstName} {" "} {item.lastName}</p>
                        <p className="w-max mx-auto">{item.email}</p>
                    </div>
                </Link>
            ))
            :
            <div>You currently have no subscriptions</div>
        }
        </div>
      </div>
    </section>
  )
}
