import { ApplicationPage } from '../types/ApplicationPage';
import { AuthPageView } from '../views/authPageView';
import { User } from '../types/User';
import Api from '../Api';

export class AuthPage extends ApplicationPage {
  authPageView: AuthPageView;

  api: Api;

  constructor() {
    super();
    this.setView();
  }

  setView(): void {
    this.api = new Api();
    this.authPageView = new AuthPageView();
    this.view = this.authPageView.view;
    this.authPageView.addContent();
    this.addListeners();
  }

  async createUser(user: User): Promise<void> {
    await this.api.createUser(user).then(
      (result: Response): void => {
        if (result.ok) {
          // обработка запроса
        }
      },
      (error: Error): never => {
        throw error;
      },
    );
  }

  addListeners(): void {
    this.view.querySelector('#create-user')?.addEventListener('click', (): void => {
      const user: User = new User('UserName', 'example@gmail.com', '12345678');
      this.createUser(user);
    });
  }
}

export default AuthPage;
