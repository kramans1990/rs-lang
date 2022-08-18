import { ApplicationPage } from '../types/ApplicationPage';
import { GamePageView } from '../views/gamePageView';

export class GamePage extends ApplicationPage {
  gamePageView : GamePageView;

  constructor() {
    super();
    this.setView();
  }

  setView(): void {
    this.gamePageView = new GamePageView();
    this.view = this.gamePageView.view;
  }
}
export default GamePage;
