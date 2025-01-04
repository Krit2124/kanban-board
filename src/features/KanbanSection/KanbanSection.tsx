import React from 'react';

import s from './index.module.scss'
import { ButtonAdd, ButtonTrash } from '@/shared/Buttons';
import { TaskCard } from '@/entities/TaskCard';

interface KanbanSectionProps {
  title: string;
  icon: string;
  tasks: any[];
}

const KanbanSection = ({title, icon, tasks}: KanbanSectionProps) => {
  return (
    <div className={s.container}>
      <div className={s.title}>
        <div className={s.title_content}>
          <img src={icon} alt="icon" />
          <h2>{title}</h2>
        </div>

        {title === 'To Do' && <ButtonAdd onClick={() => {}} />}
        {title === 'Done' && <ButtonTrash onClick={() => {}} />}
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