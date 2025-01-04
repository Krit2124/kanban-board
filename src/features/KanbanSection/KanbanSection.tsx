import React from 'react';

import { ButtonAdd, ButtonTrash } from '@/shared/Buttons';
import { TaskCard } from '@/entities/TaskCard';
import { useAppDispatch } from '@/shared/hooks/redux';

import s from './index.module.scss'
import { deleteTask } from '@/shared/store/tasks.slice';

interface KanbanSectionProps {
  title: string;
  icon: string;
  tasks: any[];
}

const KanbanSection = ({title, icon, tasks}: KanbanSectionProps) => {
  const dispatch = useAppDispatch();

  function deleteAllHandler() {
    const idsToDelete = tasks.map(task => task.id);
    dispatch(deleteTask(idsToDelete))
  }

  return (
    <div className={s.container}>
      <div className={s.title}>
        <div className={s.title_content}>
          <img src={icon} alt="icon" />
          <h2>{title}</h2>
        </div>

        {title === 'To Do' && <ButtonAdd onClick={() => {}} />}
        {title === 'Done' && <ButtonTrash onClick={() => deleteAllHandler()} />}
      </div>

      {tasks.map(task => {
        return (
          <TaskCard key={task.id} task={task} isEditable={title === "To Do" ? true : false} />
        );
      })}
    </div>
  );
};

export default KanbanSection;