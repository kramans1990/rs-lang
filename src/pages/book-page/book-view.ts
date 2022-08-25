import ApplicationView from '../application-view';

export class BookPageView extends ApplicationView {
  view: HTMLDivElement;

  cardsList: HTMLDivElement;

  levels: HTMLDivElement;

  pagination: HTMLDivElement;

  gameButtons: HTMLDivElement;

  main: HTMLElement;

  body: HTMLElement;

  constructor() {
    super();
    this.view = document.createElement('div');
    this.levels = BookPageView.createElementByParams('div', 'levels') as HTMLDivElement;
    this.cardsList = BookPageView.createElementByParams('div', 'cards_list') as HTMLDivElement;
    this.pagination = BookPageView.createElementByParams('div', 'pagination') as HTMLDivElement;
    this.gameButtons = BookPageView.createElementByParams('div', 'game__buttons') as HTMLDivElement;

    this.view.append(this.levels, this.cardsList, this.pagination, this.gameButtons);

    this.body = document.querySelector('body') as HTMLBodyElement;
    this.main = document.querySelector('.main') as HTMLElement;
  }

  static createElementByParams(tag: string, className: string) {
    const element = document.createElement(tag);
    if (className) element.classList.add(className);
    return element;
  }
}

export default BookPageView;
