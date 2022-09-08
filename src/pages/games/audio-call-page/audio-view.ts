/* eslint-disable import/no-cycle */
import './audio.css';
import './modal.css';
import { Word } from '../../../types/Word';
import AudioQuestion from './audio-question-component';
import Api from '../../../Api';
import * as modalResult from './modal-content';
import ModalMessage from './modalMessage';
import { newAudioGameButtonText } from '../../../utils/constants';
import CardView from '../../book-page/card-view';
import UserWord from '../../../types/userword';
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
    buttonNewGame.innerText = newAudioGameButtonText;
    buttonNewGame.id = 'new-game';
    buttonNewGame.className = 'new-game-button';
    const divButtonsContainer = document.createElement('div');
    divButtonsContainer.className = 'buttons-container';
    div.appendChild(buttonNewGame);

    for (let i = 1; i < 7; i += 1) {
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
    const modalMessage = new ModalMessage('Недостаточно слов для игры');
    gameContainer.className = 'game-container';
    gameContainer.append(divDifficulty, progressBar, statusContainer);
    div.appendChild(gameContainer);
    div.appendChild(modal);
    div.appendChild(modalMessage.modal);
    this.view = div;
  }

  showGameResult(audioTests: Array<AudioQuestion>) {
    this.view.querySelector('.game-result')?.classList.remove('hidden');
    this.view.querySelector('.game-result')?.classList.add('popup');
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
    (this.view.querySelector('.modal-message') as HTMLDivElement).classList.add('hidden');
  }

  hideDifficultySelection() {
    (this.view.querySelector('.dif-container') as HTMLDivElement)?.classList.add('hidden');
    (this.view.querySelector('.modal-message') as HTMLDivElement).classList.add('hidden');
  }

  showGame() {
    (this.view.querySelector('.div-quiz-container') as HTMLDivElement)?.classList.remove('hidden');
    (this.view.querySelector('.modal-message') as HTMLDivElement).classList.add('hidden');
  }

  hideGame() {
    (this.view.querySelector('.div-quiz-container') as HTMLDivElement)?.classList.add('hidden');
    (this.view.querySelector('.modal-message') as HTMLDivElement).classList.add('hidden');
  }

  hideProgressBar() {
    (this.view.querySelector('.game-progress-bar') as HTMLDivElement)?.classList.add('hidden');
    (this.view.querySelector('.modal-message') as HTMLDivElement).classList.add('hidden');
  }

  showProgressBar() {
    (this.view.querySelector('.game-progress-bar') as HTMLDivElement)?.classList.remove('hidden');
    (this.view.querySelector('.modal-message') as HTMLDivElement).classList.add('hidden');
  }

  showResults() {
    (this.view.querySelector('.game-result') as HTMLDivElement)?.classList.remove('hidden');
    (this.view.querySelector('.modal-message') as HTMLDivElement).classList.add('hidden');
  }

  hideResults() {
    (this.view.querySelector('.game-result') as HTMLDivElement)?.classList.add('hidden');

    const correctdiv = document.querySelector('.answer-container-correct') as HTMLDivElement;
    const wrongDiv = document.querySelector('.answer-container-wrong') as HTMLDivElement;
    if (correctdiv) {
      correctdiv.innerHTML = '';
    }
    if (wrongDiv) {
      wrongDiv.innerHTML = '';
    }
  }

  updateProgressBar(loading: number) {
    const div = this.view.querySelector('.loading') as HTMLDivElement;
    div.style.width = `${loading}%`;
  }

 async renderAnswerResult(result: boolean, answer: string, correctAnswer: Word) {
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
      button.classList.add('hidden')
      
      if (text === correctAnswer.wordTranslate) {
        button.classList.add('correct');
        button.classList.remove('hidden')
      }
      else if (!result) {
        if (text === answer) {
          button.classList.add('wrong');
          button.classList.remove('hidden');
        } 
         
      }
     

    }
    const nextButton = this.view.querySelector('#next-question-button') as HTMLButtonElement;
    nextButton.innerText = 'Далее (Space)';
   await this.renderCard(correctAnswer);
   document.querySelector('.card__progress-bar')?.classList.add('hidden');    
   document.querySelector('.card__stat')?.classList.add('hidden');
   (document.querySelector('.card__buttons') as HTMLDivElement).style.marginTop = '50px';
   (document.querySelector('.word') as HTMLDivElement).style.marginBottom = '50px';
   
  }
  async renderCard(correctAnswer:Word){
   
    const words = new Array<Word>;
    words.push(correctAnswer);
    let usersWords = new Array<UserWord>();
   
    words.forEach((wordInfo: Word) => {
      const card = new CardView(wordInfo, usersWords);
     let container =  this.view.querySelector('.quesion-container') as HTMLElement;
     let audio =  this.view.querySelector('.audio-icon') as HTMLDivElement;
     audio.classList.add('hidden');
     container.insertBefore(card.view,audio);
     card.view.classList.add('popup-card');
     card.view.style.width = '270px';  
   
    
    });

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
  /* eslint-disable class-methods-use-this */

  // createModalContent(): HTMLDivElement {
  //   const modalContent = document.createElement('div');
  //   modalContent.classList.add('modal-content');
  //   const modalClose = document.createElement('span');
  //   modalClose.classList.add('modal-close');
  //   modalClose.innerHTML = '&times;';
  //   const resultsBox = document.createElement('div');
  //   resultsBox.classList.add('div-result-flex');
  //   const resilts = document.createElement('span');
  //   resilts.innerText = resultsText;
  //   const incorrectAnswers = document.createElement('span');
  //   incorrectAnswers.classList.add('game-span-wrong');
  //   incorrectAnswers.innerText = incorrectResultsText;
  //   const correctAnswers = document.createElement('span');
  //   correctAnswers.classList.add('game-span-correct');
  //   correctAnswers.innerText = correctResultsText;
  //   const incorrectAnswersContainer = document.createElement('div');
  //   incorrectAnswersContainer.classList.add('answer-container-wrong');
  //   const correctAnswersContainer = document.createElement('div');
  //   correctAnswersContainer.classList.add('answer-container-correct');
  //   resultsBox.append(
  //     resilts,
  //     incorrectAnswers,
  //     incorrectAnswersContainer,
  //     correctAnswers,
  //     correctAnswersContainer,
  //   );
  //   modalContent.append(modalClose, resultsBox);
  //   return modalContent;
  // }

  setNotEnouthWordsModal() {
    (this.view.querySelector('.modal-message') as HTMLDivElement).classList.remove('hidden');
    (this.view.querySelector('.modal-message') as HTMLDivElement).classList.add('popup');
  }
}
export default AudioView;
