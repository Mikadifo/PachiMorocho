import arrowIcon from "./../assets/arrowIcon.png";
import { useState } from "react";
import worksList from "../data/works";

export default function Works({ year }) {
  const works = worksList.filter((work) => work.year === year);
  const [current, setCurrent] = useState(0);

  const next = () => {
    setCurrent((prev) => (prev + 1) % works.length);
  };

  const previous = () => {
    setCurrent((prev) => (prev - 1 + works.length) % works.length);
  };

  return (
    <div className="flex gap-8 text-dark relative overflow-hidden">
      <div className="flex flex-col justify-between my-8">
        <button
          className="cursor-pointer hover:opacity-80 size-6"
          onClick={previous}
        >
          <img src={arrowIcon} alt="Up Arrow Icon" />
        </button>
        <button
          className="cursor-pointer hover:opacity-80 rotate-180 size-6"
          onClick={next}
        >
          <img src={arrowIcon} alt="Up Arrow Icon" />
        </button>
      </div>

      <div
        className="transition-transform duration-500 ease-in-out h-full"
        style={{ transform: `translateY(-${current * 100}%)` }}
      >
        {works.map(({ id, img, title }) => (
          <div key={id} className="h-full">
            <img className="h-full w-full object-cover" src={img} alt={title} />
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-8 justify-center">
        <h1 className="font-bold font-heading text-2xl">
          {works[current].title}
        </h1>

        <div className="max-w-[240px]">
          <h2 className="mb-2 font-bold font-heading text-base">Materials</h2>
          <p className="font-normal text-sm opacity-80 leading-5">
            {works[current].materials}
          </p>
        </div>
      </div>
    </div>
  );
}
