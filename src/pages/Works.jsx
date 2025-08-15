import arrowIcon from "./../assets/arrowIcon.png";
import { useRef, useState } from "react";
import worksList from "../data/works";

export default function Works({ year }) {
  const works = worksList.filter((work) => work.year === year);
  const containerRef = useRef(null);
  const [current, setCurrent] = useState(0);

  const scrollToIndex = (index) => {
    if (!containerRef.current) return;
    const slides = containerRef.current.children;
    if (index < 0 || index >= slides.length) return;

    slides[index].scrollIntoView({ behavior: "smooth", block: "start" });
    setCurrent(index);
  };

  const next = () => {
    scrollToIndex((current + 1) % works.length);
  };

  const previous = () => {
    scrollToIndex((current - 1 + works.length) % works.length);
  };

  const onScroll = () => {
    if (!containerRef.current) return;
    const scrollTop = containerRef.current.scrollTop;
    const height = containerRef.current.clientHeight;
    const index = Math.round(scrollTop / height);
    if (index !== current) {
      setCurrent(index);
    }
  };

  const desktopLayout = (
    <>
      <div className="xl:flex flex-col gap-8 justify-center hidden">
        <h1 className="font-bold font-heading text-2xl">
          {works[current].title}
        </h1>

        <div className="max-w-[400px]">
          <h2 className="mb-2 font-bold font-heading text-base">Materials</h2>
          <p className="font-normal text-sm opacity-80 leading-5">
            {works[current].materials}
          </p>
        </div>
      </div>

      <div className="xl:flex flex-col justify-between my-[14px] order-last xl:order-first hidden">
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
          <img src={arrowIcon} alt="Down Arrow Icon" />
        </button>
      </div>
    </>
  );

  return (
    <div className="flex gap-4 xl:gap-8 text-dark flex-col xl:flex-row h-[800px] lg:h-full">
      <div
        ref={containerRef}
        onScroll={onScroll}
        className="h-full overflow-y-scroll snap-y snap-mandatory scroll-smooth touch-pan-y scrollbar-none"
      >
        {works.map(({ img, title }, index) => (
          <div key={index} className="h-full w-full snap-center">
            <a href={img} target="_blank">
              <img
                className="h-full w-full object-contain"
                src={img}
                alt={title}
              />
            </a>
          </div>
        ))}
      </div>

      {desktopLayout}

      <div className="flex xl:hidden gap-16 justify-between">
        <div className="flex flex-col gap-4 justify-center">
          <h1 className="font-bold font-heading text-2xl">
            {works[current].title}
          </h1>

          <div className="w-full">
            <h2 className="mb-2 font-bold font-heading text-base">Materials</h2>
            <p className="font-normal text-sm opacity-80 leading-5">
              {works[current].materials}
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-8 my-[14px]">
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
            <img src={arrowIcon} alt="Down Arrow Icon" />
          </button>
        </div>
      </div>
    </div>
  );
}
