import { useState } from "react";
import suyukuna from "./assets/suyukuna.webp";
import Navbar from "./layouts/Navbar";
import routes from "./constants/routes";

const { HOME } = routes;

export default function App() {
  const [route, setRoute] = useState(HOME);

  return (
    <div className="flex h-screen p-8 max-w-[1440px] w-full mx-auto justify-between gap-20">
      <Navbar route={route} setRoute={setRoute} />

      {route === HOME ? (
        <img
          className="w-full h-full overflow-hidden object-contain"
          src={suyukuna}
          alt="Suyukuna"
        />
      ) : (
        ""
      )}
    </div>
  );
}
