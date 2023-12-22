function formatDate(dateObj) {
  if (!dateObj) {
    return "";
  }

  if (typeof dateObj !== "object") {
    dateObj = new Date(dateObj)
  }

  return dateObj.toLocaleDateString("en-us", {
    weekday: "long",
    //year: "numeric",
    month: "short",
    day: "numeric",
    hour: 'numeric',
    minute: 'numeric',
  });
}

export default formatDate;
