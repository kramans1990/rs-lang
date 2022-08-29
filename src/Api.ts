import { IUser } from './types/interfaces';
import { Word } from './types/Word';
import UserWord from './types/userword';
import { baseUrl } from './utils/constants';

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

  async getOneWord(id: number): Promise<Word> {
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

  async updateUserWord(id: string, token: string, userWord: UserWord): Promise<Array<UserWord>> {
    try {
      const responce = await fetch(`${this.baseUrl}/users/${id}/words/${userWord.word.id}`, {
        method: 'PUT',
        body: JSON.stringify({
          difficulty: userWord.difficulty,
          optional: {
            progress: userWord.optional.progress,
            successfulAttempts: userWord.optional.successfulAttempts,
            unsuccessfulAttempts: userWord.optional.unsuccessfulAttempts,
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

  async getUserWordsAgregatedAll(
    id: string,
    token: string,
    wordsPerPage: number,
    page: number,
    filter: string,
  ): Promise<Array<UserWord>> {
    try {
      const responce = await fetch(
        `${this.baseUrl}/users/${id}/aggregatedWords?page=${page}
      &wordsPerPage=${wordsPerPage}&filter=${filter}`,
        {
          method: 'GET',
          headers: {
            authorization: `Bearer ${token}`,
          },
        },
      );
      const userword = await responce.json();
      return userword;
    } catch {
      throw new Error();
    }
  }

  async getUserWordsAgregatedByGroup(
    id: string,
    token: string,
    group: number,
    wordsPerPage: number,
    page: number,
    filter: string,
  ): Promise<Array<UserWord>> {
    try {
      const responce = await fetch(
        `${this.baseUrl}/users/${id}/aggregatedWords?group=${group}&page=${page}
      &wordsPerPage=${wordsPerPage}&filter=${filter}`,
        {
          method: 'GET',
          headers: {
            authorization: `Bearer ${token}`,
          },
        },
      );
      const userword = await responce.json();
      return userword;
    } catch {
      throw new Error();
    }
  }
}

export default Api;
