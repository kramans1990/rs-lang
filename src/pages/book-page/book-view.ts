import ApplicationView from '../application-view';

export class BookPageView extends ApplicationView {
  view: HTMLDivElement;

  cardsList: HTMLDivElement;

  levels: HTMLDivElement;

  pagination: HTMLDivElement;

  main: HTMLElement;

  footer: HTMLElement;

  header: HTMLElement;

  body: HTMLElement;

  constructor() {
    super();
    this.view = document.createElement('div');
    this.levels = BookPageView.createElementByParams('div', 'levels') as HTMLDivElement;
    this.cardsList = BookPageView.createElementByParams('div', 'cards_list') as HTMLDivElement;
    this.pagination = BookPageView.createElementByParams('div', 'pagination') as HTMLDivElement;
    this.view.append(this.levels, this.cardsList, this.pagination);

    this.body = document.querySelector('body') as HTMLBodyElement;
    this.header = document.querySelector('header') as HTMLElement;
    this.main = document.querySelector('.main') as HTMLElement;
    this.footer = document.querySelector('footer') as HTMLElement;

    this.createGameButtons();
    this.setBackgrounds();
  }

  static createElementByParams(tag: string, className: string) {
    const element = document.createElement(tag);
    if (className) element.classList.add(className);
    return element;
  }

  setBackgrounds() {
    this.body.style.backgroundImage = 'none';
    this.header.style.backgroundImage = 'url("../assets/bg_main.jpg")';
    this.header.style.minHeight = '80px';
    this.footer.classList.add('footer_all-pages');
  }

  createGameButtons() {
    const sprintGameLink = BookPageView.createElementByParams('div', 'btn') as HTMLDivElement; // sprint-game__link
    sprintGameLink.classList.add('btn_colored');
    sprintGameLink.innerText = 'Спринт';
    const audioGameLink = BookPageView.createElementByParams('div', 'btn') as HTMLDivElement; // audio-game__link
    audioGameLink.classList.add('btn_colored');
    audioGameLink.innerText = 'Аудиовызов';
    const extraGameLink = BookPageView.createElementByParams('div', 'btn') as HTMLDivElement; // extra-game__link
    extraGameLink.classList.add('btn_colored');
    extraGameLink.innerText = 'Экстра';

    let gameButtons = document.querySelector('.game__buttons');
    if (!gameButtons) {
      gameButtons = BookPageView.createElementByParams('div', 'game__buttons');
    }
    gameButtons.innerHTML = '';
    gameButtons.append(extraGameLink, audioGameLink, sprintGameLink);
    this.footer.prepend(gameButtons);
  }
}

export default BookPageView;
