import { ApplicationPage } from '../types/ApplicationPage';
import { WordsPageView } from '../views/wordsPageView';

export class WordsPage extends ApplicationPage {
  wordsPageView : WordsPageView;

  constructor() {
    super();
    this.setView();
  }

  setView(): void {
    this.wordsPageView = new WordsPageView();
    this.view = this.wordsPageView.view;
  }
}
export default WordsPage;
