import React from "react";

import s from "./index.module.scss";

interface InputTextProps {
  placeholder?: string;
  onChange: (value: string) => void;
}

const InputText = ({ placeholder, onChange }: InputTextProps) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  return (
    <input
      type="text"
      className={s.input}
      placeholder={placeholder}
      onChange={handleChange}
    />
  );
};

export default InputText;
