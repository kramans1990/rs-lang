import '../../styles/cards.css';
import '../../styles/levelBtns.css';
import '../../styles/main.css';
import '../../styles/pagination.css';

import ApplicationContoller from '../application-controller';
import { Word } from '../../types/Word';
import { BookPageView } from './book-view';
import Card from '../../types/CardView';
import BookModel from './book-model';

const NUMBER_OF_LEVELS = 7; // 6 + 1(все сложные слова)
const RENDER_GROUP_NUMBER = 0;
const RENDER_PAGE_NUMBER = 0;

class BookController extends ApplicationContoller {
  view: HTMLDivElement;

  pageView: BookPageView;

  bookModel: BookModel;

  levels: HTMLDivElement;

  cardsList: HTMLDivElement;

  pagination: HTMLDivElement;

  constructor() {
    super();
    this.pageView = new BookPageView();
    this.bookModel = new BookModel();
    this.setView();
    this.renderCards(RENDER_GROUP_NUMBER, RENDER_PAGE_NUMBER);
    this.renderLevelsBtns = this.renderLevelsBtns.bind(this); // обойти правило линта про this
    this.renderLevelsBtns();
  }

  setView(): void {
    this.pageView = new BookPageView();
    this.view = this.pageView.view;
    this.levels = this.pageView.levels;
    this.cardsList = this.pageView.cardsList;
    this.pagination = this.pageView.pagination;
    this.pagination.innerText = 'Здесь будeт пагинация !!!!!!!!!!!!!!!!';
  }

  async renderCards(group: number, page: number) {
    const words = await this.bookModel.getWords(group, page);
    words.forEach((wordInfo: Word) => {
      const card = new Card(wordInfo);
      this.cardsList.append(card.view);
      card.view.addEventListener('click', BookController.setEventListenersForCard);
    });
  }

  renderLevelsBtns() {
    for (let i = 1; i <= NUMBER_OF_LEVELS; i += 1) {
      const btn = BookPageView.createElementByParams('div', 'level');
      btn.classList.add(`level-${i}`);
      btn.dataset.level = `${i}`;

      if (i === NUMBER_OF_LEVELS) {
        btn.innerText = 'сложные';
      } else {
        btn.innerHTML = `уровень  <span> ${i}</span>`;
      }
      btn.addEventListener('click', (e: Event) => {
        if (e.target) {
          const group = Number((e.target as HTMLDivElement).dataset.level) - 1;
          this.cardsList.innerHTML = '';
          this.renderCards(group, RENDER_PAGE_NUMBER);
        }
      });
      this.levels.append(btn);
    }
  }

  // levelBtnHandler(e: MouseEvent) {
  //   if (e.target) {
  //     const group = Number((e.target as HTMLDivElement).dataset.level) - 1;
  //     this.cardsList.innerHTML = '';
  //     this.renderCards(group, RENDER_PAGE_NUMBER);
  //   }
  // }

  static setEventListenersForCard(e: Event) {
    switch (true) {
      // case diffBtn: console.log(e.target);
      //   break;
      // case doneBtn: console.log(e.target);
      //   break;
      case (e.target as HTMLDivElement).classList.contains('audio-icon'): {
        const cardId = (e.target as HTMLElement).closest('.card')?.id;
        if (cardId) {
          BookController.playAudio(cardId);
        }
        break;
      }
      default:
        break;
    }
  }

  static playAudio(cardId: string) {
    const tracks = document.getElementById(`${cardId}`)?.querySelectorAll('audio');
    if (tracks) {
      try {
        tracks[0].play();
        for (let i = 0; i < tracks.length - 1; i += 1) {
          tracks[i].onended = () => {
            tracks[i + 1].play();
          };
        }
      } catch {
        throw Error('Воспроизведение отклонено.');
      }
    }
  }
}
export default BookController;
