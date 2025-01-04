import React from 'react';

import { ButtonProps } from './buttons.types';
import s from './index.module.scss'

const ButtonEdit = ({ onClick }: ButtonProps) => {
  return (
    <button className={`${s.button} ${s.button_circle} ${s.button_blue}`} onClick={onClick}>
      <img src="img/icons/edit.svg" alt="" />
    </button>
  );
};

export default ButtonEdit;