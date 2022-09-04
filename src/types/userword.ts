/* eslint-disable import/no-cycle */
import Api from '../Api';
import { Word } from './Word';
import App from '../App';

class UserWord {
  word: Word;

  difficulty: string;

  wordId: string;

  optional: {
    progress: number;
    successfulAttempts: number;
    unsuccessfulAttempts: number;
    wasLearned: boolean;
  };

  api: Api = new Api();

  async UpdateUserWords(
    correctAnswer: Word,
    isCorrect: boolean,
  ): Promise<{ isNew: boolean; isCorrect: boolean; isLearned: boolean }> {
    let userWords: Array<UserWord> = new Array<UserWord>();
    let isNew = false;
    let wasLearned = false;
    let isLearned = false;
    if (App.user?.userId) {
      userWords = await this.api.getUserWords(App.user.userId, App.user.token);
      const find = userWords.find((item) => item.wordId === correctAnswer.id);
      if (!find) {
        this.createUserWord(isCorrect, correctAnswer);
        isNew = true;
      }
      if (find) {
        wasLearned = find.optional.wasLearned;
        let { progress } = find.optional;
        progress = isCorrect ? (progress += 20) : (progress -= 20);
        progress = progress >= 100 ? 100 : progress;
        progress = progress <= 0 ? 0 : progress;
        if (progress === 100 && !wasLearned) {
          wasLearned = true;
          isLearned = true;
        }
        const difficulty = progress === 100 ? 'no-hard' : find.difficulty;
        if (isCorrect) {
          find.optional.successfulAttempts += 1;
        }
        if (!isCorrect) {
          find.optional.unsuccessfulAttempts += 1;
        }
        const userWord: UserWord = new UserWord();
        userWord.word = correctAnswer;
        userWord.difficulty = difficulty;
        userWord.optional = {
          progress,
          successfulAttempts: find.optional.successfulAttempts,
          unsuccessfulAttempts: find.optional.unsuccessfulAttempts,
          wasLearned,
        };
        userWord.word = correctAnswer;
        userWord.wordId = find.wordId;
        isNew = find.optional.successfulAttempts + find.optional.successfulAttempts === 1;
        this.api.updateUserWord(App.user.userId, App.user.token, userWord);
      }
    }
    return { isNew, isCorrect, isLearned };
  }

  createUserWord(isCorrect: boolean, correctAnswer: Word) {
    if (App.user) {
      const progress: number = isCorrect ? 20 : 0;
      const successfulAttempts = isCorrect ? 1 : 0;
      const unsuccessfulAttempts = isCorrect ? 0 : 1;
      const userWord: UserWord = new UserWord();
      userWord.word = correctAnswer;
      userWord.difficulty = 'no-hard';
      userWord.optional = {
        progress,
        successfulAttempts,
        unsuccessfulAttempts,
        wasLearned: false,
      };
      this.api.createUserWord(App.user.userId, App.user.token, userWord);
    }
  }
}
export default UserWord;
