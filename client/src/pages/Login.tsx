import { SubmitHandler, useForm } from 'react-hook-form';
import { Link } from 'react-router-dom'
import {z} from 'zod'
import { zodResolver } from '@hookform/resolvers/zod';
import SideBg from '../components/Login/SideBg';

const schema = z.object({
    email: z.string().email(),
    password : z.string().min(8)
})

type FormField = z.infer<typeof schema>;

export default function Login() {

    const { handleSubmit ,register } = useForm<FormField>({
        resolver: zodResolver(schema)
    });

    const onSubmit: SubmitHandler<FormField> =()=>{

    }

  return (
     <main className=' h-screen w-screen overflow-x-hidden overflow-y-auto font-mono grid grid-cols-2 bg-zinc-900 text-white'>
        <SideBg/>
        {/* Form */}
        <section className=' h-[80vh] xl:h-screen w-screen xl:w-[50vw] flex flex-col justify-center items-center xl:grid xl:place-content-center bg-zinc-900'>
        <div className=" flex xl:hidden items-center w-full flex-col mb-4">
          <h1 className="text-teal text-5xl">LOGO</h1>
          <h3 className="text-2xl">Great to see you again!</h3>
          <h3 className="">Log in to continue where you left off</h3>
        </div>
        
      <div className='w-80 xl:w-96 h-max py-8 rounded-xl px-8 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] justify-self-center mr-0 mt-8 xl:mr-20 xl:mt-0 bg-zinc-700 text-white'>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='relative z-0 w-full mb-6 group '>
            <input {...register('email')} type='email' name='email' id='email' className='login-inputs peer' placeholder=' ' required />
            <label htmlFor='floating_email' className='login-labels'>Email address</label>
          </div>
          <div className='relative z-0 w-full mb-6 group'>
            <input {...register('password')} type='password' name='password' id='password' className='login-inputs peer' placeholder=' ' required/>
            <label htmlFor='floating_password' className='login-labels'>Password</label>
          </div>
            <button type='submit' 
            className={`w-full text-sm rounded-lg bg-teal  focus:outline-teal-800 active:bg-teal-900 active:outline-teal-700 font-medium py-2.5 text-center`}>
              Log in
            </button>
        </form>
          <p className="text-xs mt-4 ">Don&apos;t have an account yet ?<Link to={`/register`}><span className="text-xs text-teal hover:underline pl-1">Sign up</span></Link> </p>
      </div>
      </section>
    </main> 
  )
}
