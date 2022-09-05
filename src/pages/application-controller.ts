/* eslint-disable import/no-cycle */
import Api from '../Api';
import { getDataFromLocalStorage, saveDataToLocalStorage } from '../functions/functions';
import { ISignIn } from '../types/interfaces';
import ApplicationView from './application-view';

class ApplicationContoller {
  pageView: ApplicationView;

  api: Api = new Api();

  constructor() {
    this.refreshToken();
  }

  async refreshToken() {
    if (getDataFromLocalStorage('rs-lang-user') !== null) {
      const signIn = getDataFromLocalStorage('rs-lang-user') as unknown as ISignIn;
      const id = signIn.userId;
      const newSignIn = (await (await this.api.refreshToken(id)).json()) as ISignIn;
      saveDataToLocalStorage('rs-lang-user', JSON.stringify(newSignIn));
    }
  }
}

export default ApplicationContoller;
