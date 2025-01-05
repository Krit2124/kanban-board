import React, { useEffect, useState } from "react";

import { KanbanBoard } from "@/widgets/KanbanBoard";
import { InputText } from "@/shared/InputText";
import { useAppDispatch, useAppSelector } from "@/shared/hooks/redux";
import { formatTimestampToString } from "@/shared/lib";
import { loadTasksFromLS } from "@/shared/store/tasks.slice";

import s from "./index.module.scss";

const KanbanPage = () => {
  const dispatch = useAppDispatch();
  const tasks = useAppSelector((state) => state.tasks.tasks); // Получаем все задачи из хранилища
  const [searchValue, setSearchValue] = useState(""); // Состояние строки поиска
  const [filteredTasks, setFilteredTasks] = useState(tasks); // Отфильтрованные задачи

  useEffect(() => {
    // Загружаем данные из LocalStorage при открытии страницы
    dispatch(loadTasksFromLS());
  }, [dispatch]);

  useEffect(() => {
    // Фильтрация задач при изменении строки поиска
    const lowerSearchValue = searchValue.toLowerCase();

    // Проверка на формат даты dd.mm.yyyy
    const isDate =
      /^\d{2}\.\d{2}\.\d{4}$/.test(lowerSearchValue) &&
      !isNaN(
        new Date(lowerSearchValue.split(".").reverse().join("-")).getTime()
      );

    const filtered = tasks.filter((task) => {
      if (isDate) {
        const formattedStartDate = formatTimestampToString(task.startDay);
        const formattedEndDate = formatTimestampToString(task.endDay);
        return (
          formattedStartDate === lowerSearchValue ||
          formattedEndDate === lowerSearchValue
        );
      }

      // Фильтрация по описанию
      return task.text.toLowerCase().includes(lowerSearchValue);
    });

    setFilteredTasks(filtered);
  }, [searchValue, tasks]);

  const handleSearchChange = (value: string) => {
    setSearchValue(value);
  };

  return (
    <main className={s.container}>
      <div className={s.title}>
        <h1>Your tasks</h1>
        <InputText placeholder="поиск..." onChange={handleSearchChange} />
      </div>

      {/* Передаём отфильтрованные задачи в KanbanBoard */}
      <KanbanBoard tasks={filteredTasks} />
    </main>
  );
};

export default KanbanPage;
