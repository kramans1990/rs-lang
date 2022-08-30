import { sprintTime } from '../../../utils/constants';
import ApplicationContoller from '../../application-controller';
import SprintView from './sprint-view';

class SprintController extends ApplicationContoller {
  constructor() {
    super();
    this.startGame();
  }

  startGame() {
    this.pageView = new SprintView();
    this.setTimer();
  }

  setTimer() {
    const timer = this.pageView.view.querySelector('.sprint-timer') as HTMLDivElement;
    let gameTime = 0;
    window.setInterval((): void => {
      if (gameTime <= sprintTime) {
        timer.innerText = `${sprintTime - gameTime}`;
        gameTime += 1;
      }
      if (!gameTime) {
        // this.renderResults();
      }
    }, 1000);
  }
}

export default SprintController;
