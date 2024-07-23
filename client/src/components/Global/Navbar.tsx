import useAuth from "../hooks/useAuth";

export default function Navbar() {
  const {userData} = useAuth();
  return (
    <nav className=' w-screen text-white bg-teal flex justify-between px-8 py-2'>
      <h1>LOGO</h1>
      <p className="flex">
        {userData?.firstName} {' '} {userData?.lastName}
      </p>
    </nav>
  )
}
