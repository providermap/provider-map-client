const getFormattedDate = (date, preformattedDate = false, hideYear = false) => {

  const day = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();
  const hours = date.getHours();
  let minutes = date.getMinutes();

  if (minutes < 10) {
    // Adding leading zero to minutes
    minutes = `0${minutes}`;
  }

  if (preformattedDate) {
    // Today at 10:20
    // Yesterday at 10:20
    return `${preformattedDate} at ${hours}:${minutes}`;
  }

  if (hideYear) {
    // 1/10 at 10:20
    return `${month}/${day} at ${hours}:${minutes}`;
  }

  // 10. January 2017. at 10:20
  return `${day}. ${month} ${year}. at ${hours}:${minutes}`;
}


const timeAgo = (dateParam) => {
  // Short circuit if param is nullish
  if (!dateParam) return null;

  const date = typeof dateParam === "object" ? dateParam : new Date(dateParam);
  const DAY_IN_MS = 86400000; // 24 * 60 * 60 * 1000
  const today = new Date();
  const yesterday = new Date(today - DAY_IN_MS);
  const seconds = Math.round((today - date) / 1000);
  const minutes = Math.round(seconds / 60);
  const isToday = today.toDateString() === date.toDateString();
  const isYesterday = yesterday.toDateString() === date.toDateString();
  const isThisYear = today.getFullYear() === date.getFullYear();


  if (seconds < 5) {
    return "Now";
  } else if (seconds < 60) {
    return `${seconds}s ago`;
  } else if (seconds < 90) {
    return "About a minute ago";
  } else if (minutes < 60) {
    return `${minutes}m ago`;
  } else if (isToday) {
    return getFormattedDate(date, "Today"); // Today at 10:20
  } else if (isYesterday) {
    return getFormattedDate(date, "Yesterday"); // Yesterday at 10:20
  } else if (isThisYear) {
    return getFormattedDate(date, false, true); // 10. January at 10:20
  }

  return getFormattedDate(date); // 10. January 2017. at 10:20
}

export default timeAgo;