import { TaskTypes } from "../enums";
import { Task } from "../types/task";

/**
 *
 * @description
 * Функция для сортировки задач по дате начала
 */
export function SortTasksByDate(tasks: Task[]) {
  return tasks.sort((a, b) => a.startDay - b.startDay);
}

/**
 *
 * @description
 * Функция для отбора задач по типу
 */
export function FilterTasksByType(tasks: Task[], type: TaskTypes) {
  return tasks.filter((task) => task.type === type);
}
