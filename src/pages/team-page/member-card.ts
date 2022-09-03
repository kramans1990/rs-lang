import { team } from '../../utils/constants';

class MemberCard {
  view: HTMLDivElement;

  constructor(memberNum: number) {
    this.view = document.createElement('div');
    this.view.classList.add('member-card');

    this.createMemberCard(memberNum);
  }

  createMemberCard(memberNum: number) {
    const memberBlock = document.createElement('div');
    memberBlock.classList.add('member-card__info');
    const memberImg = document.createElement('img');
    memberImg.setAttribute('src', `${team[memberNum].img}`);
    memberImg.setAttribute('alt', 'avatar');
    const memberText = document.createElement('div');
    memberText.classList.add('member-card__text');
    const memberDescr = document.createElement('p');
    memberDescr.classList.add('member-card__descr');
    memberDescr.innerText = `${team[memberNum].description}`;
    const memberSlogan = document.createElement('p');
    memberSlogan.classList.add('member-card__slogan');
    memberSlogan.innerText = `${team[memberNum].slogan}`;
    memberText.append(memberDescr, memberSlogan);
    memberBlock.append(memberImg, memberText);
    const pointsBlock = MemberCard.createMemberPointsBlock(memberNum);
    pointsBlock.classList.add('member-card__points');
    this.view.append(memberBlock, pointsBlock);
  }

  static createMemberPointsBlock(memberNum: number): HTMLDivElement {
    const pointsBlock = document.createElement('div');
    for (let i = 0; i < team[memberNum].points.length; i += 1) {
      const point = document.createElement('p');
      point.classList.add(`point-${i}`);
      point.innerText = `${team[memberNum].points[i]}`;
      pointsBlock.append(point);
    }
    return pointsBlock;
  }
}

export default MemberCard;
