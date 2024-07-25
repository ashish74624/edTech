import Button from "../components/Global/Button";
import Navbar from "../components/Global/Navbar";
import { Link } from "react-router-dom";
import useAuth from "@/hooks/useAuth";
import StudentSection from "@/components/Home/StudentSection";


export default function Home() {
  
  const { userType } = useAuth();

  return (
    <main className="page-class">
      <Navbar />
      {
        userType === 'TEACHER'
        ?
        <section className="w-[80%] mx-auto bg-black rounded-md h-[75%] border mt-10 border-white text-white flex flex-col justify-center items-center">
          <p className="text-xl">You Currently have no courses uploaded</p>
          <Link to={'/studio'}>
            <Button variant="medium" text="Create Course"/>
          </Link>
          
        </section>
        :
        <StudentSection/>
      }

    </main>
  )
}
