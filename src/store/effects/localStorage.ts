import { AtomEffect } from "recoil";

const localStorageEffect = <T>(key: string): AtomEffect<T> => ({setSelf, onSet}) => {
  const savedValue = localStorage.getItem(key)
  if (savedValue != null) {
    try {
      setSelf(JSON.parse(savedValue) as T);
    } catch (e) {
      console.error(`LocalStorageEffect: Unable to load and parse key ${key}`, e);
      throw e;
    }
  }

  onSet((newValue, _, isReset) => {
    isReset
      ? localStorage.removeItem(key)
      : localStorage.setItem(key, JSON.stringify(newValue));
  });
};

export default localStorageEffect;