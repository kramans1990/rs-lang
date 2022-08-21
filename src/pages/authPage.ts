import { ApplicationPage } from '../types/ApplicationPage';
import { AuthPageView } from '../views/authPageView';
import { User } from '../types/User';
import * as api from '../Api';

export class AuthPage extends ApplicationPage {
  authPageView: AuthPageView;

  constructor() {
    super();
    this.setView();
  }

  setView(): void {
    this.authPageView = new AuthPageView();
    this.view = this.authPageView.view;
    this.authPageView.addContent();
    this.addListenears();
  }

  createUser(user: User): void {
    api.creteUser(user).then(
      async (result) => {
        console.log(result);
        if (result.ok) {
          // обработка запроса
        }
      },
      (error) => {
        throw error;
      },
    );
  }

  addListenears() {
    this.view.querySelector('#create-user')?.addEventListener('click', () => {
      const user: User = new User('UserName', 'example@gmail.com', '12345678');
      this.createUser(user);
    });
  }
}
export default AuthPage;
