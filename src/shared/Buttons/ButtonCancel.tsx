import React from 'react';

import { ButtonProps } from './buttons.types';
import s from './index.module.scss'

const ButtonCancel = ({ onClick }: ButtonProps) => {
  return (
    <button className={`${s.button} ${s.button_circle}`} onClick={onClick}>
      <img src="img/icons/cross.svg" alt="" />
    </button>
  );
};

export default ButtonCancel;