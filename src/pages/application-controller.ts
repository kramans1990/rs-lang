import ApplicationView from './application-view';

class ApplicationContoller {
  pageView: ApplicationView;

  constructor(pageName?: string) {
    const footer = document.querySelector('footer') as HTMLElement;
    if (pageName) {
      if (pageName === 'audiocall' || pageName === 'sprint') {
        console.log(footer);
        footer.classList.add('hidden');
      }
    } else {
      footer.classList.remove('hidden');
    }
  }
}
export default ApplicationContoller;
