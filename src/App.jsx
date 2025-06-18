import { useState } from "react";
import "./App.css";
import suyukuna from "./assets/suyukuna.webp";

import Navbar from "./layouts/Navbar";

export default function App() {
  const [current, setCurrent] = useState("home");

  return (
    <div className="app-container">
      <Navbar />

      {current === "home" ? <img src={suyukuna} alt="Suyukuna" /> : ""}
    </div>
  );
}
