import { Word } from '../../types/Word';
// eslint-disable-next-line import/no-cycle
import UserWord from '../../types/userword';
import {
  baseUrl,
  doneButtonText,
  hardButtonText,
  progressForDoneWord,
  progressForNoDoneWord,
  numberOfCardsPerPage,
} from '../../utils/constants';
import {
  saveDataToLocalStorage,
  // getDataFromLocalStorage,
  setBackgroundForBookPage,
  getAggregatedNumberFromLS,
} from '../../functions/functions';

/* eslint-disable import/no-cycle */
import Api from '../../Api';
import App from '../../App';
// import BookController from './book-controller';

class CardView {
  api: Api;

  view: HTMLDivElement;

  baseUrl: string;

  loadingProgress: number;

  static isAuthUser: boolean;

  userWords: UserWord[];

  aggregatedNumber: number | 0;

  constructor(wordInfo: Pick<Word, keyof Word>, userWords: UserWord[]) {
    this.api = new Api();
    this.baseUrl = baseUrl;
    this.view = document.createElement('div');
    this.view.classList.add('card');
    this.view.id = wordInfo._id || wordInfo.id;
    if (userWords) {
      this.userWords = userWords;
    }
    this.createCard(wordInfo);
  }

  async createCard(wordInfo: Word, userWordInfo?: UserWord) {
    const wordImg = document.createElement('img');
    wordImg.setAttribute('src', `${this.baseUrl}/${wordInfo.image}`);
    wordImg.setAttribute('alt', 'card photo');
    wordImg.classList.add('card__img');
    const statFrame = document.createElement('div');
    statFrame.classList.add('card__stat');

    let userWord;
    if (userWordInfo) {
      userWord = userWordInfo;
    } else {
      userWord = this.getOneUserWord(this.userWords);
      if (userWord) {
        statFrame.innerHTML = `<span>${userWord.optional.successfulAttempts}</span> | ${userWord.optional.unsuccessfulAttempts}`;
        if (userWord.difficulty === 'hard' && userWord.optional.progress !== 100) {
          this.view.classList.add('hard');
        }
        if (userWord.optional.progress === 100) {
          this.view.classList.add('done');
        }
      } else {
        statFrame.innerHTML = '<span>0</span> | 0';
      }
    }

    const cardText = document.createElement('div');
    cardText.classList.add('card__text');
    const wordBlock = this.createWordBlock(wordInfo);
    const cardButtons = this.createCardButtons();
    const progressBar = await this.createWordProgressBar();

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

  async createWordProgressBar() {
    const progressBar = document.createElement('div');
    progressBar.className = 'card__progress-bar';
    progressBar.id = 'card__progress-bar';
    const innerdiv = document.createElement('div');
    innerdiv.className = 'progress-loading';

    const userWord = this.getOneUserWord(this.userWords);
    if (userWord) {
      innerdiv.style.width = `${userWord.optional.progress}%`;
    }

    progressBar.appendChild(innerdiv);
    return progressBar;
  }

  /* eslint-disable class-methods-use-this */

  createCardButtons(): HTMLDivElement {
    const cardButtons = document.createElement('div');
    cardButtons.classList.add('card__buttons');
    const hardButton = document.createElement('button');
    hardButton.classList.add('btn', 'card__btn', 'hard__btn');
    hardButton.innerText = hardButtonText;
    hardButton.addEventListener('click', (e) => {
      this.hardBtnHandler(e);
    });
    const doneButton = document.createElement('button');
    doneButton.classList.add('btn', 'card__btn', 'done__btn');
    doneButton.innerText = doneButtonText;
    doneButton.addEventListener('click', (e) => {
      this.doneBtnHandler(e);
    });
    cardButtons.append(hardButton, doneButton);
    return cardButtons;
  }

  // eslint-disable-next-line max-lines-per-function
  async hardBtnHandler(e?: Event) {
    if (e) {
      const card = (e.target as HTMLDivElement).closest('.card');
      const cardId = card?.id as string;
      const pageElement = document.querySelector('.pagination-element.active');
      let aggregatedNumber = getAggregatedNumberFromLS();

      if (card?.classList.contains('hard')) {
        aggregatedNumber -= 1;
        card?.classList.remove('hard');
        this.updateUserWordInfo(cardId, 'no-hard');
      } else if (card?.classList.contains('done')) {
        card?.classList.remove('done');
        card?.classList.add('hard');
        this.updateProgressBar(progressForNoDoneWord);
        this.updateUserWordInfo(cardId, 'hard', progressForNoDoneWord);
      } else {
        aggregatedNumber += 1;
        card?.classList.add('hard');
        this.updateUserWordInfo(cardId, 'hard');
      }

      if (aggregatedNumber === numberOfCardsPerPage) {
        pageElement?.classList.add('done');
      } else {
        pageElement?.classList.remove('done');
      }

      saveDataToLocalStorage('aggregatedNumber', JSON.stringify(aggregatedNumber));
      setBackgroundForBookPage(aggregatedNumber);
    }
  }

  async doneBtnHandler(e?: Event) {
    if (e) {
      const card = (e.target as HTMLDivElement).closest('.card');
      const cardId = card?.id as string;
      const pageElement = document.querySelector('.pagination-element.active');
      let aggregatedNumber = getAggregatedNumberFromLS();

      if (card?.classList.contains('done')) {
        aggregatedNumber -= 1;
        card?.classList.remove('done');
        this.updateProgressBar(progressForNoDoneWord);
        this.updateUserWordInfo(cardId, 'no-hard', progressForNoDoneWord);
      } else if (card?.classList.contains('hard')) {
        card?.classList.remove('hard');
        card?.classList.add('done');
        this.updateUserWordInfo(cardId, 'no-hard', progressForDoneWord);
        this.updateProgressBar(progressForDoneWord);
      } else {
        aggregatedNumber += 1;
        card?.classList.add('done');
        this.updateProgressBar(progressForDoneWord);
        this.updateUserWordInfo(cardId, 'no-hard', progressForDoneWord);
      }

      if (aggregatedNumber === numberOfCardsPerPage) {
        pageElement?.classList.add('done');
      } else {
        pageElement?.classList.remove('done');
      }

      saveDataToLocalStorage('aggregatedNumber', JSON.stringify(aggregatedNumber));
      setBackgroundForBookPage(aggregatedNumber);
    }
  }

  updateProgressBar(progress: number) {
    const div = this.view.querySelector('.progress-loading') as HTMLDivElement;
    div.style.width = `${progress}%`;
  }

  async updateUserWordInfo(cardId: string, newDifficulty: string, newProgress?: number) {
    if (App.user?.userId) {
      const usersWords: Array<UserWord> = await this.api.getUserWords(
        App.user.userId,
        App.user.token,
      );
      const searchWordsArray = usersWords.filter((item) => item.wordId === cardId);
      const word = await this.api.getOneWord(cardId);

      if (searchWordsArray.length === 0) {
        let progress;
        if (typeof newProgress === 'number') {
          progress = newProgress;
        } else {
          progress = 0;
        }
        const difficulty = newDifficulty;
        const successfulAttempts = 0;
        const unsuccessfulAttempts = 0;
        const userWord: UserWord = new UserWord();
        userWord.word = word;
        userWord.difficulty = difficulty;
        userWord.optional.progress = progress;
        userWord.optional.successfulAttempts = successfulAttempts;
        userWord.optional.unsuccessfulAttempts = unsuccessfulAttempts;
        if (progress === 100) {
          userWord.optional.wasLearned = true;
        } else {
          userWord.optional.wasLearned = false;
        }
        this.api.createUserWord(App.user.userId, App.user.token, userWord);
      } else {
        const searchWord = searchWordsArray[0];
        let { progress } = searchWord.optional;
        if (typeof newProgress === 'number') {
          progress = newProgress;
        }

        const difficulty = newDifficulty;
        const { successfulAttempts } = searchWord.optional;
        const { unsuccessfulAttempts } = searchWord.optional;
        const userWord: UserWord = new UserWord();
        let wasLearned;
        if (progress === 100) {
          wasLearned = true;
        } else {
          wasLearned = false;
        }
        userWord.word = word;
        userWord.difficulty = difficulty;
        userWord.optional = {
          progress,
          successfulAttempts,
          unsuccessfulAttempts,
          wasLearned,
        };
        this.api.updateUserWord(App.user.userId, App.user.token, userWord);
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

  getOneUserWord(userWords: UserWord[]) {
    return userWords.find((item) => item.wordId === this.view.id) as UserWord;
  }
}

export default CardView;
