//import { useState } from 'react'

import Button from "../components/Button";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation } from "swiper";
import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import Input from "../components/Input";
import { formsSteps } from "../mockData/formSteps.json";
import { useInView } from "react-intersection-observer";

export const Horizon = () => {
  const [isLastSlide, setIsLastSlide] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const [ref0, inView0] = useInView({});
  const [ref1, inView1] = useInView({});
  const [ref2, inView2] = useInView({});
  const [ref3, inView3] = useInView({});

  const refs = [ref0, ref1, ref2, ref3];

  useEffect(() => {
    if (inView0) setActiveIndex(0);
    if (inView1) setActiveIndex(1);
    if (inView2) setActiveIndex(2);
    if (inView3) setActiveIndex(3);
  }, [inView0, inView1, inView2, inView3]);


  const handleNext = () => {
    if (activeIndex < formsSteps.length) {
      console.log("run");
      const element = document.getElementById(`form-step-${activeIndex+1}`);
      element?.scrollIntoView({ behavior: "smooth" });
      window.scrollTo(0, 0);
    }
  };

  return (
    <div className="relative mx-auto w-screen">
      <form className="form">
        <ul className="snap-container gap-10">
          {formsSteps.map(({ id, question, options, type }, i) => (
            <li
              key={i}
              className={clsx("scroll-snap-x pt-[180px] pb-10")}
              ref={refs[i]}
              id={`form-step-${i}`}
            >
              <h2 className="text-[24px] mb-10 px-4">{question}</h2>
              <div className="flex flex-col gap-2 items-center justify-center px-4">
                {options.map((option, j) => (
                  <Input
                    key={j}
                    id={`${id}-${j}`}
                    value={option}
                    name={id}
                    type={type}
                    onChange={type === 'radio' ? handleNext : undefined}
                  />
                ))}
              </div>
            </li>
          ))}
        </ul>
      </form>

      <Button
        sprite="arrow-down"
        className="fixed top-[15%] right-[20px] z-[1] -rotate-90"
        onClick={!isLastSlide ? handleNext : undefined}
      />
    </div>
  );
};

export default Horizon;
