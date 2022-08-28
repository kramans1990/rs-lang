/* eslint-disable no-useless-escape */

import { ISignIn, IPageInfo } from '../types/interfaces';

function isValidEmail(email: string): boolean {
  return !!email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g); // validation for email
}

function isValidPassword(password: string): boolean {
  return !!password.match(/^[A-Za-z\d]{8,}$/g); // minimum eight characters, letters, numbers or mix
}

function saveDataToLocalStorage(name: string, data: string): void {
  localStorage.setItem(name, data);
}

function getDataFromLocalStorage(name: string): ISignIn | IPageInfo | null {
  return localStorage.getItem(name) !== null ? JSON.parse(localStorage.getItem(name) || '') : null;
}

function removeDataFromLocalStorage(name: string): void {
  localStorage.removeItem(name);
}

function disableAudioBtns() {
  const audioBtns = document.querySelectorAll('.audio-icon');
  audioBtns.forEach((btn) => {
    btn.classList.add('disabled');
  });
}

function enableAudioBtns() {
  const audioBtns = document.querySelectorAll('.audio-icon');
  audioBtns.forEach((btn) => {
    btn.classList.remove('disabled');
  });
}

/* prettier-ignore */

export {
  isValidEmail,
  isValidPassword,
  saveDataToLocalStorage,
  getDataFromLocalStorage,
  disableAudioBtns,
  enableAudioBtns,
  removeDataFromLocalStorage,
};
