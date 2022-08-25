/* eslint-disable import/no-cycle */
import MainPageController from './pages/main-page/main-page-controler';
import ApplicationContoller from './pages/application-controller';
import AuthController from './pages/auth-page/auth-controller';
import RegistrationController from './pages/registration-page/registration-controller';
import BookController from './pages/book-page/book-controller';

class App {
  static main: HTMLElement | null;

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

  renderMainPage() {
    const controller: ApplicationContoller = new MainPageController();
    App.setController(controller);
  }

  changeActiveClassForNavItem(e: Event) {
    const menuItems = document.querySelectorAll('.nav-list__item');
    menuItems.forEach((item) => {
      item.classList.remove('active');
    });
    (e.target as HTMLLIElement).classList.add('active');
  }

  addEventListeners() {
    window.addEventListener('load', (): void => {
      this.renderMainPage();
    });
    document.querySelector('.main-page-link')?.addEventListener('click', (e): void => {
      this.renderMainPage();
      const mainWrapper = document.querySelector('.main_wrapper') as HTMLDivElement;
      mainWrapper.style.backgroundColor = 'transparent';
      this.changeActiveClassForNavItem(e);
    });
    //   document.querySelector('.words-page-link')?.addEventListener('click', (): void => {
    //     this.page = new WordsPage();
    //   });
    document.querySelector('.book-page-link')?.addEventListener('click', (e): void => {
      const controller: ApplicationContoller = new BookController();
      App.setController(controller);
      this.changeActiveClassForNavItem(e);
    });
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
    document.querySelector('.sign-in-page-link')?.addEventListener('click', (): void => {
      const controller: ApplicationContoller = new AuthController();
      App.setController(controller);
    });
    document.querySelector('.sign-up-page-link')?.addEventListener('click', (): void => {
      const controller: ApplicationContoller = new RegistrationController();
      App.setController(controller);
    });
  }
}
export default App;
