/* eslint-disable import/no-cycle */
import './stat.css';
import { Chart, registerables } from 'chart.js';
import Api from '../../Api';
import ApplicationView from '../application-view';
import * as constants from './stat-constants';

class StatView extends ApplicationView {
  view: HTMLDivElement;

  focusIndex = 0;

  api: Api = new Api();

  constructor() {
    super();
    this.renderView();
    Chart.register(...registerables);
  }

  showEverydayStat(
    newWordsAudio: number,
    newWordsSprint: number,
    accuracyAudio: number,
    accuracySprint: number,
    serieAudio: number,
    serieSprint: number,
    learnded: string,
    accuracyTotal: number,
  ) {
    const div = this.view.querySelector('.stat-content') as HTMLDivElement;
    // div.classList.remove('popup');
    div.classList.add('popup');
    div.innerHTML = '';
    const title = document.createElement('div');
    title.innerText = 'Статистика за сегодня';
    const titleAudioCall = document.createElement('h3');

    title.className = 'title ';
    titleAudioCall.innerText = 'Аудиовызов';
    const divNewWordsAudio = document.createElement('div');
    divNewWordsAudio.innerText = `Новых слов : ${newWordsAudio}`;
    const divAccuracyAudio = document.createElement('div');
    divAccuracyAudio.innerText = `Верных ответов, % : ${accuracyAudio.toFixed(2)}`;
    const divSerieAudio = document.createElement('div');
    divSerieAudio.innerText = `Лучшая серия ответов : ${serieAudio}`;
    div.append(title, titleAudioCall, divNewWordsAudio, divAccuracyAudio, divSerieAudio);

    const titleSprint = document.createElement('h3');
    titleSprint.innerText = 'Спринт';
    const divNewWordsSprint = document.createElement('div');
    divNewWordsSprint.innerText = `Новых слов : ${newWordsSprint}`;
    const divAccuracySprint = document.createElement('div');
    divAccuracySprint.innerText = `Верных ответов, %: ${accuracySprint.toFixed(2)}`;
    const divSerieSprint = document.createElement('div');
    divSerieSprint.innerText = `Лучшая серия ответов : ${serieSprint}`;
    div.append(titleSprint, divNewWordsSprint, divAccuracySprint, divSerieSprint);

    const titleWords = document.createElement('h3');
    titleWords.innerText = 'Статистика по словам за день';
    const divNewWords = document.createElement('div');
    divNewWords.innerText = `Новых слов : ${newWordsSprint + newWordsAudio}`;
    const divLearnWords = document.createElement('div');
    divLearnWords.innerText = `Слов изучено: ${learnded}`;
    const divAccuracyWords = document.createElement('div');
    divAccuracyWords.innerText = `Верных ответов, % : ${accuracyTotal.toFixed(2)}`;
    div.append(titleWords, divNewWords, divLearnWords, divAccuracyWords);
  }

  showAllStat(
    newWords: Array<{ date: Date; count: number }>,
    newLearned: Array<{ date: Date; count: number }>,
  ) {
    const div = this.view.querySelector('.stat-content') as HTMLDivElement;
    div.classList.remove('popup');
    div.innerHTML = '';
    div.appendChild(this.renderNewWords(newWords));
    div.appendChild(this.renderLearnedWords(newLearned));
  }

  renderView() {
    const div = document.createElement('div');
    div.className = 'stat-container';
    this.view = div;
    const buttonsBarDiv = document.createElement('div');
    buttonsBarDiv.className = 'div-buttons-flex';
    const buttonDay = document.createElement('button');
    buttonDay.innerText = constants.TodayStatButtonText;
    buttonDay.className = 'stat-button';
    buttonDay.id = 'stat-button-today';
    const buttonAll = document.createElement('button');
    buttonAll.innerText = constants.AllStatButtonText;
    buttonAll.className = 'stat-button';
    buttonAll.id = 'stat-button-all';
    buttonsBarDiv.append(buttonDay, buttonAll);
    const divContent = document.createElement('div');
    divContent.className = 'stat-content';
    div.appendChild(buttonsBarDiv);
    div.appendChild(divContent);

    const divDay = document.createElement('div');
    divDay.className = 'div-day';
    const divAll = document.createElement('div');
    divAll.className = 'div-day';

    (document.querySelector('footer') as HTMLElement).className = '';
  }

  /* eslint-disable class-methods-use-this */
  renderNewWords(newWords: Array<{ date: Date; count: number }>): HTMLCanvasElement {
    const canvasNewWords = document.createElement('canvas') as HTMLCanvasElement;
    canvasNewWords.id = 'newWordsChart';
    canvasNewWords.style.maxHeight = '300px';
    const count = newWords.map((p) => p.count);
    const date = newWords.map((item) => {
      const month = item.date.getMonth() + 1;
      const monthString = month < 10 ? `0${month}` : month;
      return `${item.date.getDate()}.${monthString}`;
    });
    const newWordsContext = canvasNewWords.getContext('2d') as CanvasRenderingContext2D;
    /* eslint-disable no-new */
    new Chart(newWordsContext, {
      type: 'line',
      data: {
        labels: date,
        datasets: [
          {
            label: 'новых слов',
            data: count,
            backgroundColor: ['#ec990e'],
            borderColor: ['#ffcb05'],
            borderWidth: 3,
          },
        ],
      },
      options: {
        plugins: {
          legend: {
            labels: {
              font: {
                size: 24,
                family: 'Arial, sans-serif',
              },
              boxWidth: 20,
              boxHeight: 5,
            },
          },
        },
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
    return canvasNewWords;
  }

  /* eslint-disable class-methods-use-this */
  renderLearnedWords(newLearned: Array<{ date: Date; count: number }>): HTMLCanvasElement {
    const canvasLearnedWords = document.createElement('canvas') as HTMLCanvasElement;
    canvasLearnedWords.id = 'learnedWordsChart';
    canvasLearnedWords.style.maxHeight = '300px';
    const countLearned = newLearned.map((p) => p.count);
    const dateLearned = newLearned.map((item) => {
      const month = item.date.getMonth() + 1;
      const monthString = month < 10 ? `0${month}` : month;
      return `${item.date.getDate()}.${monthString}`;
    });
    const learnedWordsContext = canvasLearnedWords.getContext('2d') as CanvasRenderingContext2D;
    /* eslint-disable no-new */
    new Chart(learnedWordsContext, {
      type: 'line',
      data: {
        labels: dateLearned,
        datasets: [
          {
            label: 'Выучено слов',
            data: countLearned,
            backgroundColor: ['#ec990e'],
            borderColor: ['#ffcb05'],
            borderWidth: 3,
          },
        ],
      },
      options: {
        plugins: {
          legend: {
            labels: {
              font: {
                size: 24,
                family: 'Arial, sans-serif',
              },
              boxWidth: 20,
              boxHeight: 5,
            },
          },
        },
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
    return canvasLearnedWords;
  }
}
export default StatView;
