/* eslint-disable import/no-cycle */
import GamePageView from './games-page-view';
import ApplicationContoller from '../../application-controller';

class GamesPageController extends ApplicationContoller {
  pageView: GamePageView;

  constructor() {
    super();
    this.pageView = new GamePageView();
  }
}

export default GamesPageController;
