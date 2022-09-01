/* eslint-disable import/no-cycle */

import Api from '../../Api';
import App from '../../App';
// import User from "../../types/User";
import ApplicationContoller from '../application-controller';
import StatModel from './stat-model';
import StatView from './stat-view';
import Statistic from '../../types/Statistic';

class StatController extends ApplicationContoller {
  model: StatModel;

  pageView: StatView;

  api: Api = new Api();

  constructor() {
    super();
    this.pageView = new StatView();
    this.model = new StatModel(this.pageView);
    this.getStat();
  }

  async getStat() {
    if (App.user) {
      const value: Statistic = await this.api.getUserStat(App.user?.userId, App.user?.token);
      console.log(value);
    }
  }
}
export default StatController;
