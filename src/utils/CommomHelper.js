export const setValueInLocalStorage = (name, value) => {
  localStorage.setItem(name, value);
};

export const getValueFromLocalStorage = (name) => {
  localStorage.getItem(name);
};
