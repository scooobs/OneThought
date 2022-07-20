import React, { useState, ChangeEvent } from "react";

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
    useState<string>("text-[#3B3F40]/75");

  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    // https://stackoverflow.com/questions/8666907/cant-get-textareas-scrollheight-when-delete-contents
    e.target.style.height = "auto";
    e.target.style.height = `${e.target.scrollHeight}px`;

    const numChars = e.target.value.length;
    e.target.height = e.target.scrollHeight;
    const percentFull = numChars / maxLength;
    setCount(numChars);

    if (percentFull >= 1) {
      setCountColourChange("text-red-700/75");
    } else if (percentFull >= 0.75) {
      setCountColourChange("text-yellow-600/75");
    } else {
      setCountColourChange("text-[#3B3F40]/75");
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
      <p className="flex flex-row justify-end text-[#3B3F40]/75 text-xs">
        {error ? <span className="text-red-700 mr-4">{error}</span> : null}
        <span className={countColourChange}>{count}</span>/{maxLength}
      </p>
    </div>
  );
}
