/* eslint-disable import/no-cycle */

import Api from '../../Api';
import App from '../../App';
// import User from "../../types/User";
import ApplicationContoller from '../application-controller';
import StatModel from './stat-model';
import StatView from './stat-view';
import Statistic from '../../types/Statistic';
import StatOptional from '../../types/StatOptional';

class StatController extends ApplicationContoller {
  model: StatModel;

  pageView: StatView;

  stat: Statistic = new Statistic();

  api: Api = new Api();

  constructor() {
    super();
    this.pageView = new StatView();
    this.model = new StatModel(this.pageView);
    this.addEventListeners();
    this.getStat();
  }

  addEventListeners() {
    this.pageView.view.addEventListener('click', async (e) => {
      const target = e.target as HTMLElement;
      if (target.id === 'stat-button-today') {
        this.showDay();
      }
      if (target.id === 'stat-button-all') {
        this.showAll();
      }
    });
  }

  async getStat() {
    if (App.user) {
      this.stat = await this.api.getUserStat(App.user?.userId, App.user?.token);
      // this.pageView.showEverydayStat(this.stat);
    }
  }

  showDay() {
    let newWordsAudio = 0;
    let newWordsSprint = 0;
    let accuracyAudio = 0;
    let accuracySprint = 0;
    let serieAudio = 0;
    let serieSprint = 0;

    let accuracyTotal = 0;
    const today = new Date();
    const stat = new Statistic();
    const dateShort = stat.toShortDate(today);
    const toOptionsObject = this.stat.optional as unknown as { value: StatOptional[] };
    const toOptionsArrayString = toOptionsObject.value as unknown as StatOptional[];
    const StatOptionsArrray: StatOptional[] = JSON.parse(toOptionsArrayString.toString());
    stat.optional = StatOptionsArrray;
    const findAudio = stat.optional.find(
      (item) => item.dateShort === dateShort && item.gameName === 'audiocall',
    );
    const findSprint = stat.optional.find(
      (item) => item.dateShort === dateShort && item.gameName === 'sprint',
    );
    let totalCorrect = 0;
    let totalwrong = 0;
    let learnedFromBook = 0;
    let learnedTotal = 0;
    if (findAudio) {
      newWordsAudio = findAudio.newWords;
      accuracyAudio = findAudio.accuracy;
      serieAudio = findAudio.serie;
      totalCorrect += findAudio.correctAnswers;
      totalwrong += findAudio.wrongAnswers;
      learnedFromBook = findAudio.learnedByBook;
      learnedTotal += findAudio.learnedWords;
    }
    if (findSprint) {
      newWordsSprint = findSprint.newWords;
      accuracySprint = findSprint.accuracy;
      serieSprint = findSprint.serie;
      totalCorrect += findSprint.correctAnswers;
      totalwrong += findSprint.wrongAnswers;
      learnedFromBook = findSprint.learnedByBook;
      learnedTotal += findSprint.learnedWords;
    }
    if (totalCorrect + totalwrong !== 0) {
      accuracyTotal = totalCorrect / (totalCorrect + totalwrong);
    }
    this.pageView.showEverydayStat(
      newWordsAudio,
      newWordsSprint,
      accuracyAudio,
      accuracySprint,
      serieAudio,
      serieSprint,
      `${learnedTotal} + ${learnedFromBook}`,
      accuracyTotal,
    );
  }

  showAll() {
    const stat = new Statistic();
    const toOptionsObject = this.stat.optional as unknown as { value: StatOptional[] };
    const toOptionsArrayString = toOptionsObject.value as unknown as StatOptional[];
    const StatOptionsArrray: StatOptional[] = JSON.parse(toOptionsArrayString.toString());
    stat.optional = StatOptionsArrray;
    const newWordsProgress: Array<{ date: Date; count: number }> = new Array<{
      date: Date;
      count: number;
    }>();
    const learnedProgress: Array<{ date: Date; count: number }> = new Array<{
      date: Date;
      count: number;
    }>();
    let dates: Array<string> = stat.optional.map((p) => p.dateShort);
    dates = dates.filter((item, index, arr) => index === arr.indexOf(item));
    let learnded = this.stat.learnedWords;
    let newWords = 0;
    dates.forEach((date: string) => {
      const optionals = stat.optional.filter((p) => p.dateShort === date);
      optionals.forEach((item) => {
        newWords += item.newWords;
        learnded += item.learnedWords;
      });
      newWordsProgress.push({ date: new Date(date), count: newWords });
      learnedProgress.push({ date: new Date(date), count: learnded });
    });

    console.log(newWordsProgress, learnedProgress);
    // this.pageView.showAllStat();
    // let learnedWords :  Array<{date:Date , count:number}>
  }
}

export default StatController;
