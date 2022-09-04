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

function getDataFromLocalStorage(name: string): ISignIn | IPageInfo | string | number | null {
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

function burgerMenuHandle() {
  document.querySelector('.burger')?.classList.toggle('open');
  document.querySelector('.header_nav')?.classList.toggle('open');
  document.querySelector('.sub-nav')?.classList.remove('open');
  document.querySelector('body')?.classList.toggle('not-scroll');
}

function clickMenuHandle(e: Event) {
  if (e.target === document.querySelector('.game-page-link')) {
    document.querySelector('.sub-nav')?.classList.toggle('open');
  } else {
    document.querySelector('.burger')?.classList.remove('open');
    document.querySelector('.header_nav')?.classList.remove('open');
    document.querySelector('.sub-nav')?.classList.remove('open');
    document.querySelector('body')?.classList.remove('not-scroll');
  }
}

function getAggregatedNumberFromLS() {
  let aggregatedNumber;
  if (getDataFromLocalStorage('aggregatedNumber')) {
    aggregatedNumber = getDataFromLocalStorage('aggregatedNumber') as number;
  } else {
    aggregatedNumber = 0;
  }
  return aggregatedNumber;
}

function setBackgroundForBookPage(aggregatedNumber: number) {
  const mainWrapper = document.querySelector('.main_wrapper') as HTMLDivElement;
  if (aggregatedNumber === 20) {
    mainWrapper.classList.add('all-done');
  } else {
    mainWrapper.classList.remove('all-done');
  }
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
  burgerMenuHandle,
  clickMenuHandle,
  getAggregatedNumberFromLS,
  setBackgroundForBookPage,
};
