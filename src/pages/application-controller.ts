/* eslint-disable import/no-cycle */
import Api from '../Api';
import { getDataFromLocalStorage, saveDataToLocalStorage } from '../functions/functions';
import { ISignIn } from '../types/interfaces';
import ApplicationView from './application-view';

class ApplicationContoller {
  pageView: ApplicationView;

  api: Api = new Api();

  async updateRefreshToken() {
    if (getDataFromLocalStorage('rs-lang-user') !== null) {
      const signIn = getDataFromLocalStorage('rs-lang-user') as unknown as ISignIn;
      const response = await this.api.updateRefreshToken(signIn);
      if (response.ok) {
        const newSignIn = (await response.json()) as ISignIn;
        console.log(newSignIn, 'refresh');
        newSignIn.message = signIn.message;
        newSignIn.userId = signIn.userId;
        newSignIn.name = signIn.name;
        saveDataToLocalStorage('rs-lang-user', JSON.stringify(newSignIn));
      } else {
        console.log('пиздец updateRefreshToken');
        throw new Error(await response.text());
      }
    }
  }

  async updateToken() {
    if (getDataFromLocalStorage('rs-lang-user') !== null) {
      const signIn = getDataFromLocalStorage('rs-lang-user') as unknown as ISignIn;
      const response = await this.api.updateToken(signIn);
      if (response.ok) {
        const newSignIn = (await response.json()) as ISignIn;
        console.log(newSignIn, 'token');
        saveDataToLocalStorage('rs-lang-user', JSON.stringify(newSignIn));
      } else {
        console.log('пиздец updateToken');
        throw new Error(await response.text());
      }
    }
  }
}

export default ApplicationContoller;
