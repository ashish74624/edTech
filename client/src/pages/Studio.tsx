import Button from "@/components/Global/Button";
import Navbar from "@/components/Global/Navbar";
// import useAuth from "@/components/hooks/useAuth"
import SideBar from "@/components/Studio/SideBar";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import z from 'zod'
import { zodResolver } from "@hookform/resolvers/zod";


const schema = z.object({
    title : z.string().min(8),
    description : z.string().min(16)
})

type FormFeild = z.infer<typeof schema> 

export default function Studio() {
    // const {userData} = useAuth();
    const [showForm,setShowForm] = useState(false);

    const { handleSubmit, register } = useForm<FormFeild>({
        resolver : zodResolver(schema)
    });

    const onSubmit:SubmitHandler<FormFeild> = async() =>{
        try {
            const res = await fetch('');
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
                    <Button variant="medium" text="Add Course" onClick={()=>{setShowForm(!showForm)}}/>
                </div>
                {
                    showForm && 
                    <form onSubmit={handleSubmit(onSubmit)} className="bg-black w-96 h-max border border-white rounded-md mx-auto flex flex-col items-center">
                        <h2 className="text-lg">Course detail</h2>
                        <div className='relative z-0 w-full mb-6 group px-8'>
                            <input {...register('title')} type='text' name='title' id='title' className='login-inputs peer' placeholder=' ' required />
                            <label htmlFor='title' className='login-labels'>Enter Title</label>
                        </div>
                        <div className='relative z-0 w-full mb-6 group px-8'>
                            <input {...register('description')} type='text' name='description' id='description' className='login-inputs peer' placeholder=' ' required />
                            <label htmlFor='description' className='login-labels'>Enter Description</label>
                        </div>
                        <div className="bg-teal h-4 rounded-b-md w-full">

                        </div>
                    </form>
                }
            </div>
        </div>
    </section>
  )
}
