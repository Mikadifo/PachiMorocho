import instagramIcon from "./../assets/instagramIcon.svg";
import about from "./../assets/about.jpeg";

export default function About() {
  return (
    <div className="lg:p-16 flex flex-col items-center gap-4 sm:gap-8 lg:gap-16 text-dark justify-center w-full">
      <img
        className="size-80 object-contain"
        src={about}
        alt="Patricio Pachi Morocho portrait"
      />

      <p className="text-base sm:text-xl font-body font-normal leading-6 sm:leading-8">
        "Patricio Pachi Morocho (b. 1998) is an artist currently working in the
        Bronx. He received his BFA from the Rhode Island School of Design in
        2021 and his MFA from Rutgers University in 2025. He was the 2022 - 2023
        Artist in Residence for The Latinx Project. His work has been exhibited
        in solo exhibitions at Micki Meng Gallery, San Francisco in 2022; and at
        The Latinx Project, New York in 2023. Pachi has recently been awarded
        the 2025 Zona Maco x Fountainhead Residency Prize. His work focuses on
        the animistic materiality of the urban landscape through the articles of
        painting, paper-making, mold-making, incense, plaster, and writing. He
        seeks the convergences of the profane and sacred in a contemporary age
        marked by migration, fluidity, and struggle, including that of his
        family from the Kañari homelands of southern Ecuador."
      </p>

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
