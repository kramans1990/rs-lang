/* eslint-disable import/no-cycle */
import Api from '../Api';
import { getDataFromLocalStorage, saveDataToLocalStorage } from '../functions/functions';
import { ISignIn } from '../types/interfaces';
import { millisecondsInHour } from '../utils/constants';
import ApplicationView from './application-view';

class ApplicationContoller {
  pageView: ApplicationView;


  constructor(pageName?: string) {
    const footer = document.querySelector('footer') as HTMLElement;
    if (pageName) {
      if (pageName === 'audiocall' || pageName === 'sprint') {        
        footer.classList.add('hidden');
      }
    } else {
      footer.classList.remove('hidden');
    }}

  api: Api = new Api();

  async updateRefreshToken() {
    if (getDataFromLocalStorage('rs-lang-user') !== null) {
      const signIn = getDataFromLocalStorage('rs-lang-user') as unknown as ISignIn;
      const response = await this.api.updateRefreshToken(signIn);
      if (response.ok) {
        const newSignIn = (await response.json()) as ISignIn;
        newSignIn.message = signIn.message;
        newSignIn.userId = signIn.userId;
        newSignIn.name = signIn.name;
        saveDataToLocalStorage('rs-lang-user', JSON.stringify(newSignIn));
      } else {
        throw new Error(await response.text());
      }
    }
    window.setTimeout(await this.updateRefreshToken, millisecondsInHour);

  }
}

export default ApplicationContoller;
