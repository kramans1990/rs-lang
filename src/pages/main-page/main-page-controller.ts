/* eslint-disable import/no-cycle */
import ApplicationContoller from '../application-controller';
import MainPageView from './main-page-view';
import Api from '../../Api';

class MainPageController extends ApplicationContoller {
  mainPageView: MainPageView;

  api: Api;

  constructor() {
    super();
    this.setView();
  }

  setView(): void {
    this.api = new Api();
    this.pageView = new MainPageView();
    // this.addListeners();
  }

  // addListeners(): void {
  //   this.pageView.view
  //     .querySelector('.sign-up-button')
  //     ?.addEventListener('click', async (): Promise<void> => {});
  // }
}

export default MainPageController;
