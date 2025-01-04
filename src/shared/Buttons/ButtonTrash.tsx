import React from 'react';

import { ButtonProps } from './buttons.types';
import s from './index.module.scss'

const ButtonTrash = ({ onClick }: ButtonProps) => {
  return (
    <button className={`${s.button} ${s.button_blue}`} onClick={onClick}>
      <img src="img/icons/trash.svg" alt="" />
    </button>
  );
};

export default ButtonTrash;