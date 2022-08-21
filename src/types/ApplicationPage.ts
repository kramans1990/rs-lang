export abstract class ApplicationPage {
  view: HTMLDivElement | HTMLFormElement;

  constructor() {
    this.setView();
  }

  abstract setView(): void;
}
export default ApplicationPage;
