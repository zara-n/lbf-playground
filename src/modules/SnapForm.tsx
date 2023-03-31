import Button from "../components/Button";
import React, { useEffect, useState } from "react";
import clsx from "clsx";
import { formsSteps } from "../mockData/formSteps.json";
import { useInView } from "react-intersection-observer";
import Input from "../components/Input";
import { Listbox, Transition } from '@headlessui/react'

export const Forms = () => {
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
      const element = document.getElementById(`form-step-${activeIndex}`);
      element?.scrollIntoView({ behavior: "smooth" });
      window.scrollTo(0, 0);
    }
  };

  return (
    <>
      <div className="h-full relative px-4">
        <form className="">
          <ul className="h-full w-full scroll-snap-container ">
            {formsSteps.map(({ id, question, options, type }, i) => (
              <li
                key={i}
                className={clsx("scroll-snap pt-[150px]")}
                id={`form-step-${i}`}
                ref={refs[i]}
              >
                <div className="mx-auto gap-4 grid grid-cols-1 items-center justify-center w-full">
                  <h2 className="mt-[20px] text-[24px] pb-4">
                    {question}
                  </h2>
                  {options.map((option, j) => (
                    <React.Fragment key={j}>
                      <Input
                        key={j}
                        id={`${id}-${j}`}
                        value={option}
                        name={id}
                        type={type}
                        onChange={type === "radio" ? handleNext : undefined}
                      />
                    </React.Fragment>
                  ))}
                </div>
              </li>
            ))}
          </ul>
        </form>
      </div>
      <div className="fixed bottom-0 my-5 flex items-center justify-center z-[1] left-0 right-0">
        <Button sprite="arrow-down" onClick={handleNext} />
      </div>
    </>
  );
};

export default Forms;
