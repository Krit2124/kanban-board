import React from 'react';

import { ButtonProps } from './buttons.types';
import s from './index.module.scss'

const ButtonAdd = ({ onClick }: ButtonProps) => {
  return (
    <button className={`${s.button} ${s.button_blue}`} onClick={onClick}>
      <p>+ Добавить</p>
    </button>
  );
};

export default ButtonAdd;