/* eslint-disable import/no-cycle */
import Api from '../../../Api';
import {
  incorrectResultsText,
  correctResultsText,
  levelText,
  newSprintGameButtonText,
  levelSelectLabelText,
  sprintTime,
} from '../../../utils/constants';
import ApplicationView from '../../application-view';
import GameCommonView from '../game-common-view';
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
    buttonNewGame.innerText = newSprintGameButtonText;
    buttonNewGame.id = 'new-game';
    buttonNewGame.className = 'new-game-button';
    const divButtonsContainer = document.createElement('div');
    divButtonsContainer.className = 'buttons-container';
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
    const innerdiv = document.createElement('div');
    innerdiv.className = 'loading';
    progressBar.className = 'game-progress-bar hidden';
    progressBar.id = 'audio-progress-bar';
    progressBar.appendChild(innerdiv);
    const gameContainer = document.createElement('div');
    const statusContainer = document.createElement('div');
    const modal = GameCommonView.createModalContent();
    modal.className = 'game-result hidden';
    gameContainer.className = 'game-container';
    gameContainer.append(divDifficulty, progressBar, statusContainer);
    this.timer = GameCommonView.createTimer();
    div.append(buttonNewGame, this.timer, gameContainer, modal);
    this.view = div;
  }

  // view
  showGameResult(audioTests: Array<SprintQuestion>) {
    this.showResults();
    const correctdiv = document.querySelector('.answer-container-correct') as HTMLDivElement;
    const wrongDiv = document.querySelector('.answer-container-wrong') as HTMLDivElement;
    correctdiv.innerHTML = '';
    wrongDiv.innerHTML = '';
    const corrects = audioTests.filter(
      (p: SprintQuestion): boolean => p.isCorrect && !!p.isAnswered,
    );
    const wrongs = audioTests.filter(
      (p: SprintQuestion): boolean => !p.isCorrect && !!p.isAnswered,
    );
    for (let i = 0; i < wrongs.length; i += 1) {
      const divResult = document.createElement('div');
      const audioResultBox = document.createElement('div');
      audioResultBox.className = 'audio-icon';
      const audioResult: HTMLAudioElement = document.createElement('audio');
      audioResult.src = `${this.api.baseUrl}/${wrongs[i].correctAnswer.audio}`;
      audioResultBox.appendChild(audioResult);
      const word: HTMLSpanElement = document.createElement('span');
      const wordTranslation: HTMLSpanElement = document.createElement('span');
      const dash: HTMLSpanElement = document.createElement('span');
      dash.innerText = '—';
      word.innerText = wrongs[i].correctAnswer.word;
      wordTranslation.innerText = wrongs[i].correctAnswer.wordTranslate;
      divResult.append(audioResultBox, word, dash, wordTranslation);
      wrongDiv.appendChild(divResult);
    }
    for (let i = 0; i < corrects.length; i += 1) {
      const divResult = document.createElement('div');
      const audioResultBox = document.createElement('div');
      audioResultBox.className = 'audio-icon';
      const audioResult: HTMLAudioElement = document.createElement('audio');
      audioResult.src = `${this.api.baseUrl}/${corrects[i].correctAnswer.audio}`;
      audioResultBox.appendChild(audioResult);
      const word: HTMLSpanElement = document.createElement('span');
      const wordTranslation: HTMLSpanElement = document.createElement('span');
      const dash: HTMLSpanElement = document.createElement('span');
      dash.innerText = '—';
      word.innerText = corrects[i].correctAnswer.word;
      wordTranslation.innerText = corrects[i].correctAnswer.wordTranslate;
      divResult.append(audioResultBox, word, dash, wordTranslation);
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
    const questionContainer = this.view.querySelector('.div-quiz-container');
    if (questionContainer) {
      questionContainer.innerHTML = audioTestView.innerHTML;
    } else {
      this.view.appendChild(audioTestView);
    }
    const divPlay = document.querySelector('.audio-icon');
    const audio = divPlay?.firstChild as HTMLAudioElement;
    audio.play();
  }

  showTimer() {
    this.timer.innerText = `${sprintTime}`;
    this.timer.classList.remove('hidden');
    this.timer.classList.remove('hidden');
    let gameTime = 0;
    let isResultsShown = false;
    window.setInterval((): void => {
      if (gameTime <= sprintTime) {
        this.timer.innerText = `${sprintTime - gameTime}`;
        gameTime += 1;
      }
      if (this.timer.innerText === '0' && !isResultsShown) {
        const nextQuestionButton = this.view.querySelector(
          '.next-question-button',
        ) as HTMLButtonElement;
        nextQuestionButton.click();
        this.hideTimer();
        isResultsShown = true;
      }
    }, 1000);
  }

  hideTimer() {
    this.timer.classList.add('hidden');
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
    this.showTimer();
    (this.view.querySelector('.div-quiz-container') as HTMLDivElement)?.classList.remove('hidden');
  }

  // view
  hideGame() {
    this.timer.classList.add('hidden');
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
// }

export default SprintView;
