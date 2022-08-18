export class GamePageView {
  view: HTMLDivElement;

  constructor() {
    this.view = document.createElement('div');
    this.view.innerHTML = '<h1>GamePageView</h1>';
  }
}
export default GamePageView;
