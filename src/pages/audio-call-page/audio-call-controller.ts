import AudioModel from './audio-model';
import AudioView from './audio-view';
import Api from '../../Api';
import Word from './Word';
import ApplicationContoller from '../application-controller';
import App from '../../App';

class AudioController extends ApplicationContoller {
  model: AudioModel;

  pageView: AudioView;

  api: Api = new Api();
  
  wordsPerPage: number = 20;
  initialbarProgress = 3;  
  pagesPerGame = 5;

  constructor(words?: Array<Word>) {
    super();
    
    if (!words) {     
      this.pageView = new AudioView();
      this.model = new AudioModel(this.pageView);
      this.addListeners();
      this.addKeyBoardListener();
    }
    if(words){
      /// переход со сттраницы учебника
    }
  }

  addListeners() {
    const btns = this.pageView.view.querySelectorAll('button');
    for (let i = 0; i < btns.length; i += 1) {
      btns[i].addEventListener('click', (e: MouseEvent) => {
        const target = e.currentTarget as HTMLButtonElement;
        if (target.classList.contains('game-button')) {
          this.model.gameStatus = 'Set Level';
          this.getAllWords(Number(target.value));
        }
      });
    }
    this.pageView.view.addEventListener('click', (e) => {
      const target = e.target as HTMLElement;
      if (target.className === 'game-button option') {
        this.model.updateGameProgress();
      }
      if (target.id === 'next-question-button') {      
        this.model.nextQuestion();
      }    
        if (target.className === 'audio-icon') {
        const audio = target.firstChild as HTMLAudioElement;
        // let a = new Audio(audio.src);
        audio.play();       
      }
      if(target.id === 'play-again'){
         this.model.playAgain();
      }
      if(target.className ==='game-button option'){
       // let parent = target.parentNode as HTMLDivElement;
        this.model.handleAnswer(target.innerText);      
      }
      if(target.className ==='modal-close'){         
         this.model.closeResult();         
      }
    });
    this.pageView.view.querySelector('#new-game')?.addEventListener('click', () => {
      this.model.gameStatus = 'Select Level';
    });    
  }
  addKeyBoardListener(){
   document.addEventListener('keydown', (e) =>{   
      if(App.controller  instanceof AudioController){
             this.pageView.handlePressKey(e.key);
      }
  });
  }
  async getAllWords(group: number): Promise<void> {
    this.pageView.showProgressBar();
    this.model.gameStatus = 'Loading';
    let progress = this.initialbarProgress;
    let words = new Array<Word>();
    for (let i = 0; i <= this.pagesPerGame; i += 1) {
      progress = (i/this.pagesPerGame)*100;
      this.model.loadingStatus = progress;
      /* eslint-disable no-await-in-loop */
      const value: Array<Word> = await this.getwords(group, i);
      words = words.concat(value);
    }
    this.model.createQuiz(words, 20);
  }

  /* eslint-disable @typescript-eslint/indent */
  /* eslint-disable implicit-arrow-linebreak */
  getwords = (group: number, page: number): Promise<Array<Word>> =>
    new Promise((res, rej) => {
      
      fetch(`${this.api.words}?group=${group}&page=${page}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((result) => {
          const words = result.json();
          res(words);
        })
        .catch((err) => {
          rej(err);
        });
    });
    
}
export default AudioController;
