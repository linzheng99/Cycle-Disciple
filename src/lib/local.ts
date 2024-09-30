const prefix = 'cd'

export const getLocalStorage = (key: string) => {
  return window.localStorage.getItem(`${prefix}:${key}`);
}

export const setLocalStorage = (key: string, value: string) => {
  window.localStorage.setItem(`${prefix}:${key}`, value);
}
