import Word from './Word';
import Api from '../../Api';

class AudioQuestion {
  options: Array<Word>;

  correctAnswer: Word;

  audioTestView: HTMLDivElement;

  totalQuetions: number;

  isCorrect = false;

  //isAnswered = false;

  id: number;

  api: Api = new Api();

  answerView: HTMLDivElement;

  audioAnswer: HTMLDivElement;

  constructor(options: Array<Word>, correctAnswer: Word, id: number) {
    this.audioTestView = document.createElement('div');
    this.options = options;
    this.id = id;
    this.correctAnswer = correctAnswer;
    this.answerView = this.renderAnswerView(correctAnswer);
    this.renderAudioTestView();
  }

  renderAnswerView(correctAnswer: Word): HTMLDivElement {
    const divAnswer = document.createElement('div');
    const divaudio = document.createElement('div');
    divaudio.className = 'audio-icon';
    divaudio.setAttribute('audio', `${this.api.baseUrl}/${correctAnswer.audio}`);
    const audio: HTMLAudioElement = document.createElement('audio');
    audio.src = `${this.api.baseUrl}/${correctAnswer.audio}`;
    divaudio.appendChild(audio);

    const divaudioresult = document.createElement('div');
    divaudioresult.className = 'audio-icon';
    const audioresult: HTMLAudioElement = document.createElement('audio');
   // audioresult.src = `${this.api.baseUrl}/${correctAnswer.audio}`;
    divaudioresult.appendChild(audioresult);

    const word: HTMLSpanElement = document.createElement('span');
    const wordTranslation: HTMLSpanElement = document.createElement('span');
    const dash: HTMLSpanElement = document.createElement('span');
    dash.innerText = '—';
    word.innerText = correctAnswer.word;
    wordTranslation.innerText = correctAnswer.wordTranslate;
    divAnswer.append(divaudioresult, word, dash, wordTranslation);
    this.audioAnswer = divaudio;
    return divAnswer;
  }

  renderAudioTestView() {
    const divQuizContainer = document.createElement('div');
    divQuizContainer.className = 'div-quiz-container';
    divQuizContainer.id = this.id.toString();
    // const label = document.createElement('label');
    const divPlay = this.audioAnswer;

    const quesionContainer = document.createElement('div');
    quesionContainer.className = 'quesion-container';

    const nextButton = document.createElement('button');
    nextButton.innerText = 'Пропустить';
    nextButton.id = 'next-question-button';
    nextButton.className = 'next-question-button';
    quesionContainer.appendChild(divPlay);
    divQuizContainer.appendChild(quesionContainer);

    for (let i = 0; i < this.options.length; i += 1) {
      const button = document.createElement('button');
      button.className = 'game-button option';
      button.textContent = this.options[i].wordTranslate;
      quesionContainer.append(button);
    }
    quesionContainer.appendChild(nextButton);

    this.audioTestView = divQuizContainer;
  }
}
export default AudioQuestion;
