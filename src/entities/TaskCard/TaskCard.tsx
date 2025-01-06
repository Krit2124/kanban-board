import React, { useRef, useState } from "react";
import { useDrag } from "react-dnd";

import { Task } from "@/shared/types/task";
import { ButtonCancel, ButtonDone, ButtonEdit } from "@/shared/Buttons";
import { useAppDispatch } from "@/shared/hooks/redux";
import { updateTask } from "@/shared/store/tasks.slice";
import { InputTextMini } from "@/shared/InputTextMini";
import { formatStringToTimestamp, formatTimestampToString } from "@/shared/lib";

import s from "./index.module.scss";
import { TaskTypes } from "@/shared/enums";

interface TaskCardProps {
  task: Task;
  isEditable?: boolean;
}

const TaskCard = ({ task, isEditable = false }: TaskCardProps) => {
  const dispatch = useAppDispatch();
  const [isEditing, setIsEditing] = useState(false);
  // Локальное состояние для редактируемой задачи
  const [editableTask, setEditableTask] = useState<Task>({ ...task });

  // Настраиваем возможность перетаскивания
  const [, dragRef] = useDrag(() => ({
    type: "TASK",
    item: { ...editableTask },
    canDrag: () => !isEditing,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }), [isEditing]);

  const cardRef = useRef<HTMLDivElement>(null);

  // Обработчик изменения полей задачи
  const handleInputChange = (field: keyof Task, value: string | number) => {
    setEditableTask((prev) => ({
      ...prev,
      [field]:
        field === "startDay" || field === "endDay" ? formatStringToTimestamp(String(value)) : value,
    }));
  };

  // Сохранение изменений
  const handleSave = () => {
    dispatch(updateTask(editableTask));
    setIsEditing(false);
  };

  // Отмена изменений
  const handleCancel = () => {
    setEditableTask({ ...task });
    setIsEditing(false);
  };

  return (
    <div
      ref={(node) => {
        dragRef(node); // Привязка через DnD
        cardRef.current = node; // Привязываем стандартный ref
      }}
      className={`${s.container}`}
    >
      <div className={s.row}>
        <p>Начало:</p>
        {isEditing ? (
          <InputTextMini
            value={formatTimestampToString(editableTask.startDay)}
            onChange={(e) => handleInputChange("startDay", e.target.value)}
          />
        ) : (
          <p>
            <b>{formatTimestampToString(task.startDay)}</b>
          </p>
        )}
      </div>

      <div className={s.row}>
        <p>Окончание:</p>
        {isEditing ? (
          <InputTextMini
            value={formatTimestampToString(editableTask.endDay)}
            onChange={(e) => handleInputChange("endDay", e.target.value)}
          />
        ) : (
          <p>
            <b
              className={
                new Date(task.endDay) < new Date() && task.type !== TaskTypes.Done
                  ? s.red
                  : ""
              }
            >
              {formatTimestampToString(task.endDay)}
            </b>
          </p>
        )}
      </div>

      <div className={s.row}>
        <p>Описание:</p>
        {isEditing ? (
          <InputTextMini
            value={editableTask.text}
            onChange={(e) => handleInputChange("text", e.target.value)}
          />
        ) : (
          <p>
            <b>{task.text}</b>
          </p>
        )}
      </div>

      {isEditable && (
        <div className={s.edit}>
          {isEditing ? (
            <>
              <ButtonCancel onClick={handleCancel} />
              <ButtonDone onClick={handleSave} />
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
