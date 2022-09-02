/* eslint-disable import/no-cycle */
import '../../styles/cards.css';
import '../../styles/level-buttons.css';
import '../../styles/main.css';
import '../../styles/pagination.css';
/* eslint-disable import/no-cycle */
import ApplicationContoller from '../application-controller';
import { IPageInfo } from '../../types/interfaces';
import { Word } from '../../types/Word';
import { BookPageView } from './book-view';
import CardView from './card-view';
import BookModel from './book-model';
import App from '../../App';
// import Api from '../../Api';
import UserWord from '../../types/userword';

import {
  numberOfLevels,
  btnHardText,
  btnLevelText,
  numberOfPagesInLevel,
  numberOfCardsPerPage,
  sprintGameName,
  audioGameName,
  iconSprintSrc,
  iconAudioGameSrc,
} from '../../utils/constants';
import {
  disableAudioBtns,
  enableAudioBtns,
  getDataFromLocalStorage,
  saveDataToLocalStorage,
  setBackgroundForBookPage,
} from '../../functions/functions';

class BookController extends ApplicationContoller {
  view: HTMLDivElement;

  pageView: BookPageView;

  bookModel: BookModel;

  levels: HTMLDivElement;

  cardsList: HTMLDivElement;

  pagination: HTMLDivElement;

  currentPage: number;

  currentLevel: number;

  gameButtons: HTMLDivElement;

  bookPageInfo: IPageInfo;

  aggregatedNumber: number;

  constructor() {
    super();
    this.pageView = new BookPageView(this.aggregatedNumber);
    this.bookModel = new BookModel();
    this.currentLevel = 0;
    this.currentPage = 0;

    if (getDataFromLocalStorage('pageInfo')) {
      this.getPageInfoFromLocalStorage();
    }

    this.setBackgroundByAggregatedNumber(this.currentLevel, this.currentPage);

    saveDataToLocalStorage(
      'pageInfo',
      JSON.stringify({
        pageName: 'bookPage',
        level: this.currentLevel,
        pageNumber: this.currentPage,
      }),
    );

    this.setView();
  }

  async setBackgroundByAggregatedNumber(currentLevel: number, currentPage: number) {
    if (App.user) {
      const responce = await this.bookModel.getUserWordsAgregatedByFilter(
        App.user.userId,
        App.user.token,
        1000,
        `{"$and":[{"group":${currentLevel}},{"page":${currentPage}},{"$or":[{"userWord.difficulty":"hard"},{"userWord.optional.progress":100}]}]}`,
      );
      this.aggregatedNumber = responce.length;
      setBackgroundForBookPage(this.aggregatedNumber);
      saveDataToLocalStorage('aggregatedNumber', JSON.stringify(this.aggregatedNumber));
    }
    return this.aggregatedNumber;
  }

  async setView(): Promise<void> {
    this.pageView = new BookPageView(this.aggregatedNumber);
    this.view = this.pageView.view;
    this.levels = this.pageView.levels;
    this.cardsList = this.pageView.cardsList;
    this.pagination = this.pageView.pagination;
    this.gameButtons = this.pageView.gameButtons;
    this.renderLevelsBtns();

    if (App.user && this.currentLevel === 6) {
      const allHardWords = await this.bookModel.getUserWordsAllHard(
        App.user.userId,
        App.user.token,
      );
      this.renderHardCards(allHardWords);
    } else {
      this.renderCards(this.currentLevel, this.currentPage);
    }

    this.renderGameButtons();

    if (this.currentLevel !== 6) {
      this.renderPaginationBlock(this.currentLevel);
    }
  }

  async renderCards(group: number, page: number) {
    this.cardsList.innerHTML = '';
    const words = await this.bookModel.getWords(group, page);
    let usersWords = new Array<UserWord>();
    if (App.user) {
      usersWords = await this.bookModel.getUserWords(App.user?.userId, App.user?.token);
    }
    words.forEach((wordInfo: Word) => {
      const card = new CardView(wordInfo, usersWords);
      this.cardsList.append(card.view);
      card.view.addEventListener('click', BookController.setEventListenersForCard);
    });
  }

  async renderHardCards(allHardWords: Array<Partial<Word & UserWord>>) {
    this.cardsList.innerHTML = '';
    let usersWords = new Array<UserWord>();
    if (App.user) {
      usersWords = await this.bookModel.getUserWords(App.user?.userId, App.user?.token);
      console.log(allHardWords);
      allHardWords.forEach((word) => {
        const card = new CardView(<Word>word, usersWords);
        this.cardsList.append(card.view);
        card.view.addEventListener('click', BookController.setEventListenersForCard);
      });
    }
  }

