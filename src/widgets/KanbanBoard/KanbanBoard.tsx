import React, { useEffect, useState } from 'react';

import { KanbanSection } from '@/features/KanbanSection';
import { Task } from '@/shared/types/task';

import s from './index.module.scss'

function SortByDate(a: Task, b: Task) {
  return a.startDay - b.startDay;
}

interface KanbanBoardProps {
  tasks: Task[];
}

const KanbanBoard = ({ tasks }: KanbanBoardProps) => {
  const [toDoTasks, setToDoTasks] = useState([] as Task[]);
  const [inProgressTasks, setInProgressTasks] = useState([] as Task[]);
  const [reviewTasks, setReviewTasks] = useState([] as Task[]);
  const [doneTasks, setDoneTasks] = useState([] as Task[]);

  useEffect(() => {
    setToDoTasks(tasks.filter(task => task.type === 'todo').sort((a,b) => SortByDate(a,b)));
    setInProgressTasks(tasks.filter(task => task.type === 'in_progress').sort((a,b) => SortByDate(a,b)));
    setReviewTasks(tasks.filter(task => task.type === 'review').sort((a,b) => SortByDate(a,b)));
    setDoneTasks(tasks.filter(task => task.type === 'done').sort((a,b) => SortByDate(a,b)));
  }, [tasks])

  return (
    <section className={s.container}>
      <KanbanSection title='To Do' type="todo" tasks={toDoTasks} icon='/img/icons/bxs_happy-alt.svg'/>
      <KanbanSection title='In Progress' type='in_progress' tasks={inProgressTasks} icon='/img/icons/bxs_smile.svg' />
      <KanbanSection title='Review' type="review" tasks={reviewTasks} icon='/img/icons/bxs_upside-down.svg' />
      <KanbanSection title='Done' type='done' tasks={doneTasks} icon='/img/icons/bxs_ghost.svg' />
    </section>
  );
};

export default KanbanBoard;