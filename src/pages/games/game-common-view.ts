/* eslint-disable import/no-cycle */
import { correctResultsText, incorrectResultsText, resultsText } from '../../utils/constants';

class GameCommonView {
  view: HTMLDivElement;

  static createModalContent(): HTMLDivElement {
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

  static createTimer(): HTMLDivElement {
    const timer = document.createElement('div');
    timer.classList.add('sprint-timer', 'hidden');
    return timer;
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
