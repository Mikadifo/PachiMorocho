import { useState } from "react";
import suyukuna from "./assets/suyukuna.webp";
import Navbar from "./layouts/Navbar";
import routes from "./constants/routes";
import About from "./pages/About";
import Works from "./pages/Works";
import Contact from "./pages/Contact";

const { HOME, WORKS, ABOUT, CV, CONTACT } = routes;

export default function App() {
  const [route, setRoute] = useState(HOME);

  return (
    <div className="flex h-screen p-8 max-w-[1440px] w-full mx-auto justify-between gap-20 2xl:gap-40">
      <Navbar route={route} setRoute={setRoute} />

      {route === HOME && (
        <img
          className="w-full h-full overflow-hidden object-contain"
          src={suyukuna}
          alt="Suyukuna"
        />
      )}

      {route === ABOUT && <About />}
      {route === WORKS["2025"] && <Works year={2025} />}
      {route === WORKS["2024"] && <Works year={2024} />}
      {route === CONTACT && <Contact />}
    </div>
  );
}
