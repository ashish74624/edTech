import { Link } from "react-router-dom";
import { Meteors } from "./components/ui/meteors";
import Button from "./components/Global/Button";

export default function App() {
  return (
    <main className="h-screen w-screen flex justify-center items-center bg-zinc-900 relative overflow-hidden">
      <Meteors number={20}/>
      <section className="w-full h-max text-center">
        <h1 className="text-teal  text-3xl md:text-5xl lg:text-8xl font-Lobster mx-auto w-full lg:w-[45%]">
          InspireEdTech
        </h1>
        <h2 className="text-white text-3xl md:text-5xl mx-auto w-full lg:w-[45%]">
          Advance your Career in a Digitized World.
        </h2>
        <p className="text-gray-200 text-sm md:text-base mx-auto mt-4 w-full lg:w-[45%]">
          We provide you with unrestricted access to greatest courses from the top teachers, allowing you to learn from countless lessons in a range of topics.
        </p>
        <div className="w-max flex flex-col md:flex-row gap-4 mt-4 mx-auto">
          <Link to={'/login'}>
            <Button variant='large' text="Get Started"/>
          </Link>
        </div>
      </section>
    </main>
  );
}
