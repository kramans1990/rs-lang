/* eslint-disable import/no-cycle */

import StatView from './stat-view';

class StatModel {
  pageView: StatView;

  constructor(pageView: StatView) {
    this.pageView = pageView;
  }
}
export default StatModel;
