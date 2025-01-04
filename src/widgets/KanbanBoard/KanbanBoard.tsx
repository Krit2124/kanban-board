import React, { useEffect, useState } from 'react';

import { KanbanSection } from '@/features/KanbanSection';
import { Task } from '@/shared/types/task';

import s from './index.module.scss'

const data: Task[] = [
  {
    "id": 1,
    "type": "done",
    "startDay": 1700000000000,
    "endDay": 1703740800000,
    "text": "Завершить рефакторинг старого кода."
  },
  {
    "id": 2,
    "type": "todo",
    "startDay": 1767206400000,
    "endDay": 1767292800000,
    "text": "Разработать план по внедрению новой функциональности."
  },
  {
    "id": 3,
    "type": "in_progress",
    "startDay": 1767292800000,
    "endDay": 1767379200000,
    "text": "Написать документацию для команды разработчиков."
  },
  {
    "id": 4,
    "type": "review",
    "startDay": 1767379200000,
    "endDay": 1767465600000,
    "text": "Провести код-ревью нового модуля."
  },
  {
    "id": 5,
    "type": "done",
    "startDay": 1767465600000,
    "endDay": 1767552000000,
    "text": "Тестирование системы после обновления."
  },
  {
    "id": 6,
    "type": "todo",
    "startDay": 1767552000000,
    "endDay": 1767638400000,
    "text": "Подготовить презентацию для клиента."
  },
  {
    "id": 7,
    "type": "in_progress",
    "startDay": 1767638400000,
    "endDay": 1767724800000,
    "text": "Оптимизировать алгоритмы обработки данных."
  },
  {
    "id": 8,
    "type": "review",
    "startDay": 1767724800000,
    "endDay": 1767811200000,
    "text": "Проверить результаты нагрузочного тестирования."
  },
  {
    "id": 9,
    "type": "todo",
    "startDay": 1767811200000,
    "endDay": 1767897600000,
    "text": "Составить отчет по итогам проекта."
  },
  {
    "id": 10,
    "type": "done",
    "startDay": 1767897600000,
    "endDay": 1767984000000,
    "text": "Внедрить исправления по результатам тестирования."
  },
  {
    "id": 11,
    "type": "todo",
    "startDay": 1700000000000,
    "endDay": 1700500000000,
    "text": "Обновить базу знаний компании до конца года."
  },
  {
    "id": 12,
    "type": "in_progress",
    "startDay": 1768070400000,
    "endDay": 1768156800000,
    "text": "Разработать прототип нового интерфейса."
  },
  {
    "id": 13,
    "type": "review",
    "startDay": 1768156800000,
    "endDay": 1768243200000,
    "text": "Анализировать метрики производительности."
  },
  {
    "id": 14,
    "type": "done",
    "startDay": 1768243200000,
    "endDay": 1768329600000,
    "text": "Закрыть задачи по техническому долгу."
  },
  {
    "id": 15,
    "type": "todo",
    "startDay": 1768329600000,
    "endDay": 1768416000000,
    "text": "Организовать тренинг для сотрудников."
  },
  {
    "id": 16,
    "type": "review",
    "startDay": 1690000000000,
    "endDay": 1690500000000,
    "text": "Провести проверку безопасности системы."
  },
  {
    "id": 17,
    "type": "done",
    "startDay": 1692000000000,
    "endDay": 1693000000000,
    "text": "Закрыть критические баги в системе."
  }
]

const KanbanBoard = () => {
  const [toDoTasks, setToDoTasks] = useState([] as Task[]);
  const [inProgressTasks, setInProgressTasks] = useState([] as Task[]);
  const [reviewTasks, setReviewTasks] = useState([] as Task[]);
  const [doneTasks, setDoneTasks] = useState([] as Task[]);

  useEffect(() => {
    setToDoTasks(data.filter(task => task.type === 'todo'));
    setInProgressTasks(data.filter(task => task.type === 'in_progress'));
    setReviewTasks(data.filter(task => task.type === 'review'));
    setDoneTasks(data.filter(task => task.type === 'done'));
  }, [])

  return (
    <section className={s.container}>
      <KanbanSection title='To Do' tasks={toDoTasks} icon='/img/icons/bxs_happy-alt.svg'/>
      <KanbanSection title='In Progress' tasks={inProgressTasks} icon='/img/icons/bxs_smile.svg' />
      <KanbanSection title='Review' tasks={reviewTasks} icon='/img/icons/bxs_upside-down.svg' />
      <KanbanSection title='Done' tasks={doneTasks} icon='/img/icons/bxs_ghost.svg' />
    </section>
  );
};

export default KanbanBoard;