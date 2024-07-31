import React, { useState } from 'react';
import SideBg from '../components/Auth/SideBg';
import { Link } from 'react-router-dom';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';

const schema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().email(),
  password: z.string()
});

type FormField = z.infer<typeof schema>;

const backend = import.meta.env.VITE_BACKEND;

export default function SignUp() {

  const { register, handleSubmit, formState: { errors }, setError } = useForm<FormField>({
    resolver: zodResolver(schema)
  });
  const navigate = useNavigate();
  const [selectedValue, setSelectedValue] = useState('');
  const [userType,setUserType] = useState('');

  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedValue(e.target.value);
    setUserType(e.target.value);
  }

  const onSubmit: SubmitHandler<FormField> = async (data) => {
    console.log("Submitted data:", data); // Log the form data
    if(userType.length<=0  ){
      toast.error("Please select : Teacher or Student");
      throw new Error("");
    }
    try {
      const res = await fetch(`${backend}/api/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...data,
          userType:userType
        })
      });
      const output = await res.json(); 
      if (res.ok) {
        navigate('/login');
      } else {
        toast.error(output.message); 
      }
    } catch (error) {
      console.error("Error during registration", error);
      setError('root', {
        message: "Registration failed. Please try again."
      });
    }
  }

  return (
    <main className='dark h-screen w-screen overflow-x-hidden overflow-y-auto grid grid-cols-2 bg-zinc-900'>
      <SideBg heading='Welcome to our community!' text='Begin your educational journey as a teacher or student' />
      {/* Form */}
      <section className='h-[80vh] xl:h-screen w-screen xl:w-[50vw] flex flex-col justify-center items-center xl:grid xl:place-content-center bg-zinc-900'>
        <div className="flex xl:hidden items-center w-full flex-col mb-4">
          <h1 className="text-teal text-5xl font-Lobster">InspireEdTech</h1>
          <h3 className="text-2xl">Great to see you again!</h3>
          <h3 className="">Log in to continue where you left off</h3>
        </div>
        <div className='w-80 lg:w-96 h-max py-4 pb-5 lg:pb-8 bg-zinc-700 lg:py-8 rounded-xl px-8 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]'>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid md:grid-cols-2 md:gap-6">
              <div className="relative z-0 w-full mb-3 md:mb-6 group">
                <input {...register('firstName')} type="text" name="firstName" id="firstName" className="input-base peer dark-input" placeholder=" " required />
                <label htmlFor="firstName" className="label-base dark-label">First name</label>
              </div>
              <div className="relative z-0 w-full mb-3 md:mb-6 group">
                <input {...register('lastName')} type="text" name="lastName" id="lastName" className="input-base dark-input peer" placeholder=" " required />
                <label htmlFor="lastName" className="label-base dark-label">Last name</label>
              </div>
            </div>
            <div className="relative z-0 w-full mb-3 md:mb-6 group">
              <input {...register('email')} type="email" name="email" id="email" className="input-base peer dark-input" placeholder=" " required />
              <label htmlFor="email" className="label-base dark-label">Email address</label>
            </div>
            <div className="relative z-0 w-full mb-3 md:mb-6 group">
              <input {...register('password')} type="password" name="password" id="password" className="input-base dark-input peer" placeholder=" " required />
              <label htmlFor="password" className="label-base dark-label">Password</label>
            </div>
            <div className="relative z-0 w-full mb-3 md:mb-6 group text-white">
              <p>Join As:</p>
              <div className="space-y-2 mt-2">
                <label className={`flex justify-center border ${selectedValue === 'TEACHER' ? 'border-teal' : 'border-white'} py-2 rounded-md`} htmlFor={'teacher'}>
                  <input className='hidden' onChange={handleRadioChange} name="userType" id={'teacher'} value={'TEACHER'} type="radio" />
                  <p>Teacher</p>
                </label>
                <label className={`flex justify-center border ${selectedValue === 'STUDENT' ? 'border-teal' : 'border-white'} py-2 rounded-md`} htmlFor={'student'}>
                  <input className='hidden' onChange={handleRadioChange} name="userType" id={'student'} value={'STUDENT'} type="radio" />
                  <p>Student</p>
                </label>
              </div>
            </div>
            <button
              type='submit'
              className={`text-white bg-teal font-medium rounded-lg text-sm w-full py-2.5 text-center hover:bg-teal-900 flex justify-center active:bg-red-500`}>
              Sign Up
            </button>
            {errors.root && <div className='text-red-500 text-sm font-GraphikBlack'>{errors.root?.message}</div>}
          </form>
          <p className='text-black text-xs mt-4 dark:text-white'>Already have an account? <Link to={'/login'}><span className='text-xs text-teal hover:underline pl-1'>Login</span></Link> </p>
        </div>
      </section>
      <Toaster/>
    </main>
  );
}
