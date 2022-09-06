/* eslint-disable import/no-cycle */
import ApplicationContoller from '../application-controller';
import GamePageView from './games-page-view';

class GamesPageController extends ApplicationContoller {
  pageView: GamePageView;

  constructor() {
    super();
    this.pageView = new GamePageView();
  }
}

export default GamesPageController;
