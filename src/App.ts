import { ApplicationPage } from './types/ApplicationPage';
import { BookPage } from './pages/bookPage';
import { StatPage } from './pages/statPage';
import { WordsPage } from './pages/wordsPage';
import { GamePage } from './pages/gamePage';
import { AuthPage } from './pages/authPage';

export class App {
  private _page: ApplicationPage;

  main: HTMLElement | null;

  set page(page: ApplicationPage) {
    this.main = document.getElementById('main');
    this._page = page;
    if (this.main) {
      this.main.innerHTML = '';
      this.main.appendChild(this._page.view);
    }
  }

  start() {
    this.addPageListenears();
  }

  addPageListenears() {
    document.getElementById('words-page')?.addEventListener('click', () => {
      this.page = new WordsPage();
    });
    document.getElementById('book-page')?.addEventListener('click', () => {
      this.page = new BookPage();
    });
    document.getElementById('stat-page')?.addEventListener('click', () => {
      this.page = new StatPage();
    });
    document.getElementById('game-page')?.addEventListener('click', () => {
      this.page = new GamePage();
    });
    document.getElementById('auth-page')?.addEventListener('click', () => {
      this.page = new AuthPage();
    });
  }
}
export default App;
