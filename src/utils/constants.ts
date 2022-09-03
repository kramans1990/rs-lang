const baseUrl = 'https://rs-lang-team112.herokuapp.com';

const signInButtonText = 'Войти';
const upperSignInButtonText = 'ВОЙТИ';
const logOutText = 'Выйти';
const signInTitle = 'Следи за статистикой в своем аккаунте';
const signUpTitle = 'Создай свой аккаунт';

const signUpButtonText = 'Зарегистрироваться';
const upperSignUpButtonText = 'ЗАРЕГИСТРИРОВАТЬСЯ';
const name = 'Имя';
const email = 'Почта';
const password = 'Пароль';
const haveNotYetAccountText = 'Ещё не успели создать аккаунт?';
const haveAccountText = 'Уже есть аккаунт?';

const invalidEmail = 'Invalid email';
const invalidPassword = 'Password should contain digits, letters or both';

/* prettier-ignore */

const mainPageText = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.';

/* prettier-ignore */

const rsLang = 'RS Lang';
const learnButtonText = 'Учиться';
const playButtonText = 'Играть';

const numberOfLevels = 7; // 6 + 1(все сложные слова)
const numberOfPagesInLevel = 30;
const btnHardText = 'сложные';
const btnLevelText = 'уровень ';
const sprintGameName = 'Спринт';
const audioGameName = 'Аудиовызов';
const extraGameName = 'Экстра';
const hardButtonText = 'Сложное';
const hardButtonTextOpposite = 'несложное';
const doneButtonText = 'Изучено';
const doneButtonTextOpposite = 'поучить';
const iconSprintSrc = './assets/svg/icon_sprint.svg';
const iconAudioGameSrc = './assets/svg/icon_audio_game.svg';
const iconExtraGameSrc = './assets/svg/icon_audio_game.svg';

const team = [
  {
    name: 'Raman Saksonau',
    description:
      'Тут можно несколько слов о себе. О том, как докатился до этого. Какие планы на будущее.',
    slogan: 'Девиз по жизни',
    img: './assets/team/roma.eps',
    points: ['тимлид', 'backend', 'архитектура', 'статистика', 'Аудиовызов'],
  },
  {
    name: 'Tatsiana Rusak',
    description:
      '"Если ничего не получится, то в результате недели обучения у меня просто образуется несколько новых нейронных связей..." Так я думала в начала Stage-0. Но я уже полгода на этом замысловатом пути. И связей этих образовалось - вооооот столько!',
    slogan: 'Лучшее время для перемен - сегодня.',
    img: './assets/team/tanya.eps',
    points: ['дизайн', 'учебник', 'о команде'],
  },
  {
    name: 'Vladislav Fomenko',
    description:
      'Тут можно несколько слов о себе. О том, как докатился до этого. Какие планы на будущее.',
    slogan: 'Девиз по жизни',
    img: './assets/team/vlad.eps',
    points: ['авторизация', 'главная', 'Спринт', 'адский reviewer'],
  },
];

export {
  baseUrl,
  signUpButtonText,
  signInButtonText,
  signInTitle,
  email,
  password,
  haveNotYetAccountText,
  haveAccountText,
  invalidEmail,
  invalidPassword,
  signUpTitle,
  name,
  upperSignUpButtonText,
  upperSignInButtonText,
  mainPageText,
  rsLang,
  learnButtonText,
  playButtonText,
  numberOfLevels,
  btnHardText,
  btnLevelText,
  sprintGameName,
  audioGameName,
  extraGameName,
  logOutText,
  hardButtonText,
  hardButtonTextOpposite,
  doneButtonText,
  doneButtonTextOpposite,
  numberOfPagesInLevel,
  iconSprintSrc,
  iconAudioGameSrc,
  iconExtraGameSrc,
  team,
};
