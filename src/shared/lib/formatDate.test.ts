import { formatTimestampToString, formatStringToTimestamp } from "./formatDate";

describe("formatDate utilities", () => {
  test("formatTimestampToString should convert timestamp to DD.MM.YYYY format", () => {
    const timestamp = new Date(2023, 0, 1).getTime(); // 1 января 2023 года
    const formattedDate = formatTimestampToString(timestamp);

    expect(formattedDate).toBe("01.01.2023");
  });

  test("formatStringToTimestamp should convert DD.MM.YYYY to timestamp", () => {
    const dateString = "01.01.2023";
    const timestamp = formatStringToTimestamp(dateString);

    const expectedTimestamp = new Date(2023, 0, 1).getTime(); // 1 января 2023 года
    expect(timestamp).toBe(expectedTimestamp);
  });

  test("formatStringToTimestamp and formatTimestampToString should be reversible", () => {
    const originalTimestamp = new Date(2025, 6, 15).getTime(); // 15 июля 2025 года
    const formattedDate = formatTimestampToString(originalTimestamp);
    const convertedBackTimestamp = formatStringToTimestamp(formattedDate);

    expect(convertedBackTimestamp).toBe(originalTimestamp);
  });
});
