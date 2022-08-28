// import * as api from '../Api';

class Word {
  id: string;

  group: number;

  page: number;

  word: string;

  image: string;

  audio: string;

  audioMeaning: string;

  audioExample: string;

  textMeaning: string;

  textExample: string;

  transcription: string;

  wordTranslate: string;

  textMeaningTranslate: string;

  textExampleTranslate: string;

  wordCard: HTMLDivElement;

  // constructor() {}

  // setWordCard(word:Word):void {
  //   const div = document.createElement('div');
  //   div.innerHTML = `<div>
  //       <image src="${api.baseUrl}/${word.image}"><image/>
  //       <span>${word.word}</span>
  //       <audio controls>
  //       <source src="${api.baseUrl}/${word.audio}" type="audio/mpeg">
  //       Your browser does not support the audio element.
  //     </audio>
  //       </div>`;
  //   this.wordCard = div;
  // }
}
export default Word;
