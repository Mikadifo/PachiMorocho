import instagramIcon from "./../assets/instagramIcon.svg";

export default function About() {
  return (
    <div className="p-16 flex flex-col items-center gap-16 text-dark justify-center w-full">
      <h1 className="font-bold font-heading text-[28px]">About</h1>

      <p className="text-xl font-body font-normal leading-8">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
        occaecat cupidatat non proident, sunt in culpa qui officia deserunt
        mollit anim id est laborum.
      </p>

      <img
        className="size-80 object-cover"
        src="https://images.unsplash.com/flagged/photo-1570612861542-284f4c12e75f?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="Patricio Pachi Morocho portrait"
      />

      <a
        href="https://www.instagram.com/muruchuku/"
        target="_blank"
        rel="noreferrer"
        className="cursorpointer size-8 align-middle hover:opacity-80"
      >
        <img src={instagramIcon} alt="instagram icon" />
      </a>
    </div>
  );
}
