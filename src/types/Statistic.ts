/* eslint-disable import/no-cycle */
import Api from '../Api';
import App from '../App';
import StatOptional from './StatOptional';

class Statistic {
  learnedWords: number;

  api: Api = new Api();

  optional: StatOptional[];

  initOptional(gameName: string): StatOptional {
    const date = new Date();
    const statOptional: StatOptional = new StatOptional();
    statOptional.dateShort = this.toShortDate(date);
    statOptional.correctAnswers = 0;
    statOptional.wrongAnswers = 0;
    statOptional.accuracy = 0;
    statOptional.newWords = 0;
    statOptional.learnedWords = 0;
    statOptional.gameName = gameName;
    statOptional.serie = 0;
    statOptional.currentSerie = 0;
    statOptional.learnedByBook = 0;
    return statOptional;
  }

  initStatistic() {
    const initStatistic: Statistic = new Statistic();
    initStatistic.optional = new Array<StatOptional>();
    initStatistic.learnedWords = 0;
    initStatistic.optional.push(this.initOptional('audiocall'));
    initStatistic.optional.push(this.initOptional('sprint'));
    // initStatistic.optional.push(this.initOptional('book'));
    if (App.user) {
      this.api.updateUserStat(App.user.userId, App.user.token, initStatistic);
    }
  }

  /* eslint-disable  class-methods-use-this */
  toShortDate(date: Date): string {
    const d = new Date(date);
    let month = `${d.getMonth() + 1}`;
    let day = `${d.getDate()}`;
    const year = d.getFullYear();

    if (month.length < 2) {
      month = `0${month}`;
    }
    if (day.length < 2) {
      day = `0${day}`;
    }
    return [year, month, day].join('.').toString();
  }

  async updateStatistic(
    updateWordsResult: { isNew: boolean; isCorrect: boolean; isLearned: boolean },
    gameName: string,
  ) {
    const { isNew } = updateWordsResult;
    const { isCorrect } = updateWordsResult;
    const { isLearned } = updateWordsResult;

    if (App.user) {
      const today: Date = new Date();
      const currentStat = await this.api.getUserStat(App.user.userId, App.user.token);
      const dateShort = this.toShortDate(today);

      const toOptionsObject = currentStat.optional as unknown as { value: StatOptional[] };
      const toOptionsArrayString = toOptionsObject.value as unknown as StatOptional[];
      const StatOptionsArrray: StatOptional[] = JSON.parse(toOptionsArrayString.toString());
      currentStat.optional = StatOptionsArrray;
      const find = currentStat.optional.find(
        (item) => item.gameName === gameName && item.dateShort === dateShort,
      );

      if (find) {
        // currentStat.learnedWords = isLearned
        //   ? currentStat.learnedWords + 1
        //   : currentStat.learnedWords;
        find.correctAnswers = isCorrect ? find.correctAnswers + 1 : find.correctAnswers;
        find.wrongAnswers = isCorrect ? find.wrongAnswers : find.wrongAnswers + 1;
        find.learnedWords = isLearned ? find.learnedWords + 1 : find.learnedWords;
        find.accuracy = find.correctAnswers / (find.correctAnswers + find.wrongAnswers);
        find.currentSerie = isCorrect ? find.currentSerie + 1 : 0;
        find.serie = find.currentSerie > find.serie ? find.currentSerie : find.serie;
        find.newWords = isNew ? find.newWords + 1 : find.newWords;
        await this.api.updateUserStat(App.user.userId, App.user.token, currentStat);
      }
      if (!find) {
        const statOptional: StatOptional = new StatOptional();
        statOptional.dateShort = dateShort;
        statOptional.correctAnswers = isCorrect ? 1 : 0;
        statOptional.wrongAnswers = isCorrect ? 0 : 1;
        const a = statOptional.correctAnswers;
        const b = statOptional.wrongAnswers + statOptional.correctAnswers;
        statOptional.accuracy = a / b;
        statOptional.newWords = updateWordsResult.isNew ? 1 : 0;
        statOptional.learnedWords = isLearned ? 1 : 0;
        statOptional.gameName = gameName;
        statOptional.serie = isCorrect ? 1 : 0;
        statOptional.currentSerie = isCorrect ? 1 : 0;
        currentStat.optional.push(statOptional);
        currentStat.learnedWords = 0;
        await this.api.updateUserStat(App.user.userId, App.user.token, currentStat);
      }
    }
  }

  async addLearnedWordFromBook() {
    if (App.user) {
      const today: Date = new Date();
      const currentStat = await this.api.getUserStat(App.user.userId, App.user.token);
      const dateShort = this.toShortDate(today);
      const toOptionsObject = currentStat.optional as unknown as { value: StatOptional[] };
      const toOptionsArrayString = toOptionsObject.value as unknown as StatOptional[];
      const StatOptionsArrray: StatOptional[] = JSON.parse(toOptionsArrayString.toString());
      currentStat.optional = StatOptionsArrray;
      const find = currentStat.optional.filter((item) => item.dateShort === dateShort);
      if (find.length === 0) {
        const initStatistic: Statistic = new Statistic();
        initStatistic.learnedWords = 1;
        initStatistic.optional.push(this.initOptional('audiocall'));
        initStatistic.optional.push(this.initOptional('sprint'));
        initStatistic.optional[0].learnedByBook += 1;
        initStatistic.optional[1].learnedByBook += 1;
        await this.api.updateUserStat(App.user.userId, App.user.token, currentStat);
      }
      if (find) {
        for (let i = 0; i < find.length; i += 1) {
          find[i].learnedByBook += 1;
        }
        await this.api.updateUserStat(App.user.userId, App.user.token, currentStat);
      }
    }
  }
}

export default Statistic;
