interface Props {
  heading:string;
  text:string;
}

export default function SideBg({heading,text}:Props) {
  return (
    <section className="hidden xl:block relative h-screen w-[50vw]">
        <img src="/teaching.jpg" alt="teaching_img" className='w-full h-full' />
        <div className='w-full h-full bg-black/60 absolute inset-0 flex flex-col justify-center items-center text-white gap-2'>
        <h1 className="text-teal font-Lobster text-5xl">InspireEdTech</h1>
          <h3 className="text-3xl">{heading}</h3>
          <h3 className="text-xl">{text}</h3>
        </div>
    </section>
  )
}
