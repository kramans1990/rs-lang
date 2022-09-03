import ApplicationContoller from '../application-controller';
import TeamView from './team-view';

class TeamController extends ApplicationContoller {
  constructor() {
    super();
    this.pageView = new TeamView();
  }
}

export default TeamController;
