import '../../styles/cards.css';
import '../../styles/level-buttons.css';
import '../../styles/main.css';
import '../../styles/pagination.css';

import ApplicationContoller from '../application-controller';
import { Word } from '../../types/Word';
import { BookPageView } from './book-view';
import CardView from './card-view';
import BookModel from './book-model';
import {
  numberOfLevels,
  renderGroupNumber,
  renderPageNumber,
  btnDiffText as btnHardText,
  btnLevelText,
  numberOfPagesInLevel,
  sprintGameName,
  audioGameName,
  extraGameName,
  iconSprintSrc,
  iconAudioGameSrc,
  iconExtraGameSrc,
} from '../../utils/constants';
import { disableAudioBtns, enableAudioBtns } from '../../functions/functions';

class BookController extends ApplicationContoller {
  view: HTMLDivElement;

  pageView: BookPageView;

  bookModel: BookModel;

  levels: HTMLDivElement;

  cardsList: HTMLDivElement;

  pagination: HTMLDivElement;

  currentPage: number;

  gameButtons: HTMLDivElement;

  constructor() {
    super();
    this.pageView = new BookPageView();
    this.bookModel = new BookModel();
    this.currentPage = 1;

    this.setView();
  }

  setView(): void {
    this.pageView = new BookPageView();
    this.view = this.pageView.view;
    this.levels = this.pageView.levels;
    this.cardsList = this.pageView.cardsList;
    this.pagination = this.pageView.pagination;
    this.gameButtons = this.pageView.gameButtons;
    this.currentPage = 1;
    this.renderLevelsBtns();
    this.renderCards(renderGroupNumber, renderPageNumber);
    this.renderPaginationBlock(this.currentPage);
    this.renderGameButtons();
  }

  async renderCards(group: number, page: number) {
    this.cardsList.innerHTML = '';
    const words = await this.bookModel.getWords(group, page);
    words.forEach((wordInfo: Word) => {
      const card = new CardView(wordInfo);
      this.cardsList.append(card.view);
      card.view.addEventListener('click', BookController.setEventListenersForCard);
    });
  }

  renderLevelsBtns() {
    for (let i = 1; i <= numberOfLevels; i += 1) {
      const btn = BookPageView.createElementByParams('div', 'level');
      btn.classList.add(`level-${i}`);
      btn.dataset.level = `${i}`;

      if (i === this.currentPage) {
        btn.classList.add('active');
      }

      if (i === numberOfLevels) {
        btn.innerText = btnHardText;
      } else {
        btn.innerHTML = btnLevelText;
        const levelNumber = BookPageView.createElementByParams('span', 'level_number');
        levelNumber.innerHTML = `&nbsp${i}`;
        btn.append(levelNumber);
      }
      btn.addEventListener('click', (e): void => this.levelBtnHandler(e));
      this.levels.append(btn);
    }
  }

  levelBtnHandler(e: MouseEvent) {
    if (e.target) {
      const levelButtons = document.querySelectorAll('.level');
      levelButtons.forEach((button) => {
        button.classList.remove('active');
      });
      (e.target as HTMLDivElement).classList.add('active');

      const group = Number((e.target as HTMLDivElement).dataset.level) - 1;
      this.cardsList.innerHTML = '';
      this.renderCards(group, renderPageNumber);
      this.renderPaginationBlock(group);
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

  async renderPaginationBlock(group: number) {
    this.pagination.innerHTML = '';
    for (let i = 1; i <= numberOfPagesInLevel; i += 1) {
      const page = BookPageView.createElementByParams('p', 'pagination-element');

      if (i === this.currentPage) {
        page.classList.add('active');
      }

      page.innerText = `${i}`;
      page.addEventListener('click', (e) => {
        this.renderCards(group, i);

        const pageItems = document.querySelectorAll('.pagination-element');
        pageItems.forEach((item) => {
          item.classList.remove('active');
        });
        (e.target as HTMLLIElement).classList.add('active');
      });
      this.pagination.append(page);
    }
  }

  renderGameButtons() {
    const sprintGameLink = BookPageView.createElementByParams('div', 'btn') as HTMLDivElement;
    sprintGameLink.classList.add('btn_colored');
    sprintGameLink.innerText = sprintGameName;
    const iconSprint = BookPageView.createElementByParams('img', 'game-icon') as HTMLImageElement;
    iconSprint.setAttribute('src', iconSprintSrc);
    sprintGameLink.prepend(iconSprint);
    const audioGameLink = BookPageView.createElementByParams('div', 'btn') as HTMLDivElement;
    audioGameLink.classList.add('btn_colored');
    audioGameLink.innerText = audioGameName;
    const iconAudioGame = BookPageView.createElementByParams(
      'img',
      'game-icon',
    ) as HTMLImageElement;
    iconAudioGame.setAttribute('src', iconAudioGameSrc);
    audioGameLink.prepend(iconAudioGame);
    const extraGameLink = BookPageView.createElementByParams('div', 'btn') as HTMLDivElement;
    extraGameLink.classList.add('btn_colored');
    extraGameLink.innerText = extraGameName;
    const iconExtraGame = BookPageView.createElementByParams(
      'img',
      'game-icon',
    ) as HTMLImageElement;
    iconExtraGame.setAttribute('src', iconExtraGameSrc);

    extraGameLink.prepend(iconExtraGame);

    this.gameButtons.append(extraGameLink, audioGameLink, sprintGameLink);
  }
}

export default BookController;
