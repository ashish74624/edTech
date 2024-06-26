import NavBar from "./components/Navbar";
import { Meteors } from "./components/ui/meteors";

export default function App() {
  return (
    <main className="h-screen w-screen bg-black relative overflow-hidden">
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
          <Button text="Get Started"/>
          <Button text="Upload Course"/>
        </div>
      </section>
    </main>
  );
}

function Button({text}:{text:string}){
  return (
    <button className="s px-8 py-2  rounded-full text-white font-light transition duration-200 ease-linear shadow-[0_4px_14px_0_rgba(20,184,166,0.39)] hover:shadow-[0_6px_20px_rgba(20,184,166,0.23)] hover:bg-[rgba(20,184,166,0.9)] bg-[#14b8a6]">
        {text}
      </button>

  )
}