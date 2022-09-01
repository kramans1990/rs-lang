// import { sprintTime } from '../../../utils/constants';
import Api from '../../../Api';
// import { Word } from '../../../types/Word';
import {
  resultsText,
  incorrectResultsText,
  correctResultsText,
  levelText,
  newGameButtonText,
  levelSelectLabelText,
} from '../../../utils/constants';
import ApplicationView from '../../application-view';
import SprintQuestion from './sprint-question-component';
import './sprint.css';

class SprintView extends ApplicationView {
  isSoundOn: boolean;

  timer: HTMLDivElement;

  view: HTMLDivElement;

  focusIndex = 0;

  api: Api = new Api();

  constructor() {
    super();
    this.renderView();
  }

  // view
  renderView() {
    const div = document.createElement('div');
    div.className = 'audio-call-container';
    const buttonNewGame = document.createElement('button');
    buttonNewGame.innerText = newGameButtonText;
    buttonNewGame.id = 'new-game';
    buttonNewGame.className = 'new-game-button';
    const divButtonsContainer = document.createElement('div');
    divButtonsContainer.className = 'buttons-container';
    div.appendChild(buttonNewGame);
    for (let i = 1; i < 8; i += 1) {
      const button = document.createElement('button');
      button.className = `game-button l${i}`;
      button.value = (i - 1).toString();
      button.innerText = `${levelText} ${i}`;
      divButtonsContainer.appendChild(button);
    }
    const levelSelectLabel = document.createElement('label');
    levelSelectLabel.innerText = levelSelectLabelText;
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
    const modal = this.createModalContent();
    modal.className = 'game-result hidden';

    gameContainer.className = 'game-container';
    gameContainer.append(divDifficulty, progressBar, statusContainer);
    div.appendChild(gameContainer);
    div.appendChild(modal);
    this.view = div;
  }

