import '../../styles/cards.css';
import '../../styles/level-buttons.css';
import '../../styles/main.css';
import '../../styles/pagination.css';

import ApplicationContoller from '../application-controller';
import { Word } from '../../types/Word';
import { BookPageView } from './book-view';
import Card from '../../types/CardView';
import BookModel from './book-model';
import {
  numberOfLevels,
  renderGroupNumber,
  renderPageNumber,
  btnDiffText,
  btnLevelText,
} from '../../utils/constants';
import { disableAudioBtns, enableAudioBtns } from '../../functions/functions';

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
    this.renderCards(renderGroupNumber, renderPageNumber);
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
    for (let i = 1; i <= numberOfLevels; i += 1) {
      const btn = BookPageView.createElementByParams('div', 'level');
      btn.classList.add(`level-${i}`);
      btn.dataset.level = `${i}`;

      if (i === numberOfLevels) {
        btn.innerText = btnDiffText;
      } else {
        btn.innerHTML = btnLevelText;
        const levelNumber = BookPageView.createElementByParams('span', 'level_number');
        levelNumber.innerHTML = `${i}`;
        btn.append(levelNumber);
      }
      btn.addEventListener('click', (e): void => this.levelBtnHandler(e));
      this.levels.append(btn);
    }
  }

  levelBtnHandler(e: MouseEvent) {
    if (e.target) {
      const group = Number((e.target as HTMLDivElement).dataset.level) - 1;
      this.cardsList.innerHTML = '';
      this.renderCards(group, renderPageNumber);
    }
  }

  static setEventListenersForCard(e: Event) {
    const eTargetClassList = (e.target as HTMLDivElement).classList;

    // if (eTargetClassList.contains('hard__btn')) {}
    // if (eTargetClassList.contains('done__btn')) {}

    if (eTargetClassList.contains('audio-icon')) {
      disableAudioBtns();
      const cardId = (e.target as HTMLElement).closest('.card')?.id;
      if (cardId) {
        BookController.playAudio(cardId);
      }
    }
  }

  static playAudio(cardId: string) {
    const tracks = document.getElementById(`${cardId}`)?.querySelectorAll('audio');
    if (tracks) {
      try {
        tracks[0].play();
        for (let i = 0; i < tracks.length; i += 1) {
          if (i === tracks.length - 1) {
            tracks[tracks.length - 1].onended = () => {
              enableAudioBtns();
            };
            break;
          } else {
            tracks[i].onended = () => {
              tracks[i + 1].play();
            };
          }
        }
      } catch {
        throw Error('Воспроизведение отклонено.');
      }
    }
  }
}
export default BookController;
