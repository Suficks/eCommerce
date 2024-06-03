import { LocalStorageKeys } from '@/shared/const/LocalStorage';

export const setLocalStorageValue = (value: number) => {
  localStorage.setItem(LocalStorageKeys.VERSION, JSON.stringify(value));
};
