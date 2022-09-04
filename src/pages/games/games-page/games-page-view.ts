/* eslint-disable import/no-cycle */
// import ApplicationContoller from '../../application-controller';
import AudioController from '../audio-call-page/audio-call-controller';
import SprintController from '../sprint-page/sprint-controller';
import { audioGameName, sprintGameName } from '../../../utils/constants';
import App from '../../../App';

class GamePageView {
  view: HTMLDivElement;

  constructor() {
    this.renderView();
  }

  renderView() {
    this.view = document.createElement('div');
    this.view.classList.add('games-block');
    const audioCallButton = document.createElement('button');
    audioCallButton.classList.add('audio-call-button');
    audioCallButton.innerText = audioGameName;
    audioCallButton.addEventListener('click', (): void => {
      const controller: AudioController = new AudioController();
      App.setController(controller);
    });
    const sprintButton = document.createElement('button');
    sprintButton.classList.add('sprint-button');
    sprintButton.innerText = sprintGameName;
    sprintButton.addEventListener('click', (): void => {
      const controller: SprintController = new SprintController();
      App.setController(controller);
    });
    this.view.append(audioCallButton, sprintButton);
  }
}

export default GamePageView;
