import { format } from "date-fns";

const timeAgo = (dateParam) => {
  // Short circuit if param is nullish
  if (!dateParam) return null;

  const date = typeof dateParam === "object" ? dateParam : new Date(dateParam);

  const today = new Date();
  const seconds = Math.round((today - date) / 1000);
  const minutes = Math.round(seconds / 60);
  const hours = Math.round(seconds / 24);

  const isToday = today.toDateString() === date.toDateString();

  if (seconds < 5) {
    return "Now";
  } else if (seconds < 60) {
    return `${seconds}s ago`;
  } else if (seconds < 90) {
    return "About a minute ago";
  } else if (minutes < 60) {
    return `${minutes}m ago`;
  } else if (isToday) {
    return `${hours}h ago`;
  }

  // TODO: Format cases beyond isToday to cater for 'A week ago', 'X days ago', etc.

  // Default case
  return format(date, "P");
}

export default timeAgo;