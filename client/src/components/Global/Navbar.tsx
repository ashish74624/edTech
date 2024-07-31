import useAuth from "../../hooks/useAuth";
import { useNavigate } from 'react-router-dom';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"


export default function Navbar() {
  const navigate = useNavigate();

  const { userData, userType } = useAuth();
  const logout = ()=>{
    localStorage.removeItem('userDataToken')
    localStorage.removeItem('userTypeToken')
    navigate('/')
  }
  return (
    <nav className=' w-screen text-white bg-teal flex justify-between items-center px-8 py-2'>
      <h1 className="text-lg font-Lobster">InspireEdTech</h1>
      <DropdownMenu>
        <DropdownMenuTrigger className="border border-white px-4 py-1 rounded-full">
          {userData?.firstName} {' '} {userData?.lastName}
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>{userType==="TEACHER"? "Teacher" :"Student"}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={logout} className="text-red-500">Log Out</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* <p className="flex">
        {userData?.firstName} {' '} {userData?.lastName}
      </p>
      <button onClick={logout}>
        Log out
      </button> */}
    </nav>
  )
}
