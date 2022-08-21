import { ApplicationPage } from '../types/ApplicationPage';
import { StatPageView } from '../views/statPageView';

export class StatPage extends ApplicationPage {
  statPageView: StatPageView;

  constructor() {
    super();
    this.setView();
  }

  setView(): void {
    this.statPageView = new StatPageView();
    this.view = this.statPageView.view;
  }
}
export default StatPage;
