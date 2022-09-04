import ApplicationView from '../application-view';
import '../../styles/main-page.css';
import '../../styles/burger.css';

/* prettier-ignore */

import {
  mainPageText,
  learnButtonText,
  playButtonText,
  rsLang,
} from '../../utils/constants';

/* prettier-ignore */

class MainPageView extends ApplicationView {
  view: HTMLDivElement;

  constructor() {
    super();
    this.renderMainPage();
  }

  public renderMainPage() {
    this.view = document.createElement('div');
    this.view.classList.add('main-page');
    const title = document.createElement('h1');
    title.classList.add('main-page__title');
    title.innerText = rsLang;
    const introText = document.createElement('div');
    introText.classList.add('main-page__text');
    const text1 = document.createElement('p');
    text1.innerText = mainPageText;
    const text2 = document.createElement('p');
    text2.innerText = mainPageText;
    introText.append(text1, text2);
    const buttons = document.createElement('div');
    buttons.classList.add('buttons');
    const learnButton = document.createElement('button');
    learnButton.classList.add('btn_intro', 'btn', 'btn_colored', 'learn');
    learnButton.innerText = learnButtonText;
    const playButton = document.createElement('button');
    playButton.classList.add('btn_intro', 'btn', 'btn_bordered', 'play');
    playButton.innerText = playButtonText;
    buttons.append(learnButton, playButton);
    this.view.append(title, introText, buttons);
  }
}
export default MainPageView;
