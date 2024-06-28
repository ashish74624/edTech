// import React from 'react'

export default function SideBg() {
  return (
    <section className="hidden xl:block relative h-screen w-[50vw]">
        <img src="/teaching.jpg" alt="teaching_img" className='w-full h-full' />
        <div className='w-full h-full bg-black/60 absolute inset-0 flex flex-col justify-center items-center text-white gap-2'>
        <h1 className="text-teal text-5xl">LOGO</h1>
          <h3 className="text-3xl">Great to see you again!</h3>
          <h3 className="text-xl">Log in to continue where you left off</h3>
        </div>
    </section>
  )
}
