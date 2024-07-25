import Button from "@/components/Global/Button";
import Navbar from "@/components/Global/Navbar";
import useAuth from "@/hooks/useAuth"
import SideBar from "@/components/Studio/SideBar";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import z from 'zod'
import { zodResolver } from "@hookform/resolvers/zod";
import toast, { Toaster } from 'react-hot-toast';
import convertToBase64 from "@/utils/base64";
import { Link } from "react-router-dom";
import {Course} from "../components/Types/types";

const backend = import.meta.env.VITE_BACKEND;


const schema = z.object({
    title : z.string().min(8),
    description : z.string().min(16)
})

type FormFeild = z.infer<typeof schema> 

export default function Studio() {
    const {userData} = useAuth();
    const [showForm,setShowForm] = useState(false);
    const [courses,setCourses] = useState<Course[] | null>(null);
    const [file,setFile] = useState<string | null>(null);
    const { handleSubmit, register, formState:{errors}, setError } = useForm<FormFeild>({
        resolver : zodResolver(schema)
    });

    const handleImageSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
        const base64 = await convertToBase64(event.target.files[0]);
        setFile(base64 as string);
    }
};


    const onSubmit:SubmitHandler<FormFeild> = async(data) =>{
        try {
            const res = await fetch(`${backend}/api/teacher/addCourse`,{
                method:'POST',
                headers :{
                    'Content-type':'application/json'
                },
                body : JSON.stringify(
                    {
                        ...data,
                        userId : userData?._id,
                        image:file
                    }
                )
            });
            const output = await res.json();
            if(res.ok){
                toast.success(output.message);
            }else{
                toast.error(output.message);
            }
        } catch {
            setError('root',{
                message :'Bad Request'
            })
        }
    }

    
    useEffect(()=>{
        const getCourses = async()=>{
            const res = await fetch(`${backend}/api/course/getCourses/${userData?._id}`);
            const data = await res.json();
            console.log(data.courses)
            setCourses(data.courses);
        }
        getCourses();
    },[userData])

  return (
    <section className='page-class'>
        <Navbar/>
        <div className="flex w-full text-white">
            <SideBar/>
            <div className="w-full ">
                <div className="flex w-full justify-between px-8 py-2">
                    <h1 className="text-4xl h-max">
                        Your Courses
                    </h1>
                    <Button variant="medium" text={` ${showForm ? 'Cancel' :'Add Course'}`} onClick={()=>{setShowForm(!showForm)}}/>
                </div>
                {
                    showForm && 
                    <form onSubmit={handleSubmit(onSubmit)} className="bg-black w-96 h-max border border-white rounded-md mx-auto flex flex-col items-center py-2 px-8">
                        <h2 className="text-lg">Course detail</h2>
                        <div className='relative z-0 w-full mb-6 group'>
                            <input type="file" accept="image/*" onChange={handleImageSelect}  />
                            <input {...register('title')} type='text' name='title' id='title' className='login-inputs peer' placeholder=' ' required />
                            <label htmlFor='title' className='login-labels'>Enter Title</label>
                        </div>
                        <div className='relative z-0 w-full mb-6 group'>
                            <input {...register('description')} type='text' name='description' id='description' className='login-inputs peer' placeholder=' ' required />
                            <label htmlFor='description' className='login-labels'>Enter Description</label>
                        </div>
                        <Button variant="large" text="Submit"/>
                        {errors.root && <div className='text-red-500 text-sm'>{errors.root?.message}</div>}
                        {errors.title && <div className='text-red-500 text-sm '>{errors.title?.message}</div>}
                        {errors.description && <div className='text-red-500 text-sm'>{errors.description?.message}</div>}
                    </form>
                }
                {
                    courses && courses.length>0
                    ?
                    <div>
                        {courses.map((item)=>(
                            <Link key={item._id} to={`/course/${item._id}`}>
                            <div className="bg-blue-900 w-56 h-56 px-2 rounded-md" >
                                <img className="w-full h-40" src={`https://res.cloudinary.com/dknsgexk8/image/upload/v1721739667/${item.thumbnail}`} alt={item.title}/>
                                <p>
                                    {item.title}
                                </p>
                            </div>
                            </Link>
                        ))}
                    </div>
                    :
                    <div>You don't have any courses</div>
                }
            </div>
        </div>
        <Toaster />
    </section>
  )
}
