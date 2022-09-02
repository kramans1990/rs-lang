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

  // showAllStat() {
  //   const div = this.view.querySelector('.stat-content') as HTMLDivElement;
  //   div.innerHTML = '';
  //   div.innerText = 'all';
  //   const canvasLearnedWords = document.createElement('canvas') as HTMLCanvasElement;
  //   canvasLearnedWords.id = 'learnedWordsChart';
  //   const canvasLearnedWordsContext = canvasLearnedWords.getContext(
  //     '2d',
  //   ) as CanvasRenderingContext2D;
  //   const myChartlearned = new Chart(canvasLearnedWordsContext, {
  //     type: 'bar',

  //     data: {
  //       labels: [1, 2, 3, 4, 5, 6],
  //       datasets: [{
  //         {
  //           label: '# of Votes',
  //           data: [12, 19, 3, 5, 2, 3],

  //           backgroundColor: [
  //           'rgba(255, 99, 132, 0.2)',
  //             'rgba(54, 162, 235, 0.2)',
  //             'rgba(255, 206, 86, 0.2)',
  //             'rgba(75, 192, 192, 0.2)',
  //             'rgba(153, 102, 255, 0.2)',
  //           'rgba(255, 159, 64, 0.2)'
  //           ],
  //         borderColor: [
  //             'rgba(255, 99, 132, 1)',
  //             'rgba(54, 162, 235, 1)',
  //             'rgba(255, 206, 86, 1)',
  //           'rgba(75, 192, 192, 1)',
  //             'rgba(153, 102, 255, 1)',
  //           'rgba(255, 159, 64, 1)'
  //           ],
  //           borderWidth: 5,

  //       }],
  //    },
  //     options: {
  //       scales: {
  //         y: {
  //           beginAtZero: true,
  //            }

  //       },

  //     },

  //   });
  //   div.appendChild(canvasLearnedWords);
  // }

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
    /// //

    ///
    // div.appendChild(canvasNewWords);
    // div.appendChild(canvasLearnedWords);
    this.view = div;
  }
}
export default StatView;
