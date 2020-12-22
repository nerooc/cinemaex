export const parseDate = (date: string) => {
  const parsedDate = new Date(date);
  return `${parsedDate.getDate()}.${parsedDate.getMonth()}.${parsedDate.getFullYear()}`;
};
