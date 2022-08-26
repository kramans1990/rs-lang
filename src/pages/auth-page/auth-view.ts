/* eslint-disable import/no-cycle */
import App from '../../App';
import '../../styles/authorisation.css';
import {
  email,
  haveNotYetAccountText,
  password,
  signInTitle,
  signUpButtonText,
  upperSignInButtonText,
} from '../../utils/constants';
import ApplicationView from '../application-view';

class AuthView extends ApplicationView {
  constructor() {
    super();
    this.renderAuthBlock();
  }

  renderAuthBlock() {
    this.view = document.createElement('div');
    this.view.classList.add('authorisation');
    const title = document.createElement('p');
    title.classList.add('auth-title');
    title.innerText = signInTitle;
    const emailInput = document.createElement('input');
    emailInput.classList.add('email-input');
    emailInput.setAttribute('type', 'email');
    emailInput.setAttribute('placeholder', email);
    emailInput.setAttribute('autocomplete', 'on');
    const passwordInput = document.createElement('input');
    passwordInput.classList.add('password-input');
    passwordInput.setAttribute('type', 'password');
    passwordInput.setAttribute('placeholder', password);
    passwordInput.setAttribute('autocomplete', 'on');
    const signInButton = document.createElement('button');
    signInButton.classList.add('sign-in-button');
    signInButton.innerText = upperSignInButtonText;
    const haveNotYetAccount = document.createElement('div');
    haveNotYetAccount.classList.add('have-not-yet-account');
    const haveNotYetAccountSpan = document.createElement('span');
    haveNotYetAccountSpan.classList.add('have-not-yet-account-span');
    haveNotYetAccountSpan.innerText = haveNotYetAccountText;
    const haveNotYetAccountButton = document.createElement('button');
    haveNotYetAccountButton.classList.add('have-not-yet-account-button');
    haveNotYetAccountButton.innerText = signUpButtonText;
    haveNotYetAccountButton.addEventListener('click', App.renderRegPage);
    haveNotYetAccount.append(haveNotYetAccountSpan, haveNotYetAccountButton);
    this.view.append(title, emailInput, passwordInput, signInButton, haveNotYetAccount);
  }
}

export default AuthView;
