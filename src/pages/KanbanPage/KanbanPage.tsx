import React, { useEffect } from 'react';

import { KanbanBoard } from '@/widgets/KanbanBoard';
import { InputText } from '@/shared/InputText';
import { useAppDispatch } from '@/shared/hooks/redux';

import s from './index.module.scss'
import { loadTasksFromLS } from '@/shared/store/tasks.slice';

const KanbanPage = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    // Загружаем данные из LS при отрытии страницы
    dispatch(loadTasksFromLS())
  }, []);

  return (
    <main className={s.container}>
      <div className={s.title}>
        <h1>Your tasks</h1>
        <InputText placeholder='поиск...' onChange={() => {}} />
      </div>

      <KanbanBoard />
    </main>
  );
};

export default KanbanPage;