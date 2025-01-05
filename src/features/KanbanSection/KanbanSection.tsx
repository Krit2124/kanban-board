import React, { useRef } from "react";
import { useDrop } from "react-dnd";

import { ButtonAdd, ButtonTrash } from "@/shared/Buttons";
import { TaskCard } from "@/entities/TaskCard";
import { useAppDispatch } from "@/shared/hooks/redux";
import { deleteTask, updateTask } from "@/shared/store/tasks.slice";
import { Task } from "@/shared/types/task";

import s from "./index.module.scss";

interface KanbanSectionProps {
  title: string;
  type: string;
  icon: string;
  tasks: any[];
}

const KanbanSection = ({ title, type, icon, tasks }: KanbanSectionProps) => {
  const dispatch = useAppDispatch();

  function deleteAllHandler() {
    const idsToDelete = tasks.map((task) => task.id);
    dispatch(deleteTask(idsToDelete));
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

        {type === "todo" && <ButtonAdd onClick={() => {}} />}
        {type === "done" && (
          <ButtonTrash
            onClick={deleteAllHandler}
            onDropTask={deleteOneHandler}
          />
        )}
      </div>

      {tasks.map((task) => {
        return (
          <TaskCard key={task.id} task={task} isEditable={type === "todo"} />
        );
      })}
    </div>
  );
};

export default KanbanSection;
