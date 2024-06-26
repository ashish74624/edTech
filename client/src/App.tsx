import NavBar from "./components/Navbar";
import { Meteors } from "./components/ui/meteors";

export default function App() {
  return (
    <main className="h-screen w-screen bg-black relative overflow-hidden">
      <NavBar/>
      <Meteors number={20}/>
      <section className="w-full flex justify-center items-center">
        <h1 className="text-white text-7xl text-center">
          Advance your Career <br /> in a Digitized World.
        </h1>
      </section>
    </main>
  );
}