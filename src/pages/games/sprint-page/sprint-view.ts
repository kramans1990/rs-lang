// import { sprintTime } from '../../../utils/constants';
import ApplicationView from '../../application-view';
import './sprint.css';

class SprintView extends ApplicationView {
  isSoundOn: boolean;

  timer: HTMLDivElement;

  constructor() {
    super();
    this.renderSprintView();
    this.isSoundOn = true;
  }

  renderSprintView() {
    this.view = document.createElement('div');
    this.view.classList.add('sprint');
    document.addEventListener('keydown', (e) => console.log(e.key));
    const gameBlock = document.createElement('div');
    gameBlock.classList.add('sprint-block');
    const controlsBlock = document.createElement('div');
    controlsBlock.classList.add('sprint-controls-block');
    const counter = document.createElement('span');
    counter.classList.add('sprint-counter');
    const soundButton = document.createElement('button');
    soundButton.classList.add('sprint-sound-button');
    controlsBlock.append(counter, soundButton);
    const wordBlock = document.createElement('div');
    wordBlock.classList.add('sprint-word-block');

    const wordControlsBlock = document.createElement('div');
    wordControlsBlock.classList.add('sprint-word-controls-block');
    const checkers = document.createElement('div');
    checkers.classList.add('sprint-checkers');
    [1, 2, 3].forEach((i): void => {
      const checker = document.createElement('div');
      checker.className = `checker checker-${i}`;
      checker.innerText = '✓';
      checkers.append(checker);
    });
    const wordSoundButton = document.createElement('button');
    wordSoundButton.classList.add('sprint-word-sound-button');
    wordControlsBlock.append(checkers, wordSoundButton);
    wordBlock.prepend(wordControlsBlock);
    gameBlock.append(controlsBlock, wordBlock);
    this.view.append(this.createTimer(), gameBlock);
  }

  createTimer(): HTMLDivElement {
    this.timer = document.createElement('div');
    this.timer.classList.add('sprint-timer');
    return this.timer;
  }
}

export default SprintView;
