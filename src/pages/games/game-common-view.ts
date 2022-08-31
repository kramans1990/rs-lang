/* eslint-disable import/no-cycle */
import App from '../../App';
import {
  backButtonText,
  correctResultsText,
  incorrectResultsText,
  levelext,
  levelSelectLabelText,
  newGameButtonText,
  resultsText,
} from '../../utils/constants';
import ApplicationContoller from '../application-controller';
import GamesPageController from './games-page/games-page-controller';

class GameCommonView {
  view: HTMLDivElement;

  static renderGameView(): HTMLDivElement {
    const gameBlock = document.createElement('div');
    gameBlock.className = 'game-container';
    const newGameButton = document.createElement('button');
    newGameButton.innerText = newGameButtonText;
    newGameButton.id = 'new-game';
    newGameButton.className = 'new-game-button';
    const divButtonsContainer = document.createElement('div');
    divButtonsContainer.className = 'buttons-container';
    const backButton = document.createElement('button');
    backButton.classList.add('back-button');
    backButton.innerText = backButtonText;
    backButton.addEventListener('click', (): void => {
      const controller: ApplicationContoller = new GamesPageController();
      App.setController(controller);
    });
    for (let i = 1; i < 8; i += 1) {
      const button = document.createElement('button');
      button.className = `game-button l${i}`;
      button.value = (i - 1).toString();
      button.innerText = `${levelext} ${i}`;
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
    gameBlock.append(newGameButton, backButton, gameContainer, modal);
    return gameBlock;
  }

  static createModalContent(): HTMLDivElement {
    const modalContent = document.createElement('div');
    modalContent.classList.add('modal-content');
    const modalClose = document.createElement('span');
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

  showLevelSelection() {
    (this.view.querySelector('.dif-container') as HTMLDivElement).classList.remove('hidden');
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
    const correctDiv = document.querySelector('.answer-container-correct') as HTMLDivElement;
    const wrongDiv = document.querySelector('.answer-container-wrong') as HTMLDivElement;
    correctDiv.innerHTML = '';
    wrongDiv.innerHTML = '';
  }

  updateProgressBar(loading: number) {
    const div = this.view.querySelector('.loading') as HTMLDivElement;
    div.style.width = `${loading}%`;
  }
}

export default GameCommonView;
