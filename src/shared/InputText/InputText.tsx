import React from 'react';

import s from './index.module.scss'

interface InputTextProps {
  placeholder?: string;
  onChange: (value: string) => void;
}

const InputText = ({placeholder, onChange}: InputTextProps) => {
  return (
    <input type="text" className={s.input} placeholder={placeholder} onChange={() => onChange('')} />
  );
};

export default InputText;