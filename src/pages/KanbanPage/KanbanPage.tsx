import React from 'react';

import { KanbanBoard } from '@/widgets/KanbanBoard';
import { InputText } from '@/shared/InputText';

import s from './index.module.scss'

const KanbanPage = () => {
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