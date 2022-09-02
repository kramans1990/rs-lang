/* eslint-disable import/no-cycle */
import AudioModel from './audio-model';
import AudioView from './audio-view';
import Api from '../../Api';
import { Word } from '../../types/Word';
import ApplicationContoller from '../application-controller';
import App from '../../App';
import UserWord from '../../types/userword';
import Statistic from '../../types/Statistic';

class AudioController extends ApplicationContoller {
  model: AudioModel;

  pageView: AudioView;

  api: Api = new Api();

  wordsPerPage = 20;

  countQuestions = 6;

  initialbarProgress = 3;

  pagesPerGame = 3;

  stat: Statistic = new Statistic();

  gameName = 'audiocall';

  constructor(words?: Array<Word>) {
    super();

    if (!words) {
      this.pageView = new AudioView();
      this.model = new AudioModel(this.pageView);
      this.addListeners();
      this.addKeyBoardListener();
    }
    if (words) {
      this.model.createQuiz(words, this.countQuestions);
    }
  }

  addListeners() {
    const btns = this.pageView.view.querySelectorAll('button');
    for (let i = 0; i < btns.length; i += 1) {
      btns[i].addEventListener('click', (e: MouseEvent) => {
        const target = e.currentTarget as HTMLButtonElement;
        if (target.classList.contains('game-button')) {
          this.model.gameStatus = 'Set Level';
          this.getAllWords(Number(target.value));
        }
      });
    }
    this.pageView.view.addEventListener('click', async (e) => {
      const target = e.target as HTMLElement;
      if (target.id === 'next-question-button') {
        const test = this.model.audioTests[this.model.currentQuestion];
        const userWord: UserWord = new UserWord();
        const updateWordsResult: {
          isNew: boolean;
          isCorrect: boolean;
          isLearned: boolean;
        } = await userWord.UpdateUserWords(test.correctAnswer, test.isCorrect);
        this.stat.updateStatistic(updateWordsResult, this.gameName);

        this.model.nextQuestion();
      }
      if (target.className === 'audio-icon') {
        const audio = target.firstChild as HTMLAudioElement;
        // let a = new Audio(audio.src);
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
    this.pageView.view.querySelector('#new-game')?.addEventListener('click', () => {
      this.model.gameStatus = 'Select Level';
    });
  }

  addKeyBoardListener() {
    document.addEventListener('keydown', (e) => this.keyPress(e));
  }

  keyPress(e: KeyboardEvent) {
    if (App.controller instanceof AudioController) {
      this.pageView.handlePressKey(e.key);
    }
  }

  async getAllWords(group: number): Promise<void> {
    this.pageView.showProgressBar();
    this.model.gameStatus = 'Loading';
    let progress = this.initialbarProgress;
    let words = new Array<Word>();

    let randomPages: Array<number> = new Array<number>();
    while (randomPages.length < this.pagesPerGame) {
      randomPages.push(Math.floor(Math.random() * this.pagesPerGame + 1));
      randomPages = randomPages.filter((item, index, arr) => index === arr.indexOf(item));
    }

    for (let i = 0; i <= 0; i += 1) {
      progress = (i / this.pagesPerGame) * 100;
      this.model.loadingStatus = progress;
      /* eslint-disable no-await-in-loop */
      const value: Array<Word> = await this.getwords(group, i);
      words = words.concat(value);
    }
    this.model.createQuiz(words, this.countQuestions);
  }

  /* eslint-disable @typescript-eslint/indent */
  /* eslint-disable implicit-arrow-linebreak */
  getwords = (group: number, page: number): Promise<Array<Word>> =>
    new Promise((res, rej) => {
      fetch(`${this.api.words}?group=${group}&page=${page}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((result) => {
          const words = result.json();
          res(words);
        })
        .catch((err) => {
          rej(err);
        });
    });
}
export default AudioController;
