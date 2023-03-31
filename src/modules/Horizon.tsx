//import { useState } from 'react'

import Button from "../components/Button";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation } from "swiper";
import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import Input from "../components/Input";
import { formsSteps } from "../mockData/formSteps.json";

export const Horizon = () => {
  const [isFirstSlide, setIsFirstSlide] = useState(true);
  const [isLastSlide, setIsLastSlide] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [startScroll, setStartScroll] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchCurrent, setTouchCurrent] = useState(0);

  const sliderRef = useRef() as Record<any, any>;

  const handleNext = () => {
    if (!sliderRef.current) return;
    sliderRef.current.swiper.slideNext();
    window.scrollTo(0, 0);
  };

  const handleIndex = (swiper: SwiperCore) => {
    const { isEnd, isBeginning, activeIndex } = swiper;
    setIsLastSlide(isEnd);
    setIsFirstSlide(isBeginning);
    setActiveIndex(activeIndex);
  };

  const onSlideChangeStart = (swiper: SwiperCore) => {
    let activeSlide = swiper.slides[swiper.activeIndex]

    let slideHeight = activeSlide.offsetHeight;
    console.log('slideheight' + slideHeight)
    const swiperWrapper = Array.from(document.getElementsByClassName('swiper-wrapper') as HTMLCollectionOf<HTMLElement>)
    swiperWrapper[0].style.height = `${slideHeight}px`;
    console.log(swiperWrapper[0].offsetHeight)
  };

  return (
    <div className="form relative mx-auto w-screen">
      <form className="form">
        <Swiper
          onResize={handleIndex}
          onInit={(core: SwiperCore) => {
            sliderRef.current = core.el;
          }}
          spaceBetween={50}
          //onTouchStart={handleOnTouchStart}

          modules={[Navigation]}
          onSnapIndexChange={handleIndex}
          onSlideChange={() => {
            setIsLastSlide(sliderRef.current.swiper.isEnd);
            setIsFirstSlide(sliderRef.current.swiper.isBeginning);
          }}
          onSlideChangeTransitionStart={onSlideChangeStart}
          noSwiping={true}
          wrapperTag="ul"
          className="h-screen [&>ul]:h-screen overflow-auto w-full"
          slidesPerView={1}
        >
          {formsSteps.map(({ id, question, options, type }, i) => (
            <SwiperSlide
              tag="li"
              key={i}
              className={clsx("pt-[150px] h-fit pb-10")}
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
            </SwiperSlide>
          ))}
        </Swiper>
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
