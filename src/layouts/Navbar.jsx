import { useState } from "react";
import Link from "../components/link";
import routes from "../constants/routes";

const { WORKS } = routes;

export default function Navbar({ route, setRoute }) {
  const [showWorks, setShowWorks] = useState(false);

  const handleWorks = () => {
    setShowWorks(true);
  };

  return (
    <div className="flex flex-col text-dark">
      <h1 className="font-bold font-heading text-[28px] whitespace-nowrap pb-8">
        Patricio Pachi Morocho
      </h1>

      <div className="flex flex-col justify-between h-full">
        <ul className="flex flex-col gap-4">
          <li>
            <Link label={"Works"} onClick={handleWorks} />
            {showWorks ? (
              <ul className="text-base font-heading flex flex-col gap-2 ms-4 mt-2">
                <li>
                  <button
                    className={`${route === WORKS["2025"] ? "text-main font-bold" : "text-dark hover:opacity-80 cursor-pointer"}`}
                    onClick={() => setRoute(WORKS["2025"])}
                  >
                    2025 - 2026
                  </button>
                </li>
                <li>
                  <button
                    className={`${route === WORKS["2024"] ? "text-main font-bold" : "text-dark hover:opacity-80 cursor-pointer"}`}
                    onClick={() => setRoute(WORKS["2024"])}
                  >
                    2024 - 2025
                  </button>
                </li>
              </ul>
            ) : (
              ""
            )}
          </li>
          <li>
            <Link label={"Writings"} />
          </li>
        </ul>

        <ul className="flex justify-between w-full">
          <li>
            <Link label={"About"} />
          </li>
          <li>
            <Link label={"CV"} />
          </li>
          <li>
            <Link label={"Contact"} />
          </li>
        </ul>
      </div>
    </div>
  );
}
