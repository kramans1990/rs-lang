abstract class ApplicationPage {
  view: HTMLDivElement;

  constructor() {
    this.setView();
  }

  abstract setView(): void;
}

export default ApplicationPage;
