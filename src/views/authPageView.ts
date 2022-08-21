export class AuthPageView {
  view: HTMLDivElement;

  constructor() {
    this.view = document.createElement('div');
    this.view.innerHTML = '<h1>AuthPageView</h1>';
  }

  addContent() {
    this.view.innerHTML += "<button id='create-user'>CreateUser</button>";
  }
}
export default AuthPageView;
