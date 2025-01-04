import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { Task } from "../types/task";
import tasksList from "./tasks.json";

interface TasksState {
  tasks: Task[];
}

const initialState: TasksState = {
  tasks: tasksList,
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
      };
    },
    deleteTask(state, action: PayloadAction<number | number[]>) {
      const { payload } = action;
      if (Array.isArray(payload)) {
        state.tasks = state.tasks.filter((task) => !payload.includes(task.id));
      } else {
        state.tasks = state.tasks.filter((task) => task.id !== payload);
      }
      localStorage.setItem("tasks", JSON.stringify(state.tasks));
    }
  },
});

export const { loadTasksFromLS, deleteTask } = tasksSlice.actions;
export default tasksSlice.reducer;
