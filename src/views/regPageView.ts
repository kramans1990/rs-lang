import '../styles/authorisation.css';
import {
  email,
  haveAccountText,
  name,
  password,
  signInButtonText,
  signUpTitle,
  upperSignUpButtonText,
} from '../utils/constants';

export class RegPageView {
  view: HTMLDivElement;

  constructor() {
    this.renderRegBlock();
  }

  renderRegBlock() {
    this.view = document.createElement('div');
    this.view.classList.add('registration');
    const title = document.createElement('p');
    title.classList.add('reg-title');
    title.innerText = signUpTitle;
    const nameInput = document.createElement('input');
    nameInput.classList.add('name-input');
    nameInput.setAttribute('type', 'text');
    nameInput.setAttribute('placeholder', name);
    nameInput.setAttribute('autocomplete', 'off');
    const emailInput = document.createElement('input');
    emailInput.classList.add('email-input');
    emailInput.setAttribute('type', 'email');
    emailInput.setAttribute('placeholder', email);
    emailInput.setAttribute('autocomplete', 'off');
    const passwordInput = document.createElement('input');
    passwordInput.classList.add('password-input');
    passwordInput.setAttribute('type', 'password');
    passwordInput.setAttribute('placeholder', password);
    passwordInput.setAttribute('autocomplete', 'off');
    const signUpButton = document.createElement('button');
    signUpButton.classList.add('sign-up-button');
    signUpButton.innerText = upperSignUpButtonText;
    const haveAccount = document.createElement('div');
    haveAccount.classList.add('have-account');
    const haveAccountSpan = document.createElement('span');
    haveAccountSpan.classList.add('have-account-span');
    haveAccountSpan.innerText = haveAccountText;
    const haveAccountButton = document.createElement('button');
    haveAccountButton.classList.add('have-account-button');
    haveAccountButton.innerText = signInButtonText;
    haveAccount.append(haveAccountSpan, haveAccountButton);
    this.view.append(title, nameInput, emailInput, passwordInput, signUpButton, haveAccount);
  }
}
export default RegPageView;
