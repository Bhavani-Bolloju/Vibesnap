import { isYesterday, formatDistanceToNow } from "date-fns";

export const getRelativeTime = (date: Date) => {
  if (isYesterday(date)) return "Yesterday";
  return formatDistanceToNow(date, { addSuffix: true });
};

