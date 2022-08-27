import Word from '../pages/audio-call-page/Word';
import Api from '../Api';
import App from '../App';

class UserWord {
  word: Word;

  difficulty: string;

  optional: userwordInfo;

  api: Api = new Api();

  constructor(word: Word, difficulty: string, optional?: userwordInfo) {
    this.word = word;
    this.difficulty = difficulty;
    if (optional) {
      this.optional = optional;
    }
  }
  // createUserWord(){

  // }
  async signInUser(): Promise<Response> {
    const response: Response = await fetch(`${this.api.users}/${App.user?.userId}`, {
      method: 'POST',
      body: JSON.stringify({ optional: this }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response;
  }
}
export default UserWord;
interface userwordInfo {
  progress: number;
}
