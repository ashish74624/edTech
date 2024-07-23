import { useEffect, useState } from "react";
import Button from "../components/Global/Button";
import Navbar from "../components/Global/Navbar";
import { UserData } from "../components/Types/types";
import { useNavigate } from "react-router-dom";


export default function Home() {
  const navigate = useNavigate();
  const [userData,setUserData] = useState<UserData | null>(null);
  const [userType,setUserType] = useState<string | null>(null);
  const uD = localStorage.getItem('userDataToken');
  const uT = localStorage.getItem('userTypeToken');
  
  useEffect(()=>{
    if(uD){
      setUserData(JSON.parse(uD as string));
    }else{
      navigate('/login');
    }
    if(uT){
      setUserType(uT as string);
    }
    
  },[uD,uT,navigate])
  return (
    <main className="page-class">
      <Navbar userData={userData as UserData} />
      {
        userType === 'TEACHER'
        ?
        <section className="w-[80%] mx-auto bg-black rounded-md h-[75%] border mt-10 border-white text-white flex flex-col justify-center items-center">
          <p className="text-xl">You Currently have no courses uploaded</p>
          <Button variant="medium" text="Upload Now"/>
        </section>
        :
        <></>
      }

    </main>
  )
}
