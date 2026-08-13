import { useEffect, useState } from "react";
import suyukuna from "./assets/suyukuna.webp";
import redRain from "./assets/redRain.gif";
import Navbar from "./layouts/Navbar";
import routes from "./constants/routes";
import About from "./pages/About";
import Works from "./pages/Works";
import Contact from "./pages/Contact";
import Cv from "./pages/Cv";
import StormRain from "./components/StormRain";

const { HOME, WORKS, ABOUT, CV, CONTACT } = routes;

export default function App() {
  const [route, setRoute] = useState(HOME);
  const [introState, setIntroState] = useState("dark");

  const handleReveal = () => {
    setIntroState("transparent");
    setTimeout(() => {
      setIntroState("fading");
      setTimeout(() => {
        setIntroState("done");
      }, 500);
    }, 3000);
  };

  return (
    <>
      {introState !== "done" && (
        <div
          className={`fixed inset-0 z-50 transition-all duration-500 ${introState === "dark" ? "pointer-events-auto" : "pointer-events-none"} ${introState === "dark" ? "bg-[#241f1c]" : "bg-transparent"} ${introState === "fading" ? "opacity-0" : "opacity-100"}`}
        >
          <StormRain onReveal={handleReveal} />
        </div>
      )}
      <div className="flex flex-col lg:flex-row md:h-screen p-4 sm:p-8 max-w-[1440px] w-full mx-auto justify-between gap-10 sm:gap-20 2xl:gap-40">
        <Navbar route={route} setRoute={setRoute} />

        {route === HOME ? (
          <>
            <img
              className="w-full h-full overflow-hidden object-contain order-2 -z-20 relative"
              src={suyukuna}
              alt="Suyukuna"
            />
          </>
        ) : (
          <div className="order-2 w-full h-full">
            {route === ABOUT && <About />}
            {route === WORKS["2026-2027"] && <Works yearGroup="2026-2027" />}
            {route === WORKS["2024-2025"] && <Works yearGroup="2024-2025" />}
            {route === CV && <Cv />}
            {route === CONTACT && <Contact />}
          </div>
        )}
      </div>
    </>
  );
}
