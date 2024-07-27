import Button from "@/components/Global/Button";
import Navbar from "@/components/Global/Navbar";
import useAuth from "@/hooks/useAuth"
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import z from 'zod'
import { zodResolver } from "@hookform/resolvers/zod";
import toast, { Toaster } from 'react-hot-toast';
import convertToBase64 from "@/utils/base64";
import { Link } from "react-router-dom";
import {Course} from "../components/Types/types";
import { useNavigate } from 'react-router-dom';

const backend = import.meta.env.VITE_BACKEND;


const schema = z.object({
    title : z.string(),
    description : z.string().min(8)
})

type FormFeild = z.infer<typeof schema> 

export default function Studio() {
    const {userData} = useAuth();
    const navigate = useNavigate();
    const [showForm,setShowForm] = useState(false);
    const [courses,setCourses] = useState<Course[] | null>(null);
    const [file,setFile] = useState<string | null>(null);
    const { handleSubmit, register, formState:{errors, isSubmitting}, setError } = useForm<FormFeild>({
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
                navigate('');
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
            <div className="w-full ">
                <div className="flex w-full justify-between px-8 py-2">
                    <h1 className="text-4xl h-max">
                        Your Courses
                    </h1>
                    <Button variant="medium" text={` ${showForm ? 'Cancel' :'Add Course'}`} onClick={()=>{setShowForm(!showForm)}}/>
                </div>
                {
                    showForm && 
                    <form onSubmit={handleSubmit(onSubmit)} className="bg-black w-96 h-max border border-white rounded-md mx-auto flex flex-col items-center py-2 px-8 dark">
                        <h2 className="text-lg">Course detail</h2>
                        
                        <label className="block mb-2 text-sm w-full  text-white " htmlFor="file_input">
                            Select Video
                        </label>
                        <input  accept="image/*"  className="block w-full text-sm text-gray-900 border border-gray-300 rounded-md cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" aria-describedby="file_input_help" onChange={handleImageSelect} id="file_input" type="file"/>
                        <p className="mt-1 text-xs w-full text-gray-500 dark:text-gray-300" id="file_input_help">Images only</p>
                        <div className='relative z-0 w-full mt-2 mb-6 group'>
                            <input {...register('title')} type='text' name='title' id='title' className='login-inputs peer' placeholder=' ' required />
                            <label htmlFor='title' className='login-labels'>Enter Title</label>
                        </div>
                        <div className='relative z-0 w-full mb-6 group'>
                            <input {...register('description')} type='text' name='description' id='description' className='login-inputs peer' placeholder=' ' required />
                            <label htmlFor='description' className='login-labels'>Enter Description</label>
                        </div>
                        <Button disabled={isSubmitting} variant="large" text={isSubmitting?"Loading...":"Submit"}/>
                        {errors.root && <div className='text-red-500 text-sm'>{errors.root?.message}</div>}
                        {errors.title && <div className='text-red-500 text-sm '>{errors.title?.message}</div>}
                        {errors.description && <div className='text-red-500 text-sm'>{errors.description?.message}</div>}
                    </form>
                }
                {
                    courses && courses.length>0
                    ?
                    <div className="grid grid-cols-1 mt-8 md:grid-cols-2 xl:grid-cols-3 gap-4 w-max mx-auto">
                        {courses.map((item)=>(
                            <Link key={item._id} to={`/course/${item._id}`}>
                            <div className="bg-black w-96 h-max rounded-md overflow-hidden border border-white" >
                                <img className="w-full h-56 rounded-md" src={`https://res.cloudinary.com/dknsgexk8/image/upload/v1721739667/${item.thumbnail}`} alt={item.title}/>
                                <p className="m-4">
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