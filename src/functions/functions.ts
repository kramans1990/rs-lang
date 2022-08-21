/* eslint-disable no-useless-escape */

export function isValidEmail(email: string): boolean {
  return !!email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g); // validation for email
}

export function isValidPassword(password: string): boolean {
  return !!password.match(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/g); // minimum eight characters, at least one letter and one number
}
