import React, { useState, ChangeEvent } from "react";

interface InputProps {
  name: string;
  maxLength: number;
  data: string | null;
  error: string | null;
  type?: string;
  placeholder?: string;
  className?: string;
}

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
    useState<string>("text-[#3B3F40]/75");

  const keyHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const numChars = e.target.value.length;
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
      <p className="flex flex-row text-[#3B3F40]/75 text-xs whitespace-nowrap">
        <span className="text-red-700 mr-4">{error}</span>
        <span className={countColourChange}>{count}</span>/{maxLength}
      </p>
    </div>
  );
}
