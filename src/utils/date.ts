export const format = (date: Date) => {
  const y = date.getFullYear();
  const m = ("00" + (date.getMonth() + 1)).slice(-2);
  const d = ("00" + date.getDate()).slice(-2);

  return y + "年" + m + "月" + d + "日";
};
