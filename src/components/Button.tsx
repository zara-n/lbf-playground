//import { useState } from 'react'
import arrowDown from "/arrowDown.svg";
import arrowUp from "/arrowUp.svg";
import arrowRight from "/arrowUp.svg";
import clsx from "clsx";

type ButtonType = {
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  sprite?: "arrow-up" | "arrow-down" | "arrow-right";
  children?: React.ReactNode;
  className?: string;
};

export const Button = ({ onClick, sprite, children ,className}: ButtonType) => {
  const imgSrc = () => {
    switch (sprite) {
      case "arrow-up":
        return arrowUp;
      case "arrow-down":
        return arrowDown;
      case "arrow-right":
        return arrowRight;
    }
  };

  return (
    <button
      className={clsx(className,"p-3 flex items-center justify-center text-white rounded-full")}
      onClick={onClick}
    >
      {children ? children : null}
      {sprite ? <img src={imgSrc()} className="h-4 w-4" /> : null}
    </button>
  );
};

export default Button;
