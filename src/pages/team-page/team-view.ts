import ApplicationView from '../application-view';
import '../../styles/team.css';
import { team } from '../../utils/constants';
import MemberCard from './member-card';

class TeamView extends ApplicationView {
  view: HTMLDivElement;

  constructor() {
    super();
    this.renderTeamPage();
  }

  renderTeamPage() {
    this.view = document.createElement('div');
    this.view.classList.add('team-page');
    this.createMemberCards();
  }

  createMemberCards(): void {
    for (let memberNum = 0; memberNum < team.length; memberNum += 1) {
      const memberCard = new MemberCard(memberNum);
      this.view.append(memberCard.view);
    }
  }
}
export default TeamView;
