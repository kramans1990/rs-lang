import AudioQuestion from './audio-question-component';
import AudioQustion from './audio-question-component';
import AudioView from './audio-view';
import Word from './Word';

class AudioModel {
  pageView: AudioView;

  audioTests: Array<AudioQustion>;

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
    // this.currentQuestion = -1;
    for (let i = 0; i < this.audioTests.length; i += 1) {
     // this.audioTests[i].isAnswered = false;
      this.audioTests[i].isCorrect = false;
      this.audioTests = this.audioTests.sort(() => 0.5 - Math.random());
      this.audioTests[i].renderAudioTestView();
    }
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
      alert('Недостаточно слов для игры');
    } else {
      const tests: Array<AudioQustion> = new Array<AudioQustion>();
      const count = words.length < countQuestions ? words.length : countQuestions;
      let id = 0;
      while (tests.length < count) {
        const correctAnswer = words[Math.floor(Math.random() * words.length)];
        let options: Array<Word> = new Array<Word>();
        options.push(correctAnswer);
        while (options.length < 6) {
          const word = words[Math.floor(Math.random() * words.length)];
          options.push(word);
          options = options.filter((item, index, arr) => arr.indexOf(item) === index);
        }
        options = options.sort(() => 0.5 - Math.random());
        const test: AudioQustion = new AudioQustion(options, correctAnswer, id);
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
   // console.log(audioTest.correctAnswer.wordTranslate , answer ,audioTest.isAnswered);
    //if (!audioTest.isAnswered) {
      const result: boolean = audioTest.correctAnswer.wordTranslate === answer;
      audioTest.isCorrect = result;
      //  this.wrongAnswers = result ? this.wrongAnswers : (this.wrongAnswers +1 );
      //  this.corrrectAnswers = result ? (this.corrrectAnswers +1) :  this.corrrectAnswers;
      this.pageView.renderAnswerResult(result, answer, audioTest.correctAnswer);
  //  }
    // else{
   // audioTest.isAnswered = true;
    // }
  }

  updateGameProgress() {
    // обновление статистики
  }
}
export default AudioModel;
