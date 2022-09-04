class ModalMessage {
  // `<div class="modal-content">
  // <span class="modal-close">&times;</span>
  // <div class="div-result-flex">
  // <span>Результаты игры</Span>
  //  <span class="game-span-wrong">Неверные ответы:</span>
  //  <div class="answer-container-wrong"></div>
  //  <span class ="game-span-correct">Правильные ответы:</span>
  //  <div class="answer-container-correct"></div>
  // </div>
  // <button id="play-again" class="play-again-button"> Играть еще раз (A) </button>
  // </div>`;
  modal: HTMLDivElement;

  constructor(messageText: string) {
    const modal = document.createElement('div');
    modal.className = 'modal-message hidden';
    const modalMessage = document.createElement('div');
    modalMessage.className = 'modal-message-content';
    const close = document.createElement('span');
    close.innerText = "x";
    close.className = 'modal-message-close';
    const divMessage = document.createElement('div');
    divMessage.className = 'message-text'
    divMessage.innerText = messageText;
    modalMessage.append(close, divMessage);
    modal.appendChild(modalMessage);
    close.addEventListener('click', () => {
      modal.classList.add('hidden');
    });
    this.modal = modal;
  }
}
export default ModalMessage;
