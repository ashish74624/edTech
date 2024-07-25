import useAuth from "../../hooks/useAuth";
import { useNavigate } from 'react-router-dom';

export default function Navbar() {
  const navigate = useNavigate();

  const { userData } = useAuth();
  const logout = ()=>{
    localStorage.removeItem('userDataToken')
    localStorage.removeItem('userTypeToken')
    navigate('/')
  }
  return (
    <nav className=' w-screen text-white bg-teal flex justify-between px-8 py-2'>
      <h1>LOGO</h1>
      <p className="flex">
        {userData?.firstName} {' '} {userData?.lastName}
      </p>
      <button onClick={logout}>
        Log out
      </button>
    </nav>
  )
}
