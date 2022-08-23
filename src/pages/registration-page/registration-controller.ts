import { isValidEmail, isValidPassword, saveDataToLocalStorage } from '../../functions/functions';
import { invalidEmail, invalidPassword } from '../../utils/constants';
// import { ApplicationPage } from '../../types/ApplicationPage';
import { ISignIn, IUser } from '../../types/interfaces';
import { RegPageView } from '../../views/regPageView';
import Api from '../../Api';
import { ApplicationContoller } from '../application-controller';
/* eslint-disable import/no-cycle */
import { App } from '../../App';
import { AuthController } from '../auth-page/auth-controller';

export class RegistrationController extends ApplicationContoller {
  regPageView: RegPageView;

  api: Api;

  constructor() {
    super();
    this.setView();
  }

  setView(): void {
    this.api = new Api();
    this.pageView = new RegPageView();
    // this.view = this.regPageView.view;
    this.addListeners();
  }

  /* eslint-disable no-alert */

  async signUpUser(user: IUser): Promise<void> {
    await this.api
      .createUser(user)
      .then((result: Response): string | IUser => {
        if (result.ok) {
          return result.json() as unknown as IUser;
        }
        return `${result.status} ${result.statusText}`;
      })
      .then(async (data: string | IUser): Promise<string | IUser> => {
        if (typeof data === 'object') {
          this.api.signInUser(user).then((result: Response): string | ISignIn => {
            if (result.ok) {
              return result.json() as unknown as ISignIn;
            }
            return `${result.status} ${result.statusText}`;
          });
        }
        return data;
      })
      .then((data: string | IUser): void => {
        if (typeof data === 'object') {
          const userData = data;
          saveDataToLocalStorage('rs-lang-user', JSON.stringify(userData));
          // const wordsPageButton = document.querySelector<HTMLButtonElement>('.words-page');
          // const click = new MouseEvent('click');
          // wordsPageButton?.dispatchEvent(click);
          App.setController(new AuthController());
          // TODO: скрывать кнопку входа
          // заменить алерт на что-то человеческое

          return;
        }
        alert(data);
      });
  }

  addListeners(): void {
    this.pageView.view
      .querySelector('.sign-up-button')
      ?.addEventListener('click', async (): Promise<void> => {
        const name = document.querySelector<HTMLInputElement>('.name-input')?.value || '';
        const email = document.querySelector<HTMLInputElement>('.email-input')?.value || '';
        if (!isValidEmail(email)) {
          alert(`${invalidEmail} ${email}`);
          return;
        }
        const password = document.querySelector<HTMLInputElement>('.password-input')?.value || '';
        if (!isValidPassword(password)) {
          alert(invalidPassword);
          return;
        }
        const user: IUser = { name, email, password };
        await this.signUpUser(user);
      });
  }
}

export default RegistrationController;
