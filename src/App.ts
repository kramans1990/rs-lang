/* eslint-disable import/no-cycle */
import MainPageController from './pages/main-page/main-page-controler';
import ApplicationContoller from './pages/application-controller';
import AuthController from './pages/auth-page/auth-controller';
import RegistrationController from './pages/registration-page/registration-controller';
import BookController from './pages/book-page/book-controller';
import { ISignIn } from './types/interfaces';
import {
  getDataFromLocalStorage,
  removeDataFromLocalStorage,
  saveDataToLocalStorage,
} from './functions/functions';
import { logOutText, signInButtonText } from './utils/constants';

class App {
  static main: HTMLElement | null;

  static user: ISignIn | undefined;

  static controller: ApplicationContoller;

  static setController(controller: ApplicationContoller) {
    App.controller = controller;
    App.main = document.querySelector('.main');
    if (App.main) {
      App.main.innerHTML = '';
      App.main.appendChild(App.controller.pageView.view);
    }
  }

  /* eslint-disable class-methods-use-this */
  start(): void {
    this.addEventListeners();
  }

  /* eslint-disable no-alert */

  static signIn(data: string | ISignIn): void {
    if (typeof data === 'object') {
      const userData = data;
      this.user = userData;
      saveDataToLocalStorage('rs-lang-user', JSON.stringify(userData));
      App.renderMainPage();
      const signInButton = document.querySelector('.sign-in-page-link') as HTMLAnchorElement;
      signInButton.innerText = logOutText;
      signInButton.removeEventListener('click', App.renderAuthPage);
      signInButton.addEventListener('click', App.logOut);
      return;
    }
    // заменить алерт на что-то человеческое
    alert(data);
  }

  static logOut(): void {
    const signInButton = document.querySelector('.sign-in-page-link') as HTMLAnchorElement;
    signInButton.innerText = signInButtonText;
    signInButton.removeEventListener('click', App.logOut);
    signInButton.addEventListener('click', App.renderAuthPage);
    this.user = undefined;
    removeDataFromLocalStorage('rs-lang-user');
  }

  static renderMainPage(): void {
    const controller: ApplicationContoller = new MainPageController();
    App.setController(controller);
  }

  static renderAuthPage(): void {
    const controller: ApplicationContoller = new AuthController();
    App.setController(controller);
  }

  static renderRegPage(): void {
    const controller: ApplicationContoller = new RegistrationController();
    App.setController(controller);
  }

  addEventListeners(): void {
    window.addEventListener('load', (): void => {
      App.renderMainPage();
      if (getDataFromLocalStorage('rs-lang-user')) {
        const user = getDataFromLocalStorage('rs-lang-user') as ISignIn;
        App.signIn(user);
      }
    });
    document.querySelector('.main-page-link')?.addEventListener('click', App.renderMainPage);
    document.querySelector('.book-page-link')?.addEventListener('click', (): void => {
      const controller: ApplicationContoller = new BookController();
      App.setController(controller);
    });
    document.querySelector('.sign-in-page-link')?.addEventListener('click', App.renderAuthPage);
    //   document.querySelector('.words-page-link')?.addEventListener('click', (): void => {
    //     this.page = new WordsPage();
    //   });
    //   document.querySelector('.stat-page')?.addEventListener('click', (): void => {
    //   document.querySelector('.book-page-link')?.addEventListener('click', (): void => {
    //     this.page = new BookPage();
    //   });
    //   document.querySelector('.stat-page-link')?.addEventListener('click', (): void => {
    //     this.page = new StatPage();
    //   });
    //   document.querySelector('.game-page-link')?.addEventListener('click', (): void => {
    //     this.page = new GamePage();
    //   });
  }
}
export default App;
