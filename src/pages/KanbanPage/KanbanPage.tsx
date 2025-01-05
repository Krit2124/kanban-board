import React, { useEffect, useState } from "react";

import { KanbanBoard } from "@/widgets/KanbanBoard";
import { InputText } from "@/shared/InputText";
import { useAppDispatch, useAppSelector } from "@/shared/hooks/redux";
import { filterTasks, loadTasksFromLS } from "@/shared/store/tasks.slice";

import s from "./index.module.scss";

const KanbanPage = () => {
  const dispatch = useAppDispatch();
  const tasks = useAppSelector((state) => state.tasks.tasks); // Получаем все задачи из хранилища
  const [searchValue, setSearchValue] = useState(""); // Состояние строки поиска

  useEffect(() => {
    // Загружаем данные из LocalStorage при открытии страницы
    dispatch(loadTasksFromLS());
  }, [dispatch]);

  useEffect(() => {
    dispatch(filterTasks(searchValue))
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
      <KanbanBoard />
    </main>
  );
};

export default KanbanPage;
