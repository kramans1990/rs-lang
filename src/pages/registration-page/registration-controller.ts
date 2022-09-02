/* eslint-disable import/no-cycle */
import { isValidEmail, isValidPassword } from '../../functions/functions';
import { invalidEmail, invalidPassword } from '../../utils/constants';
import { ISignIn, IUser } from '../../types/interfaces';
import ApplicationContoller from '../application-controller';
import RegModel from './registration-model';
import Statistic from '../../types/Statistic';
/* eslint-disable import/no-cycle */
import RegistrationView from './registration-view';
import App from '../../App';
import Api from '../../Api';

class RegistrationController extends ApplicationContoller {
  regPageView: RegistrationView;

  regModel: RegModel;

  api: Api = new Api();

  constructor() {
    super();
    this.setView();
  }

  setView(): void {
    this.regModel = new RegModel();
    this.pageView = new RegistrationView();
    this.addListeners();
  }

  async signUpUser(user: IUser): Promise<void> {
    await this.regModel
      .createUser(user)
      .then((result: Response): string | IUser => {
        if (result.ok) {
          return result.json() as unknown as IUser;
        }
        return `${result.status} ${result.statusText}`;
      })
      .then(async (data: string | IUser): Promise<void> => {
        if (typeof data === 'object') {
          await this.regModel
            .signInUser(user)
            .then((result: Response): string | ISignIn => {
              if (result.ok) {
                return result.json() as unknown as ISignIn;
              }
              return `${result.status} ${result.statusText}`;
            })
            .then((userData: string | ISignIn): void => App.signIn(userData))
            .then((): void => {
              this.createStatistic();
            });
        }
      });
  }

  /* eslint-disable class-methods-use-this */
  createStatistic() {
    const initialStat: Statistic = new Statistic();
    initialStat.initStatistic();
  }
  /* eslint-disable no-alert */

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
