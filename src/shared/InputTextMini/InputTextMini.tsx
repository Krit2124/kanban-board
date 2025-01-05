import React from "react";

import s from "./index.module.scss";

interface InputTextMiniProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputTextMini = ({ value, onChange }: InputTextMiniProps) => {
  return <input type="text" className={s.input} defaultValue={value} onChange={onChange} />;
};

export default InputTextMini;