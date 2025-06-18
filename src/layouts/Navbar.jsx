import Link from "../components/link";
import "./Navbar.css";

export default function Navbar() {
  return (
    <div className="navbar">
      <h1 className="logo">Patricio Pachi Morocho</h1>

      <ul className="nav-work">
        <li>
          <Link label={"Works"} />
        </li>
        <li>
          <Link label={"Writings"} />
        </li>
      </ul>

      <ul className="nav-personal">
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
  );
}
