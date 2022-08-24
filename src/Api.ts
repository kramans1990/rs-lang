import { IUser } from './types/interfaces';
import { Word } from './types/Word';

class Api {
  baseUrl: string;

  users: string;

  signIn: string;

  words: string;

  constructor() {
    this.baseUrl = 'https://rs-lang-team112.herokuapp.com';
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
    const cards: Word[] = await (await fetch(`${this.words}?group=${group}&page=${page}`)).json();
    return cards;
  }

  async getOneWord(id: number): Promise<Word> {
    const card: Word = await (await fetch(`${this.words}/${id}`)).json();
    return card;
  }
}

export default Api;
