import { Word } from '../../types/Word';
import {
  baseUrl,
  doneButtonText,
  doneButtonTextOpposite,
  hardButtonText,
  hardButtonTextOpposite,
} from '../../utils/constants';
// eslint-disable-next-line import/no-cycle
import App from '../../App';

class CardView {
  view: HTMLDivElement;

  baseUrl: string;

  loadingProgress: number;

  static isAuthUser: boolean;

  constructor(wordInfo: Word) {
    this.baseUrl = baseUrl;
    this.view = document.createElement('div');
    this.view.classList.add('card');
    this.view.id = wordInfo.id;
    this.loadingProgress = 20;

    this.createCard(wordInfo);
  }

  set loadingStatus(loading: number) {
    this.loadingProgress = loading;
    this.updateProgressBar(this.loadingProgress);
  }

  createCard(wordInfo: Word) {
    const wordImg = document.createElement('img');
    wordImg.setAttribute('src', `${this.baseUrl}/${wordInfo.image}`);
    wordImg.setAttribute('alt', 'card photo');
    wordImg.classList.add('card__img');
    const statFrame = document.createElement('div');
    statFrame.classList.add('card__stat');
    statFrame.innerHTML = '<span>3</span> | 17';

    const cardText = document.createElement('div');
    cardText.classList.add('card__text');
    const wordBlock = this.createWordBlock(wordInfo);
    const cardButtons = this.createCardButtons();
    const progressBar = this.createWordProgressBar();

    if (!App.user) {
      progressBar.style.display = 'none';
      statFrame.style.display = 'none';
      cardButtons.style.display = 'none';
    }

    const phrasesBlock = this.createPhrasesBlock(wordInfo);
    cardText.append(wordBlock, cardButtons, phrasesBlock);
    this.view.append(wordImg, statFrame, progressBar, cardText);
  }

  createWordBlock(wordInfo: Word): HTMLDivElement {
    const wordBlock = document.createElement('div');
    wordBlock.classList.add('word');
    const wordText = document.createElement('p');
    const word = document.createElement('span');
    word.classList.add('word__english');
    word.innerText = `${wordInfo.word} `;
    const wordTranscription = document.createElement('span');
    wordTranscription.classList.add('word__transcription');
    wordTranscription.innerText = wordInfo.transcription;
    const breakItem = document.createElement('br');
    const wordTranslation = document.createElement('span');
    wordTranslation.innerText = wordInfo.wordTranslate;
    wordTranslation.classList.add('word__translation');
    wordText.append(word, wordTranscription, breakItem, wordTranslation);
    const audioIcon = this.createAudioBlock(wordInfo);
    wordBlock.append(wordText, audioIcon);
    return wordBlock;
  }

  /* eslint-disable class-methods-use-this */

  createWordProgressBar() {
    const progressBar = document.createElement('div');
    const innerdiv = document.createElement('div');
    innerdiv.className = 'progress-loading';
    progressBar.className = 'card__progress-bar';
    progressBar.id = 'card__progress-bar';
    progressBar.appendChild(innerdiv);
    return progressBar;
  }

  updateProgressBar(loading: number) {
    const div = this.view.querySelector('.progress-loading') as HTMLDivElement;
    div.style.width = `${loading}%`;
  }

  /* eslint-disable class-methods-use-this */

  createCardButtons(): HTMLDivElement {
    const cardButtons = document.createElement('div');
    cardButtons.classList.add('card__buttons');
    const hardButton = document.createElement('button');
    hardButton.classList.add('btn', 'card__btn', 'hard__btn');
    hardButton.innerText = hardButtonText;
    hardButton.addEventListener('click', this.hardBtnHandler);
    const doneButton = document.createElement('button');
    doneButton.classList.add('btn', 'card__btn', 'done__btn');
    doneButton.innerText = doneButtonText;
    doneButton.addEventListener('click', this.doneBtnHandler);
    cardButtons.append(hardButton, doneButton);
    return cardButtons;
  }

  hardBtnHandler(e?: Event) {
    if (e) {
      const card = (e.target as HTMLDivElement).closest('.card');
      const hardButton = e.target as HTMLDivElement;
      const doneButton = hardButton.nextSibling as HTMLDivElement;

      switch (hardButton.textContent?.toLowerCase()) {
        case 'сложное':
          card?.classList.remove('done');
          card?.classList.add('hard');
          hardButton.innerText = hardButtonTextOpposite;
          doneButton.innerText = doneButtonText;
          break;
        case 'несложное':
          card?.classList.remove('hard');
          hardButton.innerText = hardButtonText;
          doneButton.innerText = doneButtonText;
          break;
        default:
          break;
      }
    }
  }

  doneBtnHandler(e?: Event) {
    if (e) {
      const card = (e.target as HTMLDivElement).closest('.card');
      const doneButton = e.target as HTMLDivElement;
      const hardButton = doneButton.previousSibling as HTMLDivElement;

      switch (doneButton.textContent?.toLowerCase()) {
        case 'изучено':
          card?.classList.remove('hard');
          card?.classList.add('done');
          doneButton.innerText = doneButtonTextOpposite;
          hardButton.innerText = hardButtonText;
          break;
        case 'поучить':
          card?.classList.remove('done');
          doneButton.innerText = doneButtonText;
          hardButton.innerText = hardButtonText;
          break;
        default:
          break;
      }
    }
  }

  createPhrasesBlock(wordInfo: Word): HTMLDivElement {
    const phrasesBlock = document.createElement('div');
    phrasesBlock.classList.add('phrases');
    const phraseDefinition = document.createElement('div');
    phraseDefinition.classList.add('phrase__definition');
    const phraseDefinitionEnglish = document.createElement('p');
    phraseDefinitionEnglish.classList.add('phrase__definition_english');
    phraseDefinitionEnglish.innerHTML = wordInfo.textMeaning;
    const phraseDefinitionRussian = document.createElement('p');
    phraseDefinitionRussian.classList.add('phrase__definition_russian');
    phraseDefinitionRussian.innerHTML = wordInfo.textMeaningTranslate;
    phraseDefinition.append(phraseDefinitionEnglish, phraseDefinitionRussian);
    const phraseExample = document.createElement('div');
    phraseExample.classList.add('phrase__example');
    const phraseExampleEnglish = document.createElement('p');
    phraseExampleEnglish.classList.add('phrase__example_english');
    phraseExampleEnglish.innerHTML = wordInfo.textExample;
    const phraseExampleRussian = document.createElement('p');
    phraseExampleRussian.classList.add('phrase__example_russian');
    phraseExampleRussian.innerHTML = wordInfo.textExampleTranslate;
    phraseExample.append(phraseExampleEnglish, phraseExampleRussian);
    phrasesBlock.append(phraseDefinition, phraseExample);
    return phrasesBlock;
  }

  /* eslint-enable class-methods-use-this */

  createAudioBlock(wordInfo: Word): HTMLDivElement {
    const audioIcon = document.createElement('div');
    audioIcon.classList.add('audio-icon');
    const audio = document.createElement('audio');
    audio.setAttribute('src', `${this.baseUrl}/${wordInfo.audio}`);
    const audioMeaning = document.createElement('audio');
    audioMeaning.setAttribute('src', `${this.baseUrl}/${wordInfo.audioMeaning}`);
    const audioExample = document.createElement('audio');
    audioExample.setAttribute('src', `${this.baseUrl}/${wordInfo.audioExample}`);
    audioIcon.append(audio, audioMeaning, audioExample);
    return audioIcon;
  }
}

export default CardView;
