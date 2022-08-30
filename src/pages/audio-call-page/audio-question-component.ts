/* eslint-disable import/no-cycle */
import { Word } from '../../types/Word';
import Api from '../../Api';

class AudioQuestion {
  options: Array<Word>;

  correctAnswer: Word;

  audioTestView: HTMLDivElement;

  totalQuetions: number;

  isCorrect = false;

  isAnswered: string | null;

  id: number;

  api: Api = new Api();

  answerView: HTMLDivElement;

  audioAnswer: HTMLDivElement;

  constructor(options: Array<Word>, correctAnswer: Word, id: number) {
    this.audioTestView = document.createElement('div');
    this.isAnswered = null;
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
    nextButton.innerText = 'Пропустить (Space)';
    nextButton.id = 'next-question-button';
    nextButton.className = 'next-question-button';
    quesionContainer.appendChild(divPlay);
    divQuizContainer.appendChild(quesionContainer);

    for (let i = 0; i < this.options.length; i += 1) {
      const button = document.createElement('button');
      button.className = 'game-button option';
      // button.textContent = this.options[i].wordTranslate;

      const divOptiongrid = document.createElement('div');
      divOptiongrid.className = 'div-option-grid';
      const spanNumber = document.createElement('span');
      spanNumber.textContent = (i + 1).toString();
      const spanValue = document.createElement('span');
      spanValue.className = 'span-value';
      spanValue.textContent = this.options[i].wordTranslate;

      divOptiongrid.append(spanNumber, spanValue);
      button.appendChild(divOptiongrid);

      quesionContainer.append(button);
    }
    quesionContainer.appendChild(nextButton);

    this.audioTestView = divQuizContainer;
  }
}
export default AudioQuestion;
