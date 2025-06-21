import { useState } from "react";
import Link from "../components/link";
import routes from "../constants/routes";
import useIsDesktop from "../hooks/isDesktop";

const { HOME, WORKS, ABOUT, CV, CONTACT } = routes;

export default function Navbar({ route, setRoute }) {
  const [showWorks, setShowWorks] = useState(false);
  const isDesktop = useIsDesktop();

  const handleWorks = () => {
    setShowWorks(!showWorks);
  };

  const navbarContent = (
    <>
      <ul className="flex flex-row lg:flex-col gap-16 lg:gap-4 order-2 lg:order-none justify-center">
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

      <ul className="flex justify-center lg:justify-between w-full order-last lg:order-none gap-8">
        <li>
          <Link
            styles={route === ABOUT ? "text-main" : ""}
            label={"About"}
            onClick={() => setRoute(ABOUT)}
          />
        </li>
        <li>
          <Link
            styles={route === CV ? "text-main" : ""}
            label={"CV"}
            onClick={() => setRoute(CV)}
          />
        </li>
        <li>
          <Link
            styles={route === CONTACT ? "text-main" : ""}
            label={"Contact"}
            onClick={() => setRoute(CONTACT)}
          />
        </li>
      </ul>
    </>
  );

  if (isDesktop) {
    return (
      <div className="flex flex-col text-dark">
        <h1
          className="font-bold font-heading text-[28px] whitespace-nowrap pb-8 cursor-pointer"
          onClick={() => setRoute(HOME)}
        >
          Patricio Pachi Morocho
        </h1>

        <div className="flex flex-col justify-between h-full">
          {navbarContent}
        </div>
      </div>
    );
  } else {
    return (
      <>
        <h1
          className="font-bold font-heading text-[28px] whitespace-nowrap pb-8 cursor-pointer order-1 text-center"
          onClick={() => setRoute(HOME)}
        >
          Patricio Pachi Morocho
        </h1>
        {navbarContent}
      </>
    );
  }
}
