// import { BookPage } from './pages/bookPage';
// import { StatPage } from './pages/statPage';
// import { WordsPage } from './pages/wordsPage';
// import { GamePage } from './pages/gamePage';
// import { AuthPage } from './pages/authPage';
// import { RegPage } from './pages/regPage';
/* eslint-disable import/no-cycle */
import { ApplicationContoller } from './pages/application-controller';
import { AuthController } from './pages/auth-page/auth-controller';
import { RegistrationController } from './pages/registration-page/registration-controller';

export class App {
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

  // set page(page: ApplicationPage) {
  //   this.main = document.querySelector('.main');
  //   this._page = page;
  //   if (this.main) {
  //     this.main.innerHTML = '';
  //     this.main.appendChild(this._page.view);
  //   }
  // }
  /* eslint-disable class-methods-use-this */
  start(): void {
    this.addPageListeners();
  }

  addPageListeners() {
    //   document.querySelector('.words-page')?.addEventListener('click', (): void => {
    //     this.page = new WordsPage();
    //   });
    //   document.querySelector('.book-page')?.addEventListener('click', (): void => {
    //     this.page = new BookPage();
    //   });
    //   document.querySelector('.stat-page')?.addEventListener('click', (): void => {
    //     this.page = new StatPage();
    //   });
    //   document.querySelector('.game-page')?.addEventListener('click', (): void => {
    //     this.page = new GamePage();
    //   });
    document.querySelector('.sign-in-page')?.addEventListener('click', (): void => {
      const controller: ApplicationContoller = new AuthController();
      App.setController(controller);
    });
    document.querySelector('.sign-up-page')?.addEventListener('click', (): void => {
      const controller: ApplicationContoller = new RegistrationController();
      App.setController(controller);
    });
  }
}
export default App;
