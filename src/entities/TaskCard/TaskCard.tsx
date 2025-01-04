import React, { useState } from "react";

import { Task } from "@/shared/types/task";

import s from "./index.module.scss";
import { ButtonCancel, ButtonDone, ButtonEdit } from "@/shared/Buttons";

interface TaskCardProps {
  task: Task;
  isEditable?: boolean;
}

// Вспомогательная функция для преобразования timestamp в дату DD.MM.YYYY
const formatDate = (timestamp: number): string => {
  const date = new Date(timestamp);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Месяцы начинаются с 0
  const year = date.getFullYear();

  return `${day}.${month}.${year}`;
};

const TaskCard = ({ task, isEditable = false }: TaskCardProps) => {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className={s.container}>
      <div className={s.row}>
        <p>Начало:</p>
        <p>
          <b>{formatDate(task.startDay)}</b>
        </p>
      </div>

      <div className={s.row}>
        <p>Окончание:</p>
        <p>
          {/* Обводка красным просроченных задач */}
          <b
            className={
              new Date(task.endDay) < new Date() && task.type !== "done"
                ? s.red
                : ""
            }
          >
            {formatDate(task.endDay)}
          </b>
        </p>
      </div>

      <div className={s.row}>
        <p>Описание:</p>
        <p>
          <b>{task.text}</b>
        </p>
      </div>

      {isEditable && (
        <div className={s.edit}>
          {isEditing ? (
            <>
              <ButtonCancel onClick={() => setIsEditing(false)} />
              <ButtonDone onClick={() => setIsEditing(false)} />
            </>
          ) : (
            <ButtonEdit onClick={() => setIsEditing(true)} />
          )}
        </div>
      )}
    </div>
  );
};

export default TaskCard;
