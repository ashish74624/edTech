import { UserData } from "../Types/types";

interface Props {
  userData:UserData | null;
  // userType:string;
}

export default function Navbar({userData}:Props) {
  return (
    <nav className=' w-screen text-white bg-teal flex justify-between px-8 py-2'>
      <h1>LOGO</h1>
      <p className="flex">
        {userData?.firstName} {' '} {userData?.lastName}
      </p>
    </nav>
  )
}
