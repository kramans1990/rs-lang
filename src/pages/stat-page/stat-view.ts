/* eslint-disable import/no-cycle */
import './stat.css';
import Api from '../../Api';
import ApplicationView from '../application-view';
import * as constants from './stat-constants';

class StatView extends ApplicationView {
  view: HTMLDivElement;

  focusIndex = 0;

  api: Api = new Api();

  constructor() {
    super();
    this.renderView();
  }

  renderView() {
    const div = document.createElement('div');
    div.className = 'stat-container';
    this.view = div;
    const buttonsBarDiv = document.createElement('div');
    buttonsBarDiv.className = 'div-buttons-flex';
    const buttonDay = document.createElement('button');
    buttonDay.innerText = constants.TodayStatButtonText;
    buttonDay.className = 'stat-button';
    const buttonAll = document.createElement('button');
    buttonAll.innerText = constants.AllStatButtonText;
    buttonAll.className = 'stat-button';
    buttonsBarDiv.append(buttonDay, buttonAll);
    div.appendChild(buttonsBarDiv);

    const divDay = document.createElement('div');
    divDay.className = 'div-day';
    const divAll = document.createElement('div');
    divAll.className = 'div-day';

    this.view = div;
  }

  // showEveryDayStat() {}

  // showAllStat() {}
}
export default StatView;
