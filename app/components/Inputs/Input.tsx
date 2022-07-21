import React, { useState, ChangeEvent } from "react";
import {
  ERROR_COLOUR,
  ERROR_COLOUR_DIM,
  NEUTRAL_COLOUR_DIM,
  WARNING_COLOUR_DIM,
} from "~/utils/consts";

type InputProps = {
  name: string;
  maxLength: number;
  data: string | null;
  error: string | null;
  type?: string;
  placeholder?: string;
  className?: string;
};

export default function Input({
  name,
  type = "text",
  placeholder,
  data,
  error,
  maxLength,
  className,
}: InputProps) {
  const [count, setCount] = useState<number>(0);
  const [countColourChange, setCountColourChange] =
    useState<string>(NEUTRAL_COLOUR_DIM);

  const keyHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const numChars = e.target.value.length;
    const percentFull = numChars / maxLength;
    setCount(numChars);

    if (percentFull >= 1) {
      setCountColourChange(ERROR_COLOUR_DIM);
    } else if (percentFull >= 0.75) {
      setCountColourChange(WARNING_COLOUR_DIM);
    } else {
      setCountColourChange(NEUTRAL_COLOUR_DIM);
    }
  };

  return (
    <div className="flex flex-row">
      <input
        onChange={keyHandler}
        name={name}
        type={type}
        placeholder={placeholder}
        defaultValue={data}
        maxLength={maxLength}
        className={className}
      />
      <p
        className={`flex flex-row ${NEUTRAL_COLOUR_DIM} text-xs whitespace-nowrap`}
      >
        <span className={`${ERROR_COLOUR} mr-4`}>{error}</span>
        <span className={countColourChange}>{count}</span>/{maxLength}
      </p>
    </div>
  );
}
