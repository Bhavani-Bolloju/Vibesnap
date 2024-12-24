import { isYesterday, formatDistanceToNow } from "date-fns";

export const getRelativeTime = (date: Date) => {
  if (isYesterday(date)) return "Yesterday";
  return formatDistanceToNow(date, { addSuffix: true });
};

export function getRandomPastelColor() {
  const randomValue = () => Math.floor(Math.random() * 36) + 220;
  const r = randomValue();
  const g = randomValue();
  const b = randomValue();

  return `rgb(${r}, ${g}, ${b})`;
}

