export class BookPageView {
  view: HTMLDivElement;

  constructor() {
    this.view = document.createElement('div');
    this.view.innerHTML = '<h1>BookPageView</h1>';
  }
}
export default BookPageView;
