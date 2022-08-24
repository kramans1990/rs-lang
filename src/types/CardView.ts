import { Word } from './Word';
import Api from '../Api';

class Card extends Api {
  view: HTMLDivElement;

  static baseUrl: string;

  constructor(wordInfo: Word) {
    super();
    this.view = document.createElement('div');
    this.view.classList.add('card');
    this.view.id = `${wordInfo.id.toString()}`;

    this.createCard(wordInfo);
  }

  createCard(wordInfo: Word) {
    this.view.innerHTML = `
      <img src="${this.baseUrl}/${wordInfo.image}" alt="card photo" class="card__img">
      <div class="card__text">
          <div class="word">
              <p>
                  <span class="word__english">${wordInfo.word}</span>
                  <span class="word__transcription">${wordInfo.transcription}</span><br>
                  <span class="word__translation">${wordInfo.wordTranslate}</span>
              </p>
              <div>
                <div class="audio-icon" alt="audio icon">
                  <audio src="${this.baseUrl}/${wordInfo.audio}"></audio>
                  <audio src="${this.baseUrl}/${wordInfo.audioMeaning}"></audio>
                  <audio src="${this.baseUrl}/${wordInfo.audioExample}"></audio>
                </div>
              </div>
          </div>
          <div class="card__buttons">
              <button class="btn card__btn diff__btn">Сложное</button>
              <button class="btn card__btn done__btn">Изучено</button>
          </div>
          <div class="phases">
              <div class="phase__definition">
                  <p class="phase__definition_english">${wordInfo.textMeaning}</p>
                  <p class="phase__definition_russian">${wordInfo.textMeaningTranslate}</p>
              </div>
              <div class="phase__example">
                  <p class="phase__example_english">${wordInfo.textExample}</p>
                  <p class="phase__example_russian">${wordInfo.textExampleTranslate}</p>
              </div>
          </div>
      </div>
    `;
  }
}

export default Card;
