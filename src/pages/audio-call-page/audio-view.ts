/* eslint-disable import/no-cycle */
import './audio.css';
import './modal.css';
import { Word } from '../../types/Word';
import AudioQuestion from './audio-question-component';
import Api from '../../Api';
import * as modalResult from './modal-content';

class AudioView {
  view: HTMLDivElement;

  focusIndex = 0;

  api: Api = new Api();

  constructor() {
    this.renderView();
  }

  renderView() {
    const div = document.createElement('div');
    div.className = 'audio-call-container';
    const buttonNewGame = document.createElement('button');
    buttonNewGame.innerText = 'Новая игра (N)';
    buttonNewGame.id = 'new-game';
    buttonNewGame.className = 'new-game-button';
    const divButtonsContainer = document.createElement('div');
    divButtonsContainer.className = 'buttons-container';
    div.appendChild(buttonNewGame);
    for (let i = 1; i < 8; i += 1) {
      const button = document.createElement('button');
      button.className = `game-button l${i}`;
      button.value = (i - 1).toString();
      button.innerText = `Уровень ${i}`;
      divButtonsContainer.appendChild(button);
    }
    const levelSelectLabel = document.createElement('label');
    levelSelectLabel.innerText = 'Выберите уровень сложности';
    const divDifficulty = document.createElement('div');
    divDifficulty.className = 'dif-container hidden';
    divDifficulty.append(levelSelectLabel, divButtonsContainer);
    const progressBar = document.createElement('div');
    // progressBar.innerHTML = '<div id="loading"  class="loading"></div>';
    const innerdiv = document.createElement('div');
    innerdiv.className = 'loading';
    progressBar.className = 'game-progress-bar hidden';
    progressBar.id = 'audio-progress-bar';
    progressBar.appendChild(innerdiv);
    const gameContainer = document.createElement('div');
    const statusContainer = document.createElement('div');
    const modal = document.createElement('div');
    modal.className = 'game-result hidden';
    modal.innerHTML = modalResult.modalHtml;

    gameContainer.className = 'game-container';
    gameContainer.append(divDifficulty, progressBar, statusContainer);
    div.appendChild(gameContainer);
    div.appendChild(modal);
    this.view = div;
  }

  showGameResult(audioTests: Array<AudioQuestion>) {
    this.view.querySelector('.game-result')?.classList.remove('hidden');
    const correctdiv = document.querySelector('.answer-container-correct') as HTMLDivElement;
    const wrongDiv = document.querySelector('.answer-container-wrong') as HTMLDivElement;
    correctdiv.innerHTML = '';
    wrongDiv.innerHTML = '';
    const corrects = audioTests.filter((p) => p.isCorrect);
    const wrongs = audioTests.filter((p) => !p.isCorrect);
    for (let i = 0; i < wrongs.length; i += 1) {
      const divResult = document.createElement('div');
      const divaudioresult = document.createElement('div');
      divaudioresult.className = 'audio-icon';
      const audioresult: HTMLAudioElement = document.createElement('audio');
      audioresult.src = `${this.api.baseUrl}/${wrongs[i].correctAnswer.audio}`;
      divaudioresult.appendChild(audioresult);
      const word: HTMLSpanElement = document.createElement('span');
      const wordTranslation: HTMLSpanElement = document.createElement('span');
      const dash: HTMLSpanElement = document.createElement('span');
      dash.innerText = '—';
      word.innerText = wrongs[i].correctAnswer.word;
      wordTranslation.innerText = wrongs[i].correctAnswer.wordTranslate;
      divResult.append(divaudioresult, word, dash, wordTranslation);
      wrongDiv.appendChild(divResult);
    }
    for (let i = 0; i < corrects.length; i += 1) {
      const divResult = document.createElement('div');
      const divaudioresult = document.createElement('div');
      divaudioresult.className = 'audio-icon';
      const audioresult: HTMLAudioElement = document.createElement('audio');
      audioresult.src = `${this.api.baseUrl}/${corrects[i].correctAnswer.audio}`;
      divaudioresult.appendChild(audioresult);
      const word: HTMLSpanElement = document.createElement('span');
      const wordTranslation: HTMLSpanElement = document.createElement('span');
      const dash: HTMLSpanElement = document.createElement('span');
      dash.innerText = '—';
      word.innerText = corrects[i].correctAnswer.word;
      wordTranslation.innerText = corrects[i].correctAnswer.wordTranslate;
      divResult.append(divaudioresult, word, dash, wordTranslation);
      correctdiv.appendChild(divResult);
    }

    (
      this.view.querySelector('.game-span-wrong') as HTMLSpanElement
    ).innerText = `Неверные ответы (${wrongs.length}) : `;
    (
      this.view.querySelector('.game-span-correct') as HTMLSpanElement
    ).innerText = `Верные ответы (${corrects.length}) :`;
  }

  // renderResultWindow(): HTMLDivElement {

  // }

  showLevelSelection() {
    (this.view.querySelector('.dif-container') as HTMLDivElement).classList.remove('hidden');
  }

  showQuestion(audioTestView: HTMLDivElement): void {
    const qustionContainer = this.view.querySelector('.div-quiz-container');

    if (qustionContainer) {
      qustionContainer.innerHTML = audioTestView.innerHTML;
    } else {
      this.view.appendChild(audioTestView);
    }
    const divPlay = document.querySelector('.audio-icon');

    const audio = divPlay?.firstChild as HTMLAudioElement;

    audio.play();
  }

  showDifficultySelection(): void {
    (this.view.querySelector('.dif-container') as HTMLDivElement)?.classList.remove('hidden');
  }

  hideDifficultySelection() {
    (this.view.querySelector('.dif-container') as HTMLDivElement)?.classList.add('hidden');
  }

