//import { useState } from 'react'

import Button from "../components/Button";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation } from "swiper";
import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { formsSteps } from "../mockData/formSteps.json";
import Input from "../components/Input";

export const Forms = () => {
  const [isFirstSlide, setIsFirstSlide] = useState(true);
  const [isLastSlide, setIsLastSlide] = useState(false);

  const sliderRef = useRef() as Record<any, any>;

  const handleNext = () => {
    if (!sliderRef.current) return;
    sliderRef.current.swiper.slideNext();
    window.scrollTo(0, 0);
  };

  const handleIndex = (swiper: SwiperCore) => {
    const { isEnd, isBeginning } = swiper;
    setIsLastSlide(isEnd);
    setIsFirstSlide(isBeginning);
    console.log(swiper);
  };

  return (
    <>
      <div className="h-full relative px-4">
        <form className="">
          <Swiper
            onResize={handleIndex}
            onInit={(core: SwiperCore) => {
              sliderRef.current = core.el;
            }}
            //onTouchStart={handleOnTouchStart}

            modules={[Navigation]}
            onSnapIndexChange={handleIndex}
            onSlideChange={() => {
              setIsLastSlide(sliderRef.current.swiper.isEnd);
              setIsFirstSlide(sliderRef.current.swiper.isBeginning);
            }}
            noSwiping={true}
            onSlideChangeTransitionStart={() => window.scrollTo(0, 0)}
            wrapperTag="ul"
            className="h-full [&>ul]:h-full"
            slidesPerView={1}
            direction="vertical"
            style={{ width: "100%" }}
          >
            {formsSteps.map(({ id, question, options, type }, i) => (
              <SwiperSlide tag="li" key={i} className={clsx("h-fit pb-10")}>
                <div className="mx-auto gap-4 grid grid-cols-1 items-center justify-center max-w-screen-lg ">
                  <h2 className="mt-[90px] text-[24px]  mb-4 font-bold">
                    {question}
                  </h2>
                  {options.map((option, j) => (
                    <Input
                      key={j}
                      id={`${id}-${j}`}
                      value={option}
                      name={id}
                      type={type}
                      onChange={type === "radio" ? handleNext : undefined}
                    />
                  ))}
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </form>
      </div>
      <div className="fixed bottom-0 my-5 flex items-center justify-center z-[1] left-0 right-0">
        <Button
          sprite="arrow-down"
          onClick={!isLastSlide ? handleNext : undefined}
        />
      </div>
    </>
  );
};

export default Forms;
