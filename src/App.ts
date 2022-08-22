import { ApplicationPage } from './types/ApplicationPage';
import { BookPage } from './pages/bookPage';
import { StatPage } from './pages/statPage';
import { WordsPage } from './pages/wordsPage';
import { GamePage } from './pages/gamePage';
import { AuthPage } from './pages/authPage';
import { RegPage } from './pages/regPage';

export class App {
  private _page: ApplicationPage;

  main: HTMLElement | null;

  set page(page: ApplicationPage) {
    this.main = document.querySelector('.main');
    this._page = page;
    if (this.main) {
      this.main.innerHTML = '';
      this.main.appendChild(this._page.view);
    }
  }

  start(): void {
    this.addPageListeners();
  }

  addPageListeners() {
    document.querySelector('.words-page')?.addEventListener('click', (): void => {
      this.page = new WordsPage();
    });
    document.querySelector('.book-page')?.addEventListener('click', (): void => {
      this.page = new BookPage();
    });
    document.querySelector('.stat-page')?.addEventListener('click', (): void => {
      this.page = new StatPage();
    });
    document.querySelector('.game-page')?.addEventListener('click', (): void => {
      this.page = new GamePage();
    });
    document.querySelector('.sign-in-page')?.addEventListener('click', (): void => {
      this.page = new AuthPage();
    });
    document.querySelector('.sign-up-page')?.addEventListener('click', (): void => {
      this.page = new RegPage();
    });
  }
}
export default App;