  showGame() {
    (this.view.querySelector('.div-quiz-container') as HTMLDivElement)?.classList.remove('hidden');
  }

  hideGame() {
    (this.view.querySelector('.div-quiz-container') as HTMLDivElement)?.classList.add('hidden');
  }

  hideProgressBar() {
    (this.view.querySelector('.game-progress-bar') as HTMLDivElement)?.classList.add('hidden');
  }

  showProgressBar() {
    (this.view.querySelector('.game-progress-bar') as HTMLDivElement)?.classList.remove('hidden');
  }

  showResults() {
    (this.view.querySelector('.game-result') as HTMLDivElement)?.classList.remove('hidden');
  }

  hideResults() {
    (this.view.querySelector('.game-result') as HTMLDivElement)?.classList.add('hidden');

    const correctdiv = document.querySelector('.answer-container-correct') as HTMLDivElement;
    const wrongDiv = document.querySelector('.answer-container-wrong') as HTMLDivElement;
    correctdiv.innerHTML = '';
    wrongDiv.innerHTML = '';
  }

  updateProgressBar(loading: number) {
    const div = this.view.querySelector('.loading') as HTMLDivElement;
    div.style.width = `${loading}%`;
  }

  renderAnswerResult(result: boolean, answer: string, correctAnswer: Word) {
    const options = this.view.querySelectorAll('.option');
    if (result) {
      const audio = new Audio('../../assets/answer-correct.wav');
      audio.play();
    } else {
      const audio = new Audio('../../assets/answer-wrong.wav');
      audio.play();
    }
    for (let i = 0; i < options.length; i += 1) {
      const button = options[i] as HTMLButtonElement;
      const text = (button.querySelector('.span-value') as HTMLSpanElement).innerText;
      if (text === correctAnswer.wordTranslate) {
        button.classList.add('correct');
      }
      if (!result) {
        if (text === answer) {
          button.classList.add('wrong');
        }
      }
    }
    const nextButton = this.view.querySelector('#next-question-button') as HTMLButtonElement;
    nextButton.innerText = 'Далее (Space)';
  }

  handleNavKeys(pressedKey: string) {
    this.handleKeysLevel(pressedKey);
    const buttons = this.view.querySelectorAll('button');
    const i = buttons.length;
    if (pressedKey === 'ArrowRight' || pressedKey === 'ArrowDown') {
      const focusedbutton: Element = document.activeElement as Element;
      const name = focusedbutton.tagName;
      if (name !== 'BUTTON') {
        (buttons[0] as HTMLButtonElement).focus();
      } else {
        this.focusIndex = this.focusIndex === i - 1 ? this.focusIndex : (this.focusIndex += 1);

        const dif = this.view.querySelector('.game-container')?.firstChild as HTMLDivElement;
        if (dif?.className === 'dif-container hidden') {
          while (buttons[this.focusIndex - 1].className.includes('game-button l')) {
            this.focusIndex += 1;
          }
        }
        (buttons[this.focusIndex] as HTMLButtonElement).focus();
      }
    }
    if (pressedKey === 'ArrowLeft' || pressedKey === 'ArrowUp') {
      const focusedbutton: Element = document.activeElement as Element;
      const name = focusedbutton.tagName;

      if (name !== 'BUTTON') {
        buttons[0].focus();
      } else {
        this.focusIndex = this.focusIndex === 0 ? (this.focusIndex = 0) : (this.focusIndex -= 1);
        const dif = this.view.querySelector('.game-container')?.firstChild as HTMLDivElement;
        if (dif?.className === 'dif-container hidden') {
          while (buttons[this.focusIndex].className.includes('game-button l')) {
            this.focusIndex -= 1;
          }
        }
        (buttons[this.focusIndex] as HTMLButtonElement).focus();
        buttons[this.focusIndex].focus();
      }
    }
    if (pressedKey === 'Enter') {
      const focusedbutton: Element = document.activeElement as Element;
      const name = focusedbutton.tagName;
      if (name === 'button') {
        (focusedbutton as HTMLButtonElement).click();
      }
    }
  }

  handleKeysLevel(pressedKey: string) {
    const key = pressedKey.toLowerCase();

    if (key === 'n') {
      const newGame = this.view.querySelector('.new-game-button') as HTMLButtonElement;
      newGame.click();
    }
    if (key === 'a') {
      const playGame = this.view.querySelector('.play-again-button') as HTMLButtonElement;
      playGame.click();
    }
    if (Number(key) > 0 && Number(key) <= 7) {
      const diff = this.view.querySelector(`.l${key}`) as HTMLButtonElement;
      diff.click();
    }
    document.body.focus();
  }

  handleKeysOption(pressedKey: string) {
    const key = pressedKey.toLowerCase();

    if (key === 'n') {
      const newGame = this.view.querySelector('.new-game-button') as HTMLButtonElement;
      newGame.click();
    }
    if (key === 'a') {
      const playGame = this.view.querySelector('.play-again-button') as HTMLButtonElement;
      playGame.click();
    }
    if (Number(key) > 0 && Number(key) < 7) {
      const diff = this.view.querySelectorAll('.option')[Number(key) - 1] as HTMLButtonElement;
      diff.click();
    }
    if (key === ' ') {
      (this.view.querySelector('.next-question-button') as HTMLButtonElement).click();
    }
    document.body.focus();
  }

  handlePressKey(key: string) {
    if (['n', '1', '2', '3', '4', '5', '6', '7', 'a', ' '].find((p) => p === key)) {
      const dif = this.view.querySelector('.dif-container');
      if (dif?.className === 'dif-container') {
        this.handleKeysLevel(key);
      } else {
        this.handleKeysOption(key);
      }
      document.body.focus();
    } else {
      this.handleNavKeys(key);
    }
  }
}
export default AudioView;
