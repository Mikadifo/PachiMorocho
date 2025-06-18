import { useState } from "react";
import suyukuna from "./assets/suyukuna.webp";

import Navbar from "./layouts/Navbar";

export default function App() {
  const [current, setCurrent] = useState("home");

  return (
    <div className="flex h-screen p-8 max-w-[1440px] w-full mx-auto justify-between gap-20">
      <Navbar />

      {current === "home" ? (
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
