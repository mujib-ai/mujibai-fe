export const getFromCookies = (item: string) => {
  const val = document.cookie
    .split('; ')
    .find(row => row.startsWith(`${item}=`))
    ?.split('=')[1];
  return val;
};
