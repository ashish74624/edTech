import React, { useState } from 'react';
import SideBg from '../components/Auth/SideBg';
import { Link } from 'react-router-dom';
export default function SignUp() {
  const isDiabled = false;
  const [selectedValue,setSelectedValue] = useState('');

  const handleRadioChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
    setSelectedValue(e.target.value);
  }

  return (
    <main className='dark h-screen w-screen overflow-x-hidden overflow-y-auto grid grid-cols-2 bg-zinc-900'>
      <SideBg heading='Welcome to our community! ' text='Begin your educational journey as a teacher or student' />
      {/* Form */}
      <section className='h-[80vh] xl:h-screen w-screen xl:w-[50vw] flex flex-col justify-center items-center xl:grid xl:place-content-center bg-zinc-900'>
        <div className="flex xl:hidden items-center w-full flex-col mb-4">
          <h1 className="text-teal text-5xl">LOGO</h1>
          <h3 className="text-2xl">Great to see you again!</h3>
          <h3 className="">Log in to continue where you left off</h3>
        </div>
        <div className='w-80 lg:w-96 h-max py-4 pb-5 lg:pb-8 bg-zinc-700 lg:py-8 rounded-xl px-8 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]'>
          <form>
            <div className="grid md:grid-cols-2 md:gap-6">
              <div className="relative z-0 w-full mb-3 md:mb-6 group">
                <input type="text" name="first_name" id="first_name" className="input-base peer dark-input" placeholder=" " required />
                <label htmlFor="first_name" className="label-base dark-label">First name</label>
              </div>
              <div className="relative z-0 w-full mb-3 md:mb-6 group">
                <input type="text" name="floating_last_name" id="floating_last_name" className="input-base dark-input peer" placeholder=" " required />
                <label htmlFor="floating_last_name" className="label-base dark-label">Last name</label>
              </div>
            </div>
            <div className="relative z-0 w-full mb-3 md:mb-6 group">
              <input type="email" name="floating_email" id="floating_email" className="input-base peer dark-input" placeholder=" " required />
              <label htmlFor="floating_email" className="label-base dark-label">Email address</label>
            </div>
            <div className="relative z-0 w-full mb-3 md:mb-6 group">
              <input type="password" name="floating_password" id="floating_password" className="input-base dark-input peer" placeholder=" " required />
              <label htmlFor="floating_password" className="label-base dark-label">Password</label>
            </div>

            <div className="relative z-0 w-full  mb-3 md:mb-6 group text-white">
              <p>Join As :</p>
              <div className="space-y-2 mt-2">
                <CustomInput value='TEACHER' onChange={(e)=>{handleRadioChange(e)}} id='teacher' htmlFor='teacher' isSelected={selectedValue==='TEACHER'} text='Teacher' />

                <CustomInput value='STUDENT' onChange={(e)=>{handleRadioChange(e)}} id='student' htmlFor='student' isSelected={selectedValue==='STUDENT'} text='Student' />
              </div>
            </div>
            <button
              disabled={isDiabled}
              type='submit'
              className={`text-white bg-teal font-medium rounded-lg text-sm w-full py-2.5 text-center hover:bg-teal-900 flex justify-center`}>
              Sign Up
            </button>
          </form>
          <p className='text-black text-xs mt-4 dark:text-white'>Already have an account? <Link to={'/login'}><span className='text-xs text-teal hover:underline pl-1'>Login</span></Link> </p>
        </div>
      </section>
    </main>
  );
}

interface customInputProps{
  id:string,
  value:string,
  onChange: React.ChangeEventHandler<HTMLInputElement> ,
  isSelected:boolean,
  text:string,
  htmlFor:string
}

const CustomInput = ({value,onChange,isSelected,text,htmlFor,id}:customInputProps)=>{
  return (
    <label className={`flex justify-center border ${isSelected?'border-teal':'border-white'}  py-2 rounded-md`} htmlFor={htmlFor}>
      <input className=' hidden' onChange={onChange} name="userType" id={id} value={value} type="radio" />
      <p>{text}</p>
    </label>
  )
}