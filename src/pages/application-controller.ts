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
      const newSignIn = (await (await this.api.refreshToken(signIn)).json()) as ISignIn;
      newSignIn.message = signIn.message;
      newSignIn.userId = signIn.userId;
      newSignIn.name = signIn.name;
      saveDataToLocalStorage('rs-lang-user', JSON.stringify(newSignIn));
    }
  }
}

export default ApplicationContoller;
