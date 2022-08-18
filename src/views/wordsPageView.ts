export class WordsPageView {
  view: HTMLDivElement;

  constructor() {
    this.view = document.createElement('div');
    this.view.innerHTML = '<h1>WordsPageView</h1>';
  }
}
export default WordsPageView;
