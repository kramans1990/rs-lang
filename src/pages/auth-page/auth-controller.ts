// import { ApplicationPage } from '../../types/ApplicationPage';
import AuthView from './auth-view';
import Api from '../../Api';
import { ISignIn, IUser } from '../../types/interfaces';
import { saveDataToLocalStorage } from '../../functions/functions';
import ApplicationContoller from '../application-controller';

class AuthController extends ApplicationContoller {
  api: Api;

  constructor() {
    super();
    this.setView();
  }

  setView(): void {
    this.api = new Api();
    this.pageView = new AuthView();
    this.addListeners();
  }

  /* eslint-disable no-alert */

  async signInUser(user: IUser): Promise<void> {
    await this.api
      .signInUser(user)
      .then((result: Response): string | ISignIn => {
        if (result.ok) {
          return result.json() as unknown as ISignIn;
        }
        return `${result.status} ${result.statusText}`;
      })
      .then((data: string | ISignIn): void => {
        if (typeof data === 'object') {
          const userData = data;
          saveDataToLocalStorage('rs-lang-user', JSON.stringify(userData));
          const wordsPageButton = document.querySelector<HTMLButtonElement>('.words-page');
          const click = new MouseEvent('click');
          wordsPageButton?.dispatchEvent(click);
          // TODO: скрывать кнопку входа
          // заменить алерт на что-то человеческое
          return;
        }
        alert(data);
      });
  }

  addListeners(): void {
    this.pageView.view
      .querySelector('.sign-in-button')
      ?.addEventListener('click', async (): Promise<void> => {
        const email = document.querySelector<HTMLInputElement>('.email-input')?.value || '';
        const password = document.querySelector<HTMLInputElement>('.password-input')?.value || '';
        const user: IUser = { email, password };
        await this.signInUser(user);
      });
  }
}

export default AuthController;
