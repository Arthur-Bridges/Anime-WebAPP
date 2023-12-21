export const format_time = (date) => {
  return date.toLocaleTimeString();
};

export const format_date = (date) => {
  const currentDate = new Date(date);
  return `${currentDate.getMonth() + 1}/${currentDate.getDate()}/${
    currentDate.getFullYear() + 5
  }`;
};
