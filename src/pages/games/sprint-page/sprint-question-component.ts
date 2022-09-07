/* eslint-disable import/no-cycle */
import { Word } from '../../../types/Word';
import Api from '../../../Api';
import {
  arrowLeft,
  arrowRight,
  correctText,
  incorrectText,
  skipText,
} from '../../../utils/constants';

class SprintQuestion {
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

  originalWord: HTMLParagraphElement;

  variation: HTMLParagraphElement;

  constructor(options: Array<Word>, correctAnswer: Word) {
    this.audioTestView = document.createElement('div');
    this.isAnswered = null;
    this.options = options;
    this.correctAnswer = correctAnswer;
    this.answerView = this.renderAnswerView(correctAnswer);
    this.renderAudioTestView();
  }

  renderAnswerView(correctAnswer: Word): HTMLDivElement {
    const divAnswer = document.createElement('div');
    const audioBox = document.createElement('div');
    audioBox.className = 'audio-icon';
    audioBox.setAttribute('audio', `${this.api.baseUrl}/${correctAnswer.audio}`);
    const audio = document.createElement('audio');
    audio.src = `${this.api.baseUrl}/${correctAnswer.audio}`;
    audioBox.append(audio);
    this.audioAnswer = audioBox;
    const originalWord = document.createElement('p');
    originalWord.classList.add('word', 'sprint-original-word');
    originalWord.innerText = correctAnswer.word;
    this.originalWord = originalWord;
    return divAnswer;
  }

  renderAudioTestView() {
    const quizContainer = document.createElement('div');
    quizContainer.className = 'div-quiz-container';
    const divPlay = this.audioAnswer;
    const questionContainer = document.createElement('div');
    questionContainer.className = 'sprint-question-container';
    const nextButton = document.createElement('button');
    nextButton.innerText = skipText;
    nextButton.id = 'next-question-button';
    nextButton.className = 'next-question-button';
    questionContainer.append(divPlay, this.originalWord);
    quizContainer.append(questionContainer);
    const answersBox = document.createElement('div');
    answersBox.classList.add('answers-box');
    this.variation = document.createElement('p');
    this.variation.classList.add('word', 'sprint-variation-word');
    const variation = this.options[Math.floor(Math.random() * this.options.length)].wordTranslate;
    this.variation.innerText = variation;
    for (let i = 0; i < this.options.length; i += 1) {
      const button = document.createElement('button');
      button.className = 'game-button option';
      // button.textContent = this.options[i].wordTranslate;
      const divOptionGrid = document.createElement('div');
      divOptionGrid.className = 'div-option-grid';
      const spanValue = document.createElement('span');
      spanValue.className = 'span-value';
      // spanValue.textContent = this.options[i].wordTranslate;
      const arrow = document.createElement('span');
      if (i) {
        arrow.textContent = arrowRight;
        spanValue.innerText = correctText;
        divOptionGrid.classList.add('right');
        divOptionGrid.append(spanValue, arrow);
      } else {
        arrow.textContent = arrowLeft;
        spanValue.innerText = incorrectText;
        divOptionGrid.append(arrow, spanValue);
      }
      button.append(divOptionGrid);

      answersBox.append(button);
    }
    questionContainer.append(this.variation, answersBox, nextButton);

    this.audioTestView = quizContainer;
  }
}
export default SprintQuestion;
