import React, { useState, ChangeEvent } from "react";
import {
  ERROR_COLOUR,
  ERROR_COLOUR_DIM,
  NEUTRAL_COLOUR_DIM,
  WARNING_COLOUR_DIM,
} from "~/utils/consts";

type TextAreaProps = {
  name: string;
  maxLength: number;
  data: string | null;
  error: string | null;
  placeholder?: string;
  className?: string;
};
export default function TextArea({
  name,
  placeholder,
  maxLength,
  className,
  data,
  error,
}: TextAreaProps) {
  const [count, setCount] = useState<number>(0);
  const [countColourChange, setCountColourChange] =
    useState<string>(NEUTRAL_COLOUR_DIM);

  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    // https://stackoverflow.com/questions/8666907/cant-get-textareas-scrollheight-when-delete-contents
    e.target.style.height = "auto";
    e.target.style.height = `${e.target.scrollHeight}px`;

    const numChars = e.target.value.length;
    e.target.height = e.target.scrollHeight;
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
    <div className="flex flex-col flex-grow justify-between gap-2">
      <textarea
        onChange={changeHandler}
        name={name}
        placeholder={placeholder}
        maxLength={maxLength}
        className={className}
        defaultValue={data}
      />
      <p className={`flex flex-row justify-end ${NEUTRAL_COLOUR_DIM} text-xs`}>
        {error ? <span className={`${ERROR_COLOUR} mr-4`}>{error}</span> : null}
        <span className={countColourChange}>{count}</span>/{maxLength}
      </p>
    </div>
  );
}
