/* eslint-disable import/no-cycle */
import AudioModel from './audio-model';
import AudioView from './audio-view';
import Api from '../../Api';
import { Word } from '../../types/Word';
import ApplicationContoller from '../application-controller';
import App from '../../App';
import UserWord from '../../types/userword';
// import User from '../../types/User';
import AudioQuestion from './audio-question-component';

class AudioController extends ApplicationContoller {
  model: AudioModel;

  pageView: AudioView;

  api: Api = new Api();

  wordsPerPage = 20;

  countQuestions = 20;

  initialbarProgress = 3;

  pagesPerGame = 3;

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
    this.pageView.view.addEventListener('click', (e) => {
      const target = e.target as HTMLElement;
      // if (target.className === 'game-button option') {
      //   this.model.updateGameProgress();//обновление статистики
      // }
      if (target.id === 'next-question-button') {
        this.UpdateUserWords(this.model.audioTests[this.model.currentQuestion]);
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

    for (let i = 0; i <= this.pagesPerGame; i += 1) {
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

  async UpdateUserWords(test: AudioQuestion) {
    let userWords: Array<UserWord> = new Array<UserWord>();
    if (App.user?.userId) {
      const value: Array<UserWord> = await this.api.getUserWords(App.user.userId, App.user.token);
      userWords = value;
      const find = userWords.filter((item) => item.wordId === test.correctAnswer.id);

      if (find.length === 0) {
        let progress = 0;
        progress = test.isCorrect ? (progress = 20) : 0;
        const difficulty = 'no-hard';
        const successfulAttempts = test.isCorrect ? 1 : 0;
        const unsuccessfulAttempts = test.isCorrect ? 0 : 1;
        const userWord: UserWord = new UserWord(
          test.correctAnswer,
          difficulty,
          progress,
          successfulAttempts,
          unsuccessfulAttempts,
        );

        this.api.createUserWord(App.user.userId, App.user.token, userWord);
      } else {
        const word = find[0];
        let { progress } = word.optional;
        progress = test.isCorrect ? (progress += 20) : (progress -= 20);
        progress = progress >= 100 ? 100 : progress;
        progress = progress <= 0 ? 0 : progress;
        const difficulty = progress === 100 ? 'no-hard' : find[0].difficulty;
        if (test.isCorrect) {
          word.optional.successfulAttempts += 1;
        }
        if (!test.isCorrect) {
          word.optional.unsuccessfulAttempts += 1;
        }
        const { successfulAttempts } = word.optional;
        const { unsuccessfulAttempts } = word.optional;
        const userWord: UserWord = new UserWord(
          test.correctAnswer,
          difficulty,
          progress,
          successfulAttempts,
          unsuccessfulAttempts,
        );
        userWord.word = test.correctAnswer;
        userWord.wordId = word.wordId;
        this.api.updateUserWord(App.user.userId, App.user.token, userWord);
      }
    }
  }
}
export default AudioController;
