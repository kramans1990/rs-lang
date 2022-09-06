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
  NoHardWordsText,
} from '../../utils/constants';
import {
  disableAudioBtns,
  enableAudioBtns,
  getDataFromLocalStorage,
  saveDataToLocalStorage,
  setBackgroundForBookPage,
  getAggregatedNumberFromLS,
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

    this.setAggregatedNumber(this.currentLevel, this.currentPage);

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

  async setAggregatedNumber(currentLevel: number, currentPage: number) {
    if (App.user) {
      const responce = await this.bookModel.getUserWordsAgregatedByFilter(
        App.user.userId,
        App.user.token,
        1000,
        `{"$and":[{"group":${currentLevel}},{"page":${currentPage}},{"$or":[{"userWord.difficulty":"hard"},{"userWord.optional.progress":100}]}]}`,
      );
      this.aggregatedNumber = responce.length;
    }
    return this.aggregatedNumber;
  }

  async setBackgroundByAggregatedNumber(currentLevel: number, currentPage: number) {
    if (App.user) {
      this.aggregatedNumber = await this.setAggregatedNumber(currentLevel, currentPage);
      setBackgroundForBookPage(this.aggregatedNumber);
      saveDataToLocalStorage('aggregatedNumber', JSON.stringify(this.aggregatedNumber));
    } else {
      this.aggregatedNumber = 0;
    }
    saveDataToLocalStorage('aggregatedNumber', JSON.stringify(this.aggregatedNumber));
    return this.aggregatedNumber;
  }

  async setView(): Promise<void> {
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

    BookController.changeStatusOfGameButtons();
  }

  static changeStatusOfGameButtons() {
    const aggregatedNumber = getAggregatedNumberFromLS();
    const gameButtons = document.querySelector('.game__buttons');
    if (aggregatedNumber === numberOfCardsPerPage) {
      gameButtons?.classList.add('inactive');
    } else {
      gameButtons?.classList.remove('inactive');
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
        if (!allHardWords.length) {
          this.cardsList.innerHTML = NoHardWordsText;
        } else {
          this.renderHardCards(allHardWords);
          document.querySelector('.game__buttons')?.classList.remove('inactive');
        }
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
    BookController.changeStatusOfGameButtons();
  }

  async renderGameButtons() {
    const sprintGameLink = BookPageView.createElementByParams('div', 'btn') as HTMLDivElement;
    sprintGameLink.classList.add('btn_colored');
    sprintGameLink.innerText = sprintGameName;
    const iconSprint = BookPageView.createElementByParams('img', 'game-icon') as HTMLImageElement;
    iconSprint.setAttribute('src', iconSprintSrc);
    sprintGameLink.prepend(iconSprint);
    sprintGameLink.addEventListener('click', async (): Promise<void> => {
      const wordsForsprintGame = await this.getWordsForGame();
      App.renderSprintPage(wordsForsprintGame[0] as Word[]);
    });
    const audioGameLink = BookPageView.createElementByParams('div', 'btn') as HTMLDivElement;
    audioGameLink.classList.add('btn_colored');
    audioGameLink.innerText = audioGameName;
    const iconAudioGame = BookPageView.createElementByParams(
      'img',
      'game-icon',
    ) as HTMLImageElement;
    iconAudioGame.setAttribute('src', iconAudioGameSrc);
    audioGameLink.prepend(iconAudioGame);
    audioGameLink.addEventListener('click', async (): Promise<void> => {
      const wordsForAudioGame = await this.getWordsForGame('audio');
      App.renderAudiocallPage(wordsForAudioGame as Word[]);
    });

    const arrOfDonePages = await this.makeArrOfDonePages(this.currentLevel);
    if (arrOfDonePages.includes(this.currentPage)) {
      this.gameButtons.classList.add('inactive');
    }
    this.gameButtons.append(audioGameLink, sprintGameLink);
  }

  // eslint-disable-next-line max-lines-per-function, consistent-return
  async getWordsForGame(gameName?: string) {
    if (App.user && this.currentLevel === 6) {
      let arrOfHardWords = await this.makeArrOfHardWords();
      if (gameName && arrOfHardWords && arrOfHardWords.length > numberOfCardsPerPage) {
        arrOfHardWords = arrOfHardWords?.slice(0, 20);
        return arrOfHardWords;
      }
      return [arrOfHardWords] || [[]];
    }

    const { pageNumber } = getDataFromLocalStorage('pageInfo') as IPageInfo;
    if (pageNumber) {
      this.currentPage = pageNumber;
    }

    let allUserWords: UserWord[] = [];
    let allUnLearnedWordsForLevel: Word[] = [];

    const allPromises = [];
    for (let i = this.currentPage; i >= 0; i -= 1) {
      const wordsForPage = this.bookModel.getWords(this.currentLevel, i);
      allPromises.push(wordsForPage);
    }
    const responce = await Promise.all(allPromises);
    const allWordsSinceBeginTillCurrentPage: Word[] = [];
    for (let i = 0; i < responce.length; i += 1) {
      allWordsSinceBeginTillCurrentPage.push(...responce[i]);
    }

    if (App.user) {
      allUserWords = await this.bookModel.getUserWords(App.user.userId, App.user.token);
    }
    const arrOfLearnedWordsId = allUserWords
      .filter((userWord) => userWord.optional.progress === 100)
      .reduce((arrOfId, userWord) => {
        arrOfId.push(userWord.wordId);
        return arrOfId;
      }, [] as string[]);

    allUnLearnedWordsForLevel = allWordsSinceBeginTillCurrentPage.filter(
      (word) => !arrOfLearnedWordsId.includes(word.id),
    );

    if (gameName) {
      if (allUnLearnedWordsForLevel.length > numberOfCardsPerPage) {
        const arrForAudioGame = allUnLearnedWordsForLevel.slice(0, 20);
        return arrForAudioGame;
      }
      return allUnLearnedWordsForLevel;
    }

    const arrForSprintGame: Array<Word[]> = [];
    for (let i = this.currentPage; i >= 0; i -= 1) {
      const wordsForSpecialPage = allUnLearnedWordsForLevel.filter((word) => word.page === i);
      arrForSprintGame.push(wordsForSpecialPage);
    }
    return arrForSprintGame;
  }

  // eslint-disable-next-line class-methods-use-this, consistent-return
  async makeArrOfHardWords() {
    if (App.user) {
      // eslint-disable-next-line max-len
      const allHardUserWords = await this.bookModel.getUserWordsAllHard(
        App.user.userId,
        App.user.token,
      );
      const allHardWords = allHardUserWords.map((userWord) => {
        const word: Word = {
          // eslint-disable-next-line no-underscore-dangle
          id: userWord._id as string,
          group: userWord.group as number,
          page: userWord.page as number,
          word: userWord.word as string,
          image: userWord.image as string,
          audio: userWord.audio as string,
          audioMeaning: userWord.audioMeaning as string,
          audioExample: userWord.audioExample as string,
          textMeaning: userWord.textMeaning as string,
          textExample: userWord.textExample as string,
          transcription: userWord.transcription as string,
          wordTranslate: userWord.wordTranslate as string,
          textMeaningTranslate: userWord.textMeaningTranslate as string,
          textExampleTranslate: userWord.textExampleTranslate as string,
        };
        return word;
      });
      return allHardWords;
    }
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
