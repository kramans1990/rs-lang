/* eslint-disable import/no-cycle */
import App from '../../../App';
import UserWord from '../../../types/userword';
import { Word } from '../../../types/Word';
// import { sprintTime } from '../../../utils/constants';
import ApplicationContoller from '../../application-controller';
import SprintModel from './sprint-model';
// import SprintQuestion from './sprint-question-component';
import SprintView from './sprint-view';
import Statistic from '../../../types/Statistic';

class SprintController extends ApplicationContoller {
  model: SprintModel;

  pageView: SprintView;

  wordsPerPage = 20;

  initialbarProgress = 3;

  pagesPerGame = 9;

  stat: Statistic = new Statistic();

  constructor(words?: Array<Word[]>) {
    super('sprint');
    this.updateRefreshToken();

    this.pageView = new SprintView();
    this.model = new SprintModel(this.pageView);
    if (!words) {
      this.addListeners();
      this.addKeyBoardListeners();
    }
    if (words) {
      this.pageView = new SprintView();
      this.model = new SprintModel(this.pageView);
      this.addListeners();
      this.addKeyBoardListeners();
      this.model.createQuiz(words);
    }
  }

  addListeners() {
    const btns = this.pageView.view.querySelectorAll('button');
    for (let i = 0; i < btns.length; i += 1) {
      btns[i].addEventListener('click', async (e: MouseEvent): Promise<void> => {
        const target = e.currentTarget as HTMLButtonElement;
        if (target.classList.contains('game-button')) {
          this.model.gameStatus = 'Set Level';
          const words = await this.getAllWords(Number(target.value));
          const wordsWrapper: Word[][] = [];
          wordsWrapper.push(words);
          this.model.createQuiz(wordsWrapper);
        }
      });
    }
    this.pageView.view.addEventListener('click', async (e: MouseEvent): Promise<void> => {
      const target = e.target as HTMLElement;
      if (target.id === 'next-question-button') {
        // обновить userwords и статистику
        const test = this.model.audioTests[this.model.currentQuestion];
        const userWord: UserWord = new UserWord();
        const updateWordsResult: {
          isNew: boolean;
          isCorrect: boolean;
          isLearned: boolean;
        } = await userWord.UpdateUserWords(test.correctAnswer, test.isCorrect);

        this.stat.updateStatistic(updateWordsResult, 'sprint');
        this.model.nextQuestion();
      }
      if (target.className === 'audio-icon') {
        const audio = target.firstChild as HTMLAudioElement;
        audio.play();
      }
      if (target.id === 'play-again') {
        this.model.playAgain();
      }
      if (target.className === 'game-button option') {
        this.model.handleAnswer((target.querySelector('.span-value') as HTMLSpanElement).innerText);
      }
      if (target.className === 'modal-close') {
        this.model.closeResult();
      }
    });
    this.pageView.view.querySelector('.new-game-button')?.addEventListener('click', (): void => {
      this.model.gameStatus = 'Select Level';
    });
  }

  addKeyBoardListeners() {
    document.addEventListener('keydown', (e): void => this.keyPress(e));
  }

  keyPress(e: KeyboardEvent) {
    if (App.controller instanceof SprintController) {
      this.pageView.handlePressKey(e.key);
    }
  }

  async getAllWords(group: number): Promise<Array<Word>> {
    this.pageView.showProgressBar();
    this.model.gameStatus = 'Loading';
    let progress = this.initialbarProgress;
    let words = new Array<Word>();
    let randomPages: Array<number> = new Array<number>();
    while (randomPages.length < this.pagesPerGame) {
      randomPages.push(Math.floor(Math.random() * this.pagesPerGame + 1));
      randomPages = randomPages.filter((item, index, arr) => index === arr.indexOf(item));
    }
    for (let i = 0; i <= this.pagesPerGame; i += 1) {
      progress = (i / this.pagesPerGame) * 100;
      this.model.loadingStatus = progress;
      /* eslint-disable no-await-in-loop */
      const value: Array<Word> = await this.getWords(group, i);
      words = words.concat(value);
    }
    return words;
  }

  /* eslint-disable @typescript-eslint/indent */
  getWords(group: number, page: number): Promise<Array<Word>> {
    return new Promise((res, rej) => {
      fetch(`${this.api.words}?group=${group}&page=${page}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((result: Response): void => {
          const words = result.json() as Promise<Array<Word>>;
          res(words);
        })
        .catch((err: Error): void => {
          rej(err);
        });
    });
  }
}

export default SprintController;
