import { useEffect, useState } from "react";
import suyukuna from "./assets/suyukuna.webp";
import redRain from "./assets/redRain.gif";
import Navbar from "./layouts/Navbar";
import routes from "./constants/routes";
import About from "./pages/About";
import Works from "./pages/Works";
import Contact from "./pages/Contact";
import Cv from "./pages/Cv";

const { HOME, WORKS, ABOUT, CV, CONTACT } = routes;

export default function App() {
  const [route, setRoute] = useState(HOME);
  const [hideRain, setHideRain] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setHideRain(true), 25000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex flex-col lg:flex-row lg:h-screen p-4 sm:p-8 max-w-[1440px] w-full mx-auto justify-between gap-10 sm:gap-20 2xl:gap-40">
      <Navbar route={route} setRoute={setRoute} />

      {route === HOME ? (
        <>
          <img
            className="w-full h-full overflow-hidden object-contain order-2 -z-20 relative"
            src={suyukuna}
            alt="Suyukuna"
          />
          <img
            src={redRain}
            alt="Red Rain GIF"
            className={`-z-10 fixed inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-out ${hideRain ? "opacity-0" : "opacity-85"}`}
          />
        </>
      ) : (
        <div className="order-2 w-full h-full">
          {route === ABOUT && <About />}
          {route === WORKS["2025"] && <Works year={2025} />}
          {route === WORKS["2024"] && <Works year={2024} />}
          {route === CV && <Cv />}
          {route === CONTACT && <Contact />}
        </div>
      )}
    </div>
  );
}
