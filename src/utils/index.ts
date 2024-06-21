export function clearToken() {
  localStorage.clear();
}

export const getLocalStorageKeys = (key: string) => {
  return localStorage.getItem(key);
};

export const removeCookie = (name: string) => {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
};
