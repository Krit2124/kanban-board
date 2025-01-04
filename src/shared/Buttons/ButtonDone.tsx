import React from 'react';

import { ButtonProps } from './buttons.types';
import s from './index.module.scss'

const ButtonDone = ({ onClick }: ButtonProps) => {
  return (
    <button className={`${s.button} ${s.button_circle}`} onClick={() => onClick()}>
      <img src="img/icons/check.svg" alt="icon" />
    </button>
  );
};

export default ButtonDone;