export class StatPageView {
  view: HTMLDivElement;

  constructor() {
    this.view = document.createElement('div');
    this.view.innerHTML = '<h1>StatPageView</h1>';
  }
}
export default StatPageView;
