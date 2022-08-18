import { ApplicationPage } from '../types/ApplicationPage';
import { BookPageView } from '../views/bookPageView';

export class BookPage extends ApplicationPage {
  bookPageView : BookPageView;

  constructor() {
    super();
    this.setView();
  }

  setView(): void {
    this.bookPageView = new BookPageView();
    this.view = this.bookPageView.view;
  }
}
export default BookPage;