  // view
  showGameResult(audioTests: Array<SprintQuestion>) {
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
      this.view.querySelector('.game-span-correct') as HTMLSpanElement
    ).innerText = `${correctResultsText} (${corrects.length}) :`;
    (
      this.view.querySelector('.game-span-wrong') as HTMLSpanElement
    ).innerText = `${incorrectResultsText} (${wrongs.length}) : `;
  }

  // renderResultWindow(): HTMLDivElement {

  // }
  // view
  showLevelSelection() {
    (this.view.querySelector('.dif-container') as HTMLDivElement).classList.remove('hidden');
  }

  // view
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

  // view
  showDifficultySelection(): void {
    (this.view.querySelector('.dif-container') as HTMLDivElement)?.classList.remove('hidden');
  }

  // view
  hideDifficultySelection() {
    (this.view.querySelector('.dif-container') as HTMLDivElement)?.classList.add('hidden');
  }

  // view
  showGame() {
    (this.view.querySelector('.div-quiz-container') as HTMLDivElement)?.classList.remove('hidden');
  }

  // view
  hideGame() {
    (this.view.querySelector('.div-quiz-container') as HTMLDivElement)?.classList.add('hidden');
  }

  // view
  hideProgressBar() {
    (this.view.querySelector('.game-progress-bar') as HTMLDivElement)?.classList.add('hidden');
  }

  // view
  showProgressBar() {
    (this.view.querySelector('.game-progress-bar') as HTMLDivElement)?.classList.remove('hidden');
  }

  // view
  showResults() {
    (this.view.querySelector('.game-result') as HTMLDivElement)?.classList.remove('hidden');
  }

  // view
  hideResults() {
    (this.view.querySelector('.game-result') as HTMLDivElement)?.classList.add('hidden');

    const correctdiv = document.querySelector('.answer-container-correct') as HTMLDivElement;
    const wrongDiv = document.querySelector('.answer-container-wrong') as HTMLDivElement;
    correctdiv.innerHTML = '';
    wrongDiv.innerHTML = '';
  }

  // view
  updateProgressBar(loading: number) {
    const div = this.view.querySelector('.loading') as HTMLDivElement;
    div.style.width = `${loading}%`;
  }

  // view
  renderAnswerResult(result: boolean, answer: string) {
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
      if (text === answer) {
        button.classList.add('correct');
      }
      if (!result) {
        if (text === answer) {
          button.classList.add('wrong');
        }
      }
    }
    window.setTimeout((): void => {
      (this.view.querySelector('.next-question-button') as HTMLButtonElement).click();
    }, 200);
  }

  // view
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

  // ctrlr
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

  // ctrlr
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
    if (key === 'arrowleft') {
      const diff = this.view.querySelectorAll('.option')[0] as HTMLButtonElement;
      diff.click();
    }
    if (key === 'arrowright') {
      const diff = this.view.querySelectorAll('.option')[1] as HTMLButtonElement;
      diff.click();
    }
    document.body.focus();
  }

  // ctrlr
  handlePressKey(key: string) {
    if (
      ['n', '1', '2', '3', '4', '5', '6', '7', 'a', 'ArrowLeft', 'ArrowRight', ' '].find(
        (p) => p === key,
      )
    ) {
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
  // view
  createModalContent(): HTMLDivElement {
    const modalContent = document.createElement('div');
    modalContent.classList.add('modal-content');
    const modalClose = document.createElement('span');
    modalClose.classList.add('modal-close');
    modalClose.innerHTML = '&times;';
    const resultsBox = document.createElement('div');
    resultsBox.classList.add('div-result-flex');
    const resilts = document.createElement('span');
    resilts.innerText = resultsText;
    const incorrectAnswers = document.createElement('span');
    incorrectAnswers.classList.add('game-span-wrong');
    incorrectAnswers.innerText = incorrectResultsText;
    const correctAnswers = document.createElement('span');
    correctAnswers.classList.add('game-span-correct');
    correctAnswers.innerText = correctResultsText;
    const incorrectAnswersContainer = document.createElement('div');
    incorrectAnswersContainer.classList.add('answer-container-wrong');
    const correctAnswersContainer = document.createElement('div');
    correctAnswersContainer.classList.add('answer-container-correct');
    resultsBox.append(
      resilts,
      incorrectAnswers,
      incorrectAnswersContainer,
      correctAnswers,
      correctAnswersContainer,
    );
    modalContent.append(modalClose, resultsBox);
    return modalContent;
  }
}
//   constructor() {
//     super();
//     this.renderSprintView();
//     this.isSoundOn = true;
//   }

//   renderSprintView() {
//     this.view = document.createElement('div');
//     this.view.classList.add('sprint');
//     document.addEventListener('keydown', (e) => console.log(e.key));
//     const gameBlock = document.createElement('div');
//     gameBlock.classList.add('sprint-block');
//     const controlsBlock = document.createElement('div');
//     controlsBlock.classList.add('sprint-controls-block');
//     const counter = document.createElement('span');
//     counter.classList.add('sprint-counter');
//     const soundButton = document.createElement('button');
//     soundButton.classList.add('sprint-sound-button');
//     controlsBlock.append(counter, soundButton);
//     const wordBlock = document.createElement('div');
//     wordBlock.classList.add('sprint-word-block');

//     const wordControlsBlock = document.createElement('div');
//     wordControlsBlock.classList.add('sprint-word-controls-block');
//     const checkers = document.createElement('div');
//     checkers.classList.add('sprint-checkers');
//     [1, 2, 3].forEach((i): void => {
//       const checker = document.createElement('div');
//       checker.className = `checker checker-${i}`;
//       checker.innerText = '✓';
//       checkers.append(checker);
//     });
//     const wordSoundButton = document.createElement('button');
//     wordSoundButton.classList.add('sprint-word-sound-button');
//     wordControlsBlock.append(checkers, wordSoundButton);
//     wordBlock.prepend(wordControlsBlock);
//     gameBlock.append(controlsBlock, wordBlock);
//     this.view.append(this.createTimer(), gameBlock);
//   }

//   createTimer(): HTMLDivElement {
//     this.timer = document.createElement('div');
//     this.timer.classList.add('sprint-timer');
//     return this.timer;
//   }
// }

export default SprintView;
