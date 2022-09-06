/* eslint-disable import/no-cycle */
import AuthView from './auth-view';
import AuthModel from './auth-model';
import { ISignIn, IUser } from '../../types/interfaces';
import ApplicationContoller from '../application-controller';
import App from '../../App';

class AuthController extends ApplicationContoller {
  authModel: AuthModel;

  constructor() {
    super();
    this.setView();
  }

  setView(): void {
    this.authModel = new AuthModel();
    this.pageView = new AuthView();
    this.addListeners();
  }

  /* eslint-disable no-alert */

  async signInUser(user: IUser): Promise<void> {
    await this.authModel
      .signInUser(user)
      .then((result: Response): string | ISignIn => {
        if (result.ok) {
          return result.json() as unknown as ISignIn;
        }
        return `${result.status} ${result.statusText}`;
      })
      .then((data: string | ISignIn): void => App.signIn(data));
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
