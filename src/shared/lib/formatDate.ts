/**
 *
 * @description
 * Функция для замены timestamp даты на формат DD.MM.YYYY
 */
export const formatTimestampToString = (timestamp: number): string => {
  const date = new Date(timestamp);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Месяцы начинаются с 0
  const year = date.getFullYear();

  return `${day}.${month}.${year}`;
};

/**
 *
 * @description
 * Функция для замены даты в формате DD.MM.YYYY на timestamp
 */
export const formatStringToTimestamp = (string: string): number => {
  const [day, month, year] = string.split(".").map(Number);

  return new Date(year, month - 1, day).getTime();
}