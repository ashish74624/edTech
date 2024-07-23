import Button from "@/components/Global/Button";
import Navbar from "@/components/Global/Navbar";
import useAuth from "@/components/hooks/useAuth"
import SideBar from "@/components/Studio/SideBar";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import z from 'zod'
import { zodResolver } from "@hookform/resolvers/zod";

const backend = import.meta.env.VITE_BACKEND;

const schema = z.object({
    title : z.string().min(8),
    description : z.string().min(16)
})

type FormFeild = z.infer<typeof schema> 

export default function Studio() {
    const {userData} = useAuth();
    const [showForm,setShowForm] = useState(false);

    const { handleSubmit, register, formState:{errors} } = useForm<FormFeild>({
        resolver : zodResolver(schema)
    });

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
                        userId : userData?._id
                    }
                )
            });
            if(res.ok){
                console.log("ok");
            }
        } catch {
            console.log("error");
        }
    }

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
            </div>
        </div>
    </section>
  )
}
