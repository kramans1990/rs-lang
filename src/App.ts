/* eslint-disable import/no-cycle */
import MainPageController from './pages/main-page/main-page-controller';
import ApplicationContoller from './pages/application-controller';
// import AudioController from './pages/games/audio-call-page/audio-call-controller';
import AuthController from './pages/auth-page/auth-controller';
import RegistrationController from './pages/registration-page/registration-controller';
import BookController from './pages/book-page/book-controller';
import { ISignIn, IPageInfo } from './types/interfaces';
import {
  getDataFromLocalStorage,
  removeDataFromLocalStorage,
  saveDataToLocalStorage,
  burgerMenuHandle,
  clickMenuHandle,
  setBackgroundForBookPage,
  getAggregatedNumberFromLS,
} from './functions/functions';
import { logOutText, signInButtonText } from './utils/constants';
import SprintController from './pages/games/sprint-page/sprint-controller';
import StatController from './pages/stat-page/stat-controller';
import AudioController from './pages/games/audio-call-page/audio-call-controller';
import { Word } from './types/Word';

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
      const { pageName } = App.pageInfo;
      if (pageName !== 'bookPage') {
        saveDataToLocalStorage('pageInfo', JSON.stringify(App.pageInfo));
      }
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
    App.user = undefined;
    removeDataFromLocalStorage('rs-lang-user');
    removeDataFromLocalStorage('aggregatedNumber');
    removeDataFromLocalStorage('pageInfo');
    App.makeMainTransparentAgain();
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
    const aggregatedNumber = getAggregatedNumberFromLS();
    setBackgroundForBookPage(aggregatedNumber);
  }

  static renderAudiocallPage(words?: Array<Word>) {
    const controller: ApplicationContoller = new AudioController(words);
    App.setController(controller);
    const mainButton = document.querySelector('.game-page-link') as HTMLElement;
    App.changeActiveClassForNavItemByElement(mainButton);
    App.makeMainTransparentAgain();
    App.pageInfo = { pageName: 'audiocallPage' };
  }

  static renderSprintPage(words?: Array<Word>) {
    const controller: ApplicationContoller = new SprintController(words);
    App.setController(controller);
    const mainButton = document.querySelector('.game-page-link') as HTMLElement;
    App.changeActiveClassForNavItemByElement(mainButton);
    App.makeMainTransparentAgain();
    App.pageInfo = { pageName: 'sprintPage' };
  }

  static renderAuthPage(): void {
    const controller: ApplicationContoller = new AuthController();
    App.setController(controller);
    const mainButton = document.querySelector('.sign-in-page-link') as HTMLElement;
    App.changeActiveClassForNavItemByElement(mainButton);
    App.makeMainTransparentAgain();
    App.pageInfo = { pageName: 'authPage' };
  }

  static renderStatPage() {
    //console.log(App.user);
    if(App.user){
    const controller: ApplicationContoller = new StatController();
    App.setController(controller);
    const mainButton = document.querySelector('.stat-page-link') as HTMLElement;
    App.changeActiveClassForNavItemByElement(mainButton);
    App.makeMainTransparentAgain();
    App.pageInfo = { pageName: 'statPage' };}
    else{
      App.renderAuthPage();
    }
  }

  static renderRegPage(): void {
    const controller: ApplicationContoller = new RegistrationController();
    App.setController(controller);
  }

  static makeMainTransparentAgain(): void {
    const mainWrapper = document.querySelector('.main_wrapper') as HTMLDivElement;
    mainWrapper.classList.remove('all-done');
    mainWrapper.style.backgroundColor = 'transparent';
  }

  addEventListeners() {
    window.addEventListener('load', (): void => {
      if (getDataFromLocalStorage('rs-lang-user')) {
        const user = getDataFromLocalStorage('rs-lang-user') as ISignIn;
        App.signIn(user);
      }
      if (getDataFromLocalStorage('pageInfo')) {
        this.renderPageAfterReload();
      }
    });
    document.querySelector('.header__logo')?.addEventListener('click', App.renderMainPage);
    document.querySelector('.main-page-link')?.addEventListener('click', App.renderMainPage);
    document.querySelector('.book-page-link')?.addEventListener('click', App.renderBookPage);
    document
      .querySelector('.sprint-page-link')
      ?.addEventListener('click', (): void => App.renderSprintPage());
    document.querySelector('.book-page-link')?.addEventListener('click', (e: Event): void => {
      const controller: ApplicationContoller = new BookController();
      App.setController(controller);
      App.changeActiveClassForNavItemByEvent(e);
    });
    document.querySelector('.sign-in-page-link')?.addEventListener('click', App.renderAuthPage);
    document.querySelector('.stat-page-link')?.addEventListener('click', App.renderStatPage);
    document
      .querySelector('.audio-page-link')
      ?.addEventListener('click', (): void => App.renderAudiocallPage());
    document.querySelector('.sign-up-page-link')?.addEventListener('click', App.renderRegPage);
    document.querySelector('.burger')?.addEventListener('click', burgerMenuHandle);
    document.querySelector('.nav-list')?.addEventListener('click', clickMenuHandle);
  }

  renderPageAfterReload() {
    const pageInfo = getDataFromLocalStorage('pageInfo') as IPageInfo;
    const { pageName } = pageInfo;
    switch (pageName) {
      case 'mainPage':
        App.renderMainPage();
        break;
      case 'bookPage':
        App.renderBookPage();
        break;
      case 'audiocallPage':
        App.renderAudiocallPage();
        break;
      case 'statPage':
        App.renderStatPage();
        break;
      case 'sprintPage':
        App.renderSprintPage();
        break;
      case 'authPage':
        App.renderAuthPage();
        break;
      default:
        App.renderMainPage();
        break;
    }
  }
}
export default App;
