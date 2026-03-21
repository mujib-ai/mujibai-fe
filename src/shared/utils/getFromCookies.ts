export const getFromCookies = (item: any) => {
  const val = document.cookie
    .split('; ')
    .find(row => row.startsWith(`${item}=`))
    ?.split('=')[1];
  return val;
};
