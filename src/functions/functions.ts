/* eslint-disable no-useless-escape */

import { ISignIn } from '../types/interfaces';

export function isValidEmail(email: string): boolean {
  return !!email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g); // validation for email
}

export function isValidPassword(password: string): boolean {
  return !!password.match(/^[A-Za-z\d]{8,}$/g); // minimum eight characters, letters, numbers or mix
}

export function saveDataToLocalStorage(name: string, data: string): void {
  localStorage.setItem(name, data);
}

export function getDataFromLocalStorage(name: string): ISignIn | null {
  return localStorage.getItem(name) !== null ? JSON.parse(localStorage.getItem(name) || '') : null;
}
