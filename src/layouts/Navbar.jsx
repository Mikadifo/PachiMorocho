import Link from "../components/link";

export default function Navbar() {
  return (
    <div className="flex flex-col text-dark">
      <h1 className="font-bold font-heading text-[28px] whitespace-nowrap pb-8">
        Patricio Pachi Morocho
      </h1>

      <div className="flex flex-col justify-between h-full">
        <ul className="flex flex-col gap-4">
          <li>
            <Link label={"Works"} />
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
