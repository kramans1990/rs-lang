/* eslint-disable import/no-cycle */
import { IUser } from './types/interfaces';
import { Word } from './types/Word';
import { baseUrl } from './utils/constants';
import UserWord from './types/userword';
import Statistic from './types/Statistic';

class Api {
  baseUrl: string;

  users: string;

  signIn: string;

  words: string;

  constructor() {
    this.baseUrl = baseUrl;
    this.users = `${this.baseUrl}/users`;
    this.signIn = `${this.baseUrl}/signin`;
    this.words = `${this.baseUrl}/words`;
  }

  async createUser(user: IUser): Promise<Response> {
    const response: Response = await fetch(`${this.users}`, {
      method: 'POST',
      body: JSON.stringify(user),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response;
  }

  async getUser(id: string): Promise<Response> {
    const response: Response = await fetch(`${this.users}/${id}`, {
      method: 'GET',
    });
    return response;
  }

  async signInUser(user: IUser): Promise<Response> {
    const response: Response = await fetch(`${this.signIn}`, {
      method: 'POST',
      body: JSON.stringify({ email: user.email, password: user.password }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response;
  }

  async deleteUser(id: string): Promise<Response> {
    const response: Response = await fetch(`${this.users}/${id}`, {
      method: 'DELETE',
    });
    return response;
  }

  async getWords(group: number, page: number): Promise<Word[]> {
    try {
      const responce = await fetch(`${this.words}?group=${group}&page=${page}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const cards = await responce.json();
      return cards;
    } catch {
      throw new Error();
    }
  }

  async getWordsForLevel(group: number): Promise<Word[]> {
    try {
      const responce = await fetch(`${this.words}?group=${group}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const cards = await responce.json();
      return cards;
    } catch {
      throw new Error();
    }
  }

  async getOneWord(id: string): Promise<Word> {
    try {
      const responce = await fetch(`${this.words}/${id}`);
      const card = await responce.json();
      return card;
    } catch {
      throw new Error();
    }
  }

  async getUserWords(id: string, token: string): Promise<Array<UserWord>> {
    try {
      const responce = await fetch(`${this.baseUrl}/users/${id}/words`, {
        method: 'GET',
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      const userword = await responce.json();
      return userword;
    } catch {
      throw new Error();
    }
  }

  async createUserWord(id: string, token: string, userWord: UserWord): Promise<Array<UserWord>> {
    try {
      const responce = await fetch(`${this.baseUrl}/users/${id}/words/${userWord.word.id}`, {
        method: 'POST',
        body: JSON.stringify({
          difficulty: userWord.difficulty,
          optional: {
            progress: userWord.optional.progress,
            successfulAttempts: userWord.optional.successfulAttempts,
            unsuccessfulAttempts: userWord.optional.unsuccessfulAttempts,
            wasLearned: userWord.optional.wasLearned,
          },
        }),
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${token}`,
        },
      });
      const createdUserword = await responce.json();
      return createdUserword;
    } catch {
      throw new Error();
    }
  }

  async updateUserWord(id: string, token: string, userWord: UserWord): Promise<UserWord> {
    try {
      const responce = await fetch(`${this.baseUrl}/users/${id}/words/${userWord.word.id}`, {
        method: 'PUT',
        body: JSON.stringify({
          difficulty: userWord.difficulty,
          optional: {
            progress: userWord.optional.progress,
            successfulAttempts: userWord.optional.successfulAttempts,
            unsuccessfulAttempts: userWord.optional.unsuccessfulAttempts,
            wasLearned: userWord.optional.wasLearned,
          },
        }),
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${token}`,
        },
      });

      const updatedUserWord = await responce.json();
      return updatedUserWord;
    } catch {
      throw new Error();
    }
  }

  async getUserWordsAllHard(id: string, token: string): Promise<Partial<Word & UserWord>[]> {
    try {
      const responce = await fetch(
        `${this.baseUrl}/users/${id}/aggregatedWords?wordsPerPage=600&filter={"userWord.difficulty":"hard"}`,
        {
          method: 'GET',
          headers: {
            authorization: `Bearer ${token}`,
          },
        },
      );
      const respArr = await responce.json();
      return respArr[0].paginatedResults;
    } catch {
      throw new Error();
    }
  }

  async getUserWordsAgregatedByFilter(
    id: string,
    token: string,
    wordsPerPage: number,
    filter: string,
  ): Promise<Array<UserWord | Word>> {
    try {
      const responce = await fetch(
        `${this.baseUrl}/users/${id}/aggregatedWords?wordsPerPage=${wordsPerPage}&filter=${filter}`,
        {
          method: 'GET',
          headers: {
            authorization: `Bearer ${token}`,
          },
        },
      );
      const userword = await responce.json();
      return userword[0].paginatedResults;
    } catch {
      throw new Error();
    }
  }

  async getUserStat(id: string, token: string): Promise<Statistic> {
    try {
      const responce = await fetch(`${this.baseUrl}/users/${id}/statistics`, {
        method: 'GET',
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      const userstat = await responce.json();
      return userstat;
    } catch {
      throw new Error();
    }
  }

  async updateUserStat(id: string, token: string, stat: Statistic) {
    try {
      const responce = await fetch(`${this.baseUrl}/users/${id}/statistics`, {
        method: 'PUT',
        body: JSON.stringify({
          learnedWords: stat.learnedWords,
          optional: {
            value: JSON.stringify(stat.optional),
          },
        }),
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${token}`,
        },
      });
      const createdUserword = await responce.json();
      return createdUserword;
    } catch {
      throw new Error();
    }
  }
}

export default Api;