  renderLevelsBtns() {
    for (let i = 0; i < numberOfLevels; i += 1) {
      const btn = BookPageView.createElementByParams('div', 'level');
      btn.classList.add(`level-${i}`);
      btn.dataset.level = `${i}`;

      if (i === this.currentLevel) {
        btn.classList.add('active');
      }

      if (i === numberOfLevels - 1) {
        btn.innerText = btnHardText;
        if (!App.user) {
          btn.style.display = 'none';
        }
      } else {
        btn.innerHTML = btnLevelText;
        const levelNumber = BookPageView.createElementByParams('span', 'level_number');
        levelNumber.innerHTML = `&nbsp${i + 1}`;
        btn.append(levelNumber);
      }

      btn.addEventListener('click', async (e): Promise<void> => this.levelBtnHandler(e));
      this.levels.append(btn);
    }
  }

  async levelBtnHandler(e: MouseEvent) {
    if (e.target) {
      const levelButtons = document.querySelectorAll('.level');
      levelButtons.forEach((button) => {
        button.classList.remove('active');
      });
      (e.target as HTMLDivElement).classList.add('active');

      const group = Number((e.target as HTMLDivElement).dataset.level);
      this.currentLevel = group;
      this.currentPage = 0;
      this.cardsList.innerHTML = '';
      this.pagination.innerHTML = '';
      if (App.user && group === 6) {
        const allHardWords = await this.bookModel.getUserWordsAllHard(
          App.user?.userId,
          App.user?.token,
        );
        this.renderHardCards(allHardWords);
      } else {
        this.renderCards(group, this.currentPage);
        this.renderPaginationBlock(group);
      }

      this.setBackgroundByAggregatedNumber(group, 0);

      saveDataToLocalStorage('aggregatedNumber', JSON.stringify(this.aggregatedNumber));
    }

    saveDataToLocalStorage(
      'pageInfo',
      JSON.stringify({
        pageName: 'bookPage',
        level: this.currentLevel,
        pageNumber: this.currentPage,
      }),
    );
  }

  static setEventListenersForCard(e: Event) {
    const eTargetClassList = (e.target as HTMLDivElement).classList;

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
    const arrOfDonePages = await this.makeArrOfDonePages(group);
    this.pagination.innerHTML = '';
    for (let i = 0; i < numberOfPagesInLevel; i += 1) {
      const page = BookPageView.createElementByParams('p', 'pagination-element');

      if (i === this.currentPage) {
        page.classList.add('active');
      }

      if (arrOfDonePages.includes(i)) {
        page.classList.add('done');
      }

      page.innerText = `${i + 1}`;
      page.addEventListener('click', (e) => this.pageBtnHandler(e, group, i));
      this.pagination.append(page);
    }
  }

  async pageBtnHandler(e: Event, group: number, page: number) {
    this.currentPage = page;
    this.renderCards(group, page);
    const pageItems = document.querySelectorAll('.pagination-element');
    pageItems.forEach((item) => {
      item.classList.remove('active');
    });
    (e.target as HTMLLIElement).classList.add('active');
    saveDataToLocalStorage(
      'pageInfo',
      JSON.stringify({
        pageName: 'bookPage',
        level: this.currentLevel,
        pageNumber: this.currentPage,
      }),
    );

    this.aggregatedNumber = await this.setBackgroundByAggregatedNumber(group, page);
    setBackgroundForBookPage(this.aggregatedNumber);
    saveDataToLocalStorage('aggregatedNumber', JSON.stringify(this.aggregatedNumber));
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

    this.gameButtons.append(audioGameLink, sprintGameLink);
  }

  getPageInfoFromLocalStorage() {
    const pageInfo = getDataFromLocalStorage('pageInfo') as IPageInfo;
    const { level, pageNumber } = pageInfo;
    if (typeof level === 'number' && typeof pageNumber === 'number') {
      this.currentLevel = level;
      this.currentPage = pageNumber;
    }
  }

  async makeArrOfDonePages(currentLevel: number) {
    const arrOfDonePages = [];
    if (App.user) {
      const aggregatedWordsAll = await this.bookModel.getUserWordsAgregatedByFilter(
        App.user.userId,
        App.user.token,
        1000,
        `{"$and":[{"group":${currentLevel}},{"$or":[{"userWord.difficulty":"hard"},{"userWord.optional.progress":100}]}]}`,
      );
      for (let i = 0; i < numberOfPagesInLevel; i += 1) {
        const numOfWords = (aggregatedWordsAll as Word[]).filter((word) => word.page === i).length;

        if (numOfWords === numberOfCardsPerPage) {
          arrOfDonePages.push(i);
        }
      }
    }
    return arrOfDonePages;
  }
}

export default BookController;
