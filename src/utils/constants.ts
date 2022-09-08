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
const invalidPassword = 'Password should contain digits, letters or both, minimum 8 characters';

/* prettier-ignore */

const mainPageText1 = 'Перед вами приложение для эффективного изучения иностранных слов в игровой форме. Тратя всего несколько минут в день, вы обогатите словарный запас и приблизитесь к своей цели наконец-то выучить английский.';

/* prettier-ignore */

const mainPageText2 = 'Дополнительно приложение позволяет прокачать навык аудирования и понять, как применять выученные слова и фразы в жизни. Игры превратят изучение языка в удовольствие и позволят с лёгкостью запоминать новые слова. Начни изучать английский прямо сейчас!';

const rsLang = 'RS Lang';
const learnButtonText = 'Учиться';
const playButtonText = 'Играть';

const numberOfLevels = 7; // 6 + 1 (все сложные слова)
const numberOfPagesInLevel = 30;
const numberOfCardsPerPage = 20;
const btnHardText = 'сложные';
const btnLevelText = 'уровень ';
const audioGameName = 'Аудиовызов';
const sprintGameName = 'Спринт';
const extraGameName = 'Экстра';
const hardButtonText = 'Сложное';
const doneButtonText = 'Изучено';
const NoHardWordsText = '<p>У вас пока нет сложных слов.<p>';
const iconSprintSrc = './assets/svg/icon_sprint.svg';
const iconAudioGameSrc = './assets/svg/icon_audio_game.svg';
const iconExtraGameSrc = './assets/svg/icon_audio_game.svg';
const progressForDoneWord = 100;
const progressForNoDoneWord = 0;

const backButtonText = 'Назад';
const levelText = 'Уровень';
const levelSelectLabelText = 'Выберите уровень сложности';
const newAudioGameButtonText = 'Новая игра Аудиовызов (N)';
const newSprintGameButtonText = 'Новая игра Спринт (N)';
const skipText = 'Пропустить (Space)';
const nextText = 'Далее (Space)';
const correctAnswerAudioLink = './assets/answer-correct.wav';
const wrongAnswerAudioLink = './assets/answer-wrong.wav';

const correctResultsText = 'Верные ответы';
const incorrectResultsText = 'Неверные ответы:';
const resultsText = 'Результаты';

const sprintTime = 60;
const correctText = 'Верно';
const incorrectText = 'Неверно';
const arrowRight = '→';
const arrowLeft = '←';
const millisecondsInHour = 3600000;

const team = [
  {
    name: 'Роман Саксонов',
    description:
      'Обучение в RSS - крутой квест, отличная возможность испытать себя. А распределять обязанности в команде - вообще кайф!',
    slogan: 'Добро побеждает зло.',
    img: './assets/team/roma.svg',
    points: ['backend', 'архитектура', 'статистика', 'аудиовызов', 'тимлид'],
  },
  {
    name: 'Владислав Фоменко',
    description:
      'Год назад в твиттере увидел отзыв о школе - и понеслось. Мечтаю переехать из России.',
    slogan: 'Россия будет свободной!',
    img: './assets/team/vlad.svg',
    points: ['авторизация', 'главная', 'спринт', 'адский reviewer'],
  },
  {
    name: 'Татьяна Русак',
    description:
      '"Если ничего не получится, то в результате недели обучения у меня просто образуется несколько новых нейронных связей..." - так я думала в начале Stage-0. \n И вот я уже почти год на этом замысловатом пути... И\u00A0связей этих образовалось - вооооооооот столько!',
    slogan: 'Лучшее время для перемен - сегодня.',
    img: './assets/team/tanya.svg',
    points: ['дизайн', 'учебник', 'о команде', 'адаптив'],
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
  mainPageText1,
  mainPageText2,
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
  doneButtonText,
  numberOfPagesInLevel,
  numberOfCardsPerPage,
  iconSprintSrc,
  iconAudioGameSrc,
  iconExtraGameSrc,
  team,
  sprintTime,
  correctText,
  incorrectText,
  correctResultsText,
  incorrectResultsText,
  resultsText,
  backButtonText,
  levelText,
  levelSelectLabelText,
  newAudioGameButtonText,
  newSprintGameButtonText,
  arrowRight,
  arrowLeft,
  skipText,
  nextText,
  progressForDoneWord,
  progressForNoDoneWord,
  NoHardWordsText,
  millisecondsInHour,
  correctAnswerAudioLink,
  wrongAnswerAudioLink,
};
