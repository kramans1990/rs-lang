/* eslint-disable import/no-cycle */
import ApplicationContoller from '../application-controller';
import MainPageView from './main-page-view';
import Api from '../../Api';

class MainPageController extends ApplicationContoller {
  mainPageView: MainPageView;

  constructor() {
    super();
    this.updateRefreshToken();
    this.setView();
  }

  setView(): void {
    this.api = new Api();
    this.pageView = new MainPageView();
  }
}

export default MainPageController;
