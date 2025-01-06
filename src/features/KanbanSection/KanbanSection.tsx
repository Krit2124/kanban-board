import React, { useRef } from "react";
import { useDrop } from "react-dnd";

import { ButtonAdd, ButtonTrash } from "@/shared/Buttons";
import { TaskCard } from "@/entities/TaskCard";
import { useAppDispatch } from "@/shared/hooks/redux";
import { addTask, deleteTask, updateTask } from "@/shared/store/tasks.slice";
import { Task } from "@/shared/types/task";
import { TaskTypes } from "@/shared/enums";
import { generateId } from "@/shared/lib";

import s from "./index.module.scss";

interface KanbanSectionProps {
  title: string;
  type: string;
  icon: string;
  tasks: any[];
}

const KanbanSection = ({ title, type, icon, tasks }: KanbanSectionProps) => {
  const dispatch = useAppDispatch();

  function addTaskHandler() {
    const newTask: Task = {
      id: generateId(),
      text: "Новая задача",
      type: TaskTypes.ToDo,
      startDay: Date.now(), // Текущая дата
      endDay: Date.now() + 7 * 24 * 60 * 60 * 1000, // Через неделю
    };
    dispatch(addTask(newTask));
  }

  function deleteAllHandler() {
    const confirmDelete = window.confirm(
      "Вы уверены, что хотите удалить все задачи в этой категории?"
    );
  
    if (confirmDelete) {
      const idsToDelete = tasks.map((task) => task.id);
      dispatch(deleteTask(idsToDelete));
    }
  }

  function deleteOneHandler(id: number) {
    dispatch(deleteTask(id));
  }

  // Настраиваем зону сброса
  const [, dropRef] = useDrop(() => ({
    accept: "TASK",
    drop: (task: Task) => {
      // Обновляем тип задачи
      dispatch(updateTask({ ...task, type }));
    },
  }));

  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={(node) => {
        dropRef(node); // Привязка через DnD
        containerRef.current = node; // Привязываем стандартный ref
      }}
      className={s.container}
    >
      <div className={s.title}>
        <div className={s.title_content}>
          <img src={icon} alt="icon" />
          <h2>{title}</h2>
        </div>

        {type === TaskTypes.ToDo && <ButtonAdd onClick={addTaskHandler} />}
        {type === TaskTypes.Done && (
          <ButtonTrash
            onClick={deleteAllHandler}
            onDropTask={deleteOneHandler}
          />
        )}
      </div>

      {tasks.map((task) => {
        return (
          <TaskCard key={task.id} task={task} isEditable={type === TaskTypes.ToDo} />
        );
      })}
    </div>
  );
};

export default KanbanSection;
