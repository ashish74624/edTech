import { Link } from "react-router-dom";
import NavBar from "./components/NavbarLanding";
import { Meteors } from "./components/ui/meteors";
import Button from "./components/Global/Button";

export default function App() {
  return (
    <main className="h-screen w-screen bg-zinc-900 relative overflow-hidden">
      <NavBar/>
      <Meteors number={20}/>
      <section className="w-full h-max my-8">
        <h1 className="text-white text-3xl md:text-5xl lg:text-7xl mx-auto w-full lg:w-[45%]">
          Advance your Career <br /> in a Digitized World.
        </h1>
        <p className="text-gray-200 text-sm md:text-base mx-auto mt-4 w-full lg:w-[45%]">
          We provide you with unrestricted access to greatest courses from the top teachers, allowing you to learn from countless lessons in a range of topics.
        </p>
        <div className="w-max flex flex-col md:flex-row gap-4 mt-4 mx-auto">
          <Link to={'/login'}>
            <Button variant='large' text="Get Started"/>
          </Link>
          {/* <Button text="Upload Course"/> */}
        </div>
      </section>
    </main>
  );
}
