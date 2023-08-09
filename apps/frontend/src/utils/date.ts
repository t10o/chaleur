export const formatJpYmd = (date: Date) => {
  const y = date.getFullYear();
  const m = ("00" + (date.getMonth() + 1)).slice(-2);
  const d = ("00" + date.getDate()).slice(-2);

  return y + "年" + m + "月" + d + "日";
};

export const getThisMonth = (start: Date, end: Date) => {
  if (
    start.getMonth() - end.getMonth() === -2 ||
    start.getFullYear() - end.getFullYear() < 0
  ) {
    return new Date(end.getFullYear(), end.getMonth() - 1);
  }

  if (start.getDate() === 1) {
    return new Date(start.getFullYear(), start.getMonth());
  }

  return new Date();
};
