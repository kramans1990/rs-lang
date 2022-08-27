/* eslint-disable import/no-cycle */
import MainPageController from './pages/main-page/main-page-controler';
import ApplicationContoller from './pages/application-controller';
import AuthController from './pages/auth-page/auth-controller';
import RegistrationController from './pages/registration-page/registration-controller';
import BookController from './pages/book-page/book-controller';
import { ISignIn, IPageInfo } from './types/interfaces';
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

  static pageInfo: IPageInfo;

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
    window.onbeforeunload = () => {
      saveDataToLocalStorage('pageInfo', JSON.stringify(App.pageInfo));
    };
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

  static changeActiveClassForNavItemByEvent(e: Event): void {
    App.changeActiveClassForNavItemByElement(e.target as HTMLElement | null);
  }

  static changeActiveClassForNavItemByElement(elem: HTMLElement | null): void {
    const menuItems = document.querySelectorAll('.nav-list__item') as NodeListOf<HTMLLIElement>;
    menuItems.forEach((item: HTMLLIElement): void => {
      item.classList.remove('active');
    });
    elem?.classList.add('active');
  }

  static renderMainPage(): void {
    const controller: ApplicationContoller = new MainPageController();
    App.setController(controller);
    App.pageInfo = { pageName: 'mainPage' };
    App.makeMainTransparentAgain();
    const mainButton = document.querySelector('.main-page-link') as HTMLElement;
    App.changeActiveClassForNavItemByElement(mainButton);
  }

  static renderBookPage() {
    const controller: ApplicationContoller = new BookController();
    App.setController(controller);
    const mainButton = document.querySelector('.book-page-link') as HTMLElement;
    App.changeActiveClassForNavItemByElement(mainButton);
    App.pageInfo = { pageName: 'bookPage' };
  }

  static renderAuthPage(): void {
    const controller: ApplicationContoller = new AuthController();
    App.setController(controller);
    // if (e) {
    //   App.changeActiveClassForNavItemByEvent(e);
    // }
    const mainButton = document.querySelector('.sign-in-page-link') as HTMLElement;
    App.changeActiveClassForNavItemByElement(mainButton);
    App.makeMainTransparentAgain();
    App.pageInfo = { pageName: 'authPage' };
  }

  static renderRegPage(): void {
    const controller: ApplicationContoller = new RegistrationController();
    App.setController(controller);
  }

  static makeMainTransparentAgain(): void {
    const mainWrapper = document.querySelector('.main_wrapper') as HTMLDivElement;
    mainWrapper.style.backgroundColor = 'transparent';
  }

  addEventListeners() {
    window.addEventListener('load', (): void => {
      if (getDataFromLocalStorage('pageInfo')) {
        const pageInfo = getDataFromLocalStorage('pageInfo') as IPageInfo;
        const { pageName } = pageInfo;
        switch (pageName) {
          case 'mainPage':
            App.renderMainPage();
            break;
          case 'bookPage':
            App.renderBookPage();
            break;
          case 'authPage':
            App.renderAuthPage();
            break;
          default:
            App.renderMainPage();
            break;
        }
      } else {
        App.renderMainPage();
      }
      if (getDataFromLocalStorage('rs-lang-user')) {
        const user = getDataFromLocalStorage('rs-lang-user') as ISignIn;
        App.signIn(user);
      }
    });
    document.querySelector('.header__logo')?.addEventListener('click', App.renderMainPage);

    // App.renderMainPage();
    document.querySelector('.main-page-link')?.addEventListener('click', App.renderMainPage);
    document.querySelector('.book-page-link')?.addEventListener('click', App.renderBookPage);

    document.querySelector('.sign-in-page-link')?.addEventListener('click', App.renderAuthPage);
    //   document.querySelector('.words-page-link')?.addEventListener('click', (): void => {
    //     this.page = new WordsPage();
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
