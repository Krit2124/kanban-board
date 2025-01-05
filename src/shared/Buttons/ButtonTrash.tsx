import React, { useRef } from "react";
import { useDrop } from "react-dnd";

import { ButtonProps } from "./buttons.types";
import s from "./index.module.scss";

const ButtonTrash = ({ onClick, onDropTask }: ButtonProps) => {
  const [{ isOver }, dropRef] = useDrop(() => ({
    accept: "TASK",
    drop: (item: { id: number }) => {
      if (onDropTask) onDropTask(item.id);
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  const buttonRef = useRef<HTMLButtonElement>(null);

  return (
    <button
      ref={(node) => {
        dropRef(node); // Привязка через DnD
        buttonRef.current = node; // Привязываем стандартный ref
      }}
      className={`${s.button} ${s.button_blue} ${isOver ? s.hover : ""}`}
      onClick={onClick}
    >
      <img src="img/icons/trash.svg" alt="icon" />
    </button>
  );
};

export default ButtonTrash;
