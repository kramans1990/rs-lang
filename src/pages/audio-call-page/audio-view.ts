import './audio.css';
import './modal.css';
import Word from './Word';
import AudioQuestion from './audio-question-component';

class AudioView {
  view: HTMLDivElement;

  focusIndex = 0;

  constructor() {
    this.renderView();
  }

  renderView() {
    const div = document.createElement('div');
    div.className = 'audio-call-container';
    const buttonNewGame = document.createElement('button');
    buttonNewGame.innerText = 'Новая игра';
    buttonNewGame.id = 'new-game';
    buttonNewGame.className = 'new-game-button';

    const divButtonsContainer = document.createElement('div');
    divButtonsContainer.className = 'buttons-container';
    div.appendChild(buttonNewGame);
    for (let i = 0; i < 6; i += 1) {
      const button = document.createElement('button');
      button.className = `game-button l${i}`;
      button.value = i.toString();
      button.innerText = `Уровень ${i}`;
      divButtonsContainer.appendChild(button);
    }
    const levelSelectLabel = document.createElement('label');
    levelSelectLabel.innerText = 'Выберите уровень сложности';
    const divDifficulty = document.createElement('div');
    divDifficulty.className = 'dif-container hidden';
    divDifficulty.append(levelSelectLabel, divButtonsContainer);
    ///
    const progressBar = document.createElement('div');
    progressBar.innerHTML = '<div id="loading"  class="loading"></div>';
    progressBar.className = 'game-progress-bar hidden';
    progressBar.id = 'audio-progress-bar';

    const gameContainer = document.createElement('div');
    const statusContainer = document.createElement('div');

    const modal = this.renderResultWindow();

    gameContainer.className = 'game-container';
    gameContainer.appendChild(divDifficulty);
    gameContainer.appendChild(progressBar);
    gameContainer.appendChild(statusContainer);
    div.appendChild(gameContainer);
    div.appendChild(modal);
    this.view = div;

    buttonNewGame.tabIndex = -1;
    buttonNewGame.focus();
  }

  showGameResult(audioTests: Array<AudioQuestion>) {
    document.querySelector('.game-result')?.classList.remove('hidden');
    const correctdiv = document.querySelector('.answer-container-correct') as HTMLDivElement;
    const wrongDiv = document.querySelector('.answer-container-wrong') as HTMLDivElement;
    correctdiv.innerHTML = '';
    wrongDiv.innerHTML = '';
    const corrects = audioTests.filter((p) => p.isCorrect);
    const wrongs = audioTests.filter((p) => !p.isCorrect);
    for (let i = 0; i < wrongs.length; i += 1) {
      wrongDiv.appendChild(wrongs[i].answerView);
    }
    for (let i = 0; i < corrects.length; i += 1) {
      correctdiv.appendChild(corrects[i].answerView);
    }
  }

  renderResultWindow(): HTMLDivElement {
    const modal = document.createElement('div');
    modal.className = 'game-result hidden';
    modal.innerHTML = `<div class="modal-content">
  <span class="modal-close">&times;</span>  
    <div class="div-result-flex">
    <span>Результаты игры</Span>
     <span class="game-span-wrong">Неверные ответы:</span>
     <div class="answer-container-wrong"></div>
     <span class ="game-span-correct">Правильные ответы:</span>
     <div class="answer-container-correct"></div>
    </div>    
    <button id="play-again" class="play-again-button"> Играть еще раз </button>
   </div>`;
    return modal;
  }

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
    // let a = new Audio(audio.src);
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
    for (let i = 0; i < options.length; i += 1) {
      const t = options[i] as HTMLButtonElement;
      if (t.innerText === correctAnswer.wordTranslate) {
        t.classList.add('correct');
      }
      if (!result) {
        if (t.innerText === answer) {
          t.classList.add('wrong');
        }
      }
    }

    (this.view.querySelector('#next-question-button') as HTMLButtonElement).innerText = 'Далее';
  }

  handlePressKey(pressedKey: string) {
    const buttons = this.view.querySelectorAll('button');
    const i = buttons.length;
    if (pressedKey === 'ArrowRight' || pressedKey === 'ArrowDown') {
      const focusedbutton: Element = document.activeElement as Element;
      const name = focusedbutton.tagName;
      if (name !== 'BUTTON') {
        buttons[0].focus();
      } else {
        this.focusIndex = this.focusIndex === i - 1 ? this.focusIndex : (this.focusIndex += 1);

        buttons[this.focusIndex].focus();
      }
    }
    if (pressedKey === 'ArrowLeft' || pressedKey === 'ArrowUp') {
      const focusedbutton: Element = document.activeElement as Element;
      const name = focusedbutton.tagName;
      const buttons = this.view.querySelectorAll('button');
      const i = buttons.length;
      if (name !== 'BUTTON') {
        buttons[0].focus();
      } else {
        this.focusIndex = this.focusIndex === 0 ? (this.focusIndex = 0) : (this.focusIndex -= 1);
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
}
export default AudioView;
