import { Word } from './Word';

class UserWord {
  word: Word;

  difficulty: string;

  wordId: string;

  optional: { progress: number; successfulAttempts: number; unsuccessfulAttempts: number };

  constructor(
    word: Word,
    difficulty: string,
    progress: number,
    successfulAttempts: number,
    unsuccessfulaAttempts: number,
  ) {
    this.word = word;
    this.difficulty = difficulty;
    this.optional = {
      progress,
      successfulAttempts,
      unsuccessfulAttempts: unsuccessfulaAttempts,
    };
  }
}
export default UserWord;
