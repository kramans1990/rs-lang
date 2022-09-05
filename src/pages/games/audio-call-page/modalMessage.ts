class ModalMessage {
  modal: HTMLDivElement;

  constructor(messageText: string) {
    const modal = document.createElement('div');
    modal.className = 'modal-message hidden';
    const modalMessage = document.createElement('div');
    modalMessage.className = 'modal-message-content';
    const close = document.createElement('span');
    close.innerText = 'x';
    close.className = 'modal-message-close';
    const divMessage = document.createElement('div');
    divMessage.className = 'message-text';
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
