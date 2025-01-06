import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { Task } from "../types/task";
import tasksList from "./tasks.json";
import { formatStringToTimestamp, formatTimestampToString } from "../lib";

interface TasksState {
  tasks: Task[];
  filteredTasks: Task[];
}

const initialState: TasksState = {
  tasks: tasksList,
  filteredTasks: tasksList,
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    loadTasksFromLS(state, action: PayloadAction<void>) {
      const tasksFromLS = JSON.parse(localStorage.getItem("tasks") || "[]");
      // Запоминаем данные из localStorage, если они есть, иначе записываем стандартный JSON в localStorage
      if (Array.isArray(tasksFromLS) && tasksFromLS.length > 0) {
        state.tasks = tasksFromLS;
      } else {
        localStorage.setItem("tasks", JSON.stringify(state.tasks));
      }
    },
    filterTasks(state, action: PayloadAction<string>) {
      const lowerSearchValue = action.payload.toLowerCase();
      // Проверка на формат даты dd.mm.yyyy
      const isDate =
        /^\d{2}\.\d{2}\.\d{4}$/.test(lowerSearchValue) &&
        !isNaN(
          new Date(formatStringToTimestamp(lowerSearchValue)).getTime()
        );

      const filtered = state.tasks.filter((task) => {
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

      state.filteredTasks = filtered;
    },
    addTask(state, action: PayloadAction<Task>) {
      const { payload } = action;
      state.tasks.push(payload);
      localStorage.setItem("tasks", JSON.stringify(state.tasks));
    },
    updateTask(state, action: PayloadAction<Task>) {
      const { payload } = action;
      const taskIndex = state.tasks.findIndex((task) => task.id === payload.id);
      state.tasks[taskIndex] = payload;
      localStorage.setItem("tasks", JSON.stringify(state.tasks));
    },
    deleteTask(state, action: PayloadAction<number | number[]>) {
      const { payload } = action;
      if (Array.isArray(payload)) {
        state.tasks = state.tasks.filter((task) => !payload.includes(task.id));
      } else {
        state.tasks = state.tasks.filter((task) => task.id !== payload);
      }
      localStorage.setItem("tasks", JSON.stringify(state.tasks));
    },
  },
});

export const { loadTasksFromLS, updateTask, deleteTask, filterTasks, addTask } = tasksSlice.actions;
export default tasksSlice.reducer;
