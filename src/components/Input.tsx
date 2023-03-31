//import { useState } from 'react'
import clsx from "clsx";

type InputType = {
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  type: "radio" | "checkbox" | "text" | "number" | string;
  id: string;
  value: string;
  name: string;
};

export const Input = ({ onChange, type, id, value, name }: InputType) => {
  return (
    <>
      <input type={type} id={id} name={name} value={name} onChange={onChange} />
      <label htmlFor={id}>{value}</label>
    </>
  );
};

export default Input;
