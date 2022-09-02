/* eslint-disable import/no-cycle */
import AudioQuestion from './audio-question-component';
import AudioView from './audio-view';
import { Word } from '../../types/Word';

class AudioModel {
  pageView: AudioView;

  audioTests: Array<AudioQuestion>;

  difficulty: { level: number; name: string };

  rigthAnswers: number;

  wrongAnswers: number;

  corrrectAnswers: number;

  status: string;

  currentQuestion = -1;

  loadingProgress = 0;

  constructor(pageView: AudioView) {
    this.pageView = pageView;
    this.wrongAnswers = 0;
    this.corrrectAnswers = 0;
  }

  set loadingStatus(loading: number) {
    this.loadingProgress = loading;
    this.pageView.updateProgressBar(this.loadingProgress);
  }

  set gameStatus(status: string) {
    this.status = status;

    if (this.status === 'Set Level') {
      this.pageView.hideDifficultySelection();
      this.pageView.hideGame();
      this.pageView.hideResults();
    }

    if (this.status === 'Select Level') {
      this.pageView.showLevelSelection();
      this.pageView.hideGame();
      this.pageView.hideProgressBar();
      this.pageView.hideResults();
    }

    if (this.status === 'Game') {
      this.pageView.hideDifficultySelection();
      this.pageView.showGame();
      this.pageView.hideProgressBar();
      this.pageView.hideResults();
    }
  }

  set Question(currentQuestion: number) {
    this.currentQuestion = currentQuestion;
    this.pageView.showQuestion(this.audioTests[this.currentQuestion].audioTestView);
  }

  playAgain() {
    for (let i = 0; i < this.audioTests.length; i += 1) {
      this.audioTests[i].isAnswered = null;
      this.audioTests[i].isCorrect = false;
      this.audioTests[i].options = this.audioTests[i].options.sort(() => 0.5 - Math.random());
      this.audioTests[i].renderAudioTestView();
    }
    this.audioTests = this.audioTests.sort(() => 0.5 - Math.random());
    this.Question = 0;
    this.gameStatus = 'Game';
  }

  nextQuestion() {
    this.currentQuestion += 1;
    if (this.currentQuestion === this.audioTests.length) {
      this.pageView.showGameResult(this.audioTests);
      this.pageView.hideGame();
    } else {
      this.pageView.showQuestion(this.audioTests[this.currentQuestion].audioTestView);
    }
  }

  closeResult() {
    // если авторизованы переходим на страницу учебника
    // this.audioTests = new Array<AudioQuestion>();
    this.wrongAnswers = 0;
    this.rigthAnswers = 0;
    this.pageView.hideResults();
    this.audioTests = new Array<AudioQuestion>();
    //
  }

  // сформировать список вопросов и начать игру
  createQuiz(words: Array<Word>, countQuestions: number) {
    if (words.length < 6) {
      this.gameStatus = 'Select Level';
    } else {
      const tests: Array<AudioQuestion> = new Array<AudioQuestion>();
      const count = words.length < countQuestions ? words.length : countQuestions;
      let id = 0;
      while (tests.length < count) {
        let correctAnswer = words[Math.floor(Math.random() * words.length)];
        let find: Array<AudioQuestion> = tests.filter(
          (p) => p.correctAnswer.id === correctAnswer.id,
        );
        /* eslint-disable  @typescript-eslint/no-loop-func */
        while (find.length > 0) {
          correctAnswer = words[Math.floor(Math.random() * words.length)];
          find = tests.filter((p) => p.correctAnswer.id === correctAnswer.id);
        }
        let options: Array<Word> = new Array<Word>();
        options.push(correctAnswer);
        while (options.length < 6) {
          const word = words[Math.floor(Math.random() * words.length)];
          options.push(word);
          options = options.filter((item, index, arr) => arr.indexOf(item) === index);
        }
        options = options.sort(() => 0.5 - Math.random());
        const test: AudioQuestion = new AudioQuestion(options, correctAnswer, id);
        test.renderAudioTestView();
        id += 1;
        tests.push(test);
      }
      this.audioTests = tests;
      this.Question = 0;
      this.gameStatus = 'Game';
    }
  }

  handleAnswer(answer: string) {
    const audioTest = this.audioTests[this.currentQuestion];

    if (!audioTest.isAnswered) {
      const result: boolean = audioTest.correctAnswer.wordTranslate === answer;

      audioTest.isCorrect = result;

      this.pageView.renderAnswerResult(result, answer, audioTest.correctAnswer);
    }
    audioTest.isAnswered = 'Yes';
  }
}
export default AudioModel;
