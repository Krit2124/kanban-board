import React, { useEffect, useState } from "react";

import { KanbanSection } from "@/features/KanbanSection";
import { Task } from "@/shared/types/task";
import { useAppSelector } from "@/shared/hooks/redux";
import { TaskTypes } from "@/shared/enums";
import { SortTasksByDate, FilterTasksByType } from "@/shared/lib";

import s from "./index.module.scss";

const KanbanBoard = () => {
  const { filteredTasks } = useAppSelector((state) => state.tasks);
  const [toDoTasks, setToDoTasks] = useState([] as Task[]);
  const [inProgressTasks, setInProgressTasks] = useState([] as Task[]);
  const [reviewTasks, setReviewTasks] = useState([] as Task[]);
  const [doneTasks, setDoneTasks] = useState([] as Task[]);

  // Сортировка и распределение по типам задач
  useEffect(() => {
    setToDoTasks(
      SortTasksByDate(FilterTasksByType(filteredTasks, TaskTypes.ToDo))
    );
    setInProgressTasks(
      SortTasksByDate(FilterTasksByType(filteredTasks, TaskTypes.InProgress))
    );
    setReviewTasks(
      SortTasksByDate(FilterTasksByType(filteredTasks, TaskTypes.Review))
    );
    setDoneTasks(
      SortTasksByDate(FilterTasksByType(filteredTasks, TaskTypes.Done))
    );
  }, [filteredTasks]);

  return (
    <section className={s.container}>
      <KanbanSection
        title="To Do"
        type={TaskTypes.ToDo}
        tasks={toDoTasks}
        icon="/img/icons/bxs_happy-alt.svg"
      />
      <KanbanSection
        title="In Progress"
        type={TaskTypes.InProgress}
        tasks={inProgressTasks}
        icon="/img/icons/bxs_smile.svg"
      />
      <KanbanSection
        title="Review"
        type={TaskTypes.Review}
        tasks={reviewTasks}
        icon="/img/icons/bxs_upside-down.svg"
      />
      <KanbanSection
        title="Done"
        type={TaskTypes.Done}
        tasks={doneTasks}
        icon="/img/icons/bxs_ghost.svg"
      />
    </section>
  );
};

export default KanbanBoard;
