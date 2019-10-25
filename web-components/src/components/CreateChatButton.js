/* eslint-disable linebreak-style */
/* eslint-disable class-methods-use-this */
/* eslint-disable linebreak-style */
import './CreateChatForm';

const template = document.createElement('template');
template.innerHTML = `
    <style>
    .create-chat-button {
        width: 2.5em;
        position: fixed;
        right: 20px;
        bottom: 20px;
    }

    .create-chat-button:hover {
        cursor: pointer;
        animation: pulse 2s infinite ease-in-out;
        background-color: lighten($primary, 25%);
    }

    create-chat-form {
        display: none;
        margin: 1em;
        border: solid;
        width: fit-content;
    }

    @keyframes pulse {
      0% {
        transform: scale(1, 1);
      }
      25% {
        transform: scale(1, 1);
        filter: opacity(1);
      }
      50% {
        transform: scale(1.2, 1.2);
        filter: opacity(0.5);
      }
      100% {
        transform: scale(1, 1);
        filter: opacity(1);
      }
    }

    </style>
    <form>
        <create-chat-form></create-chat-form>
        <img src='https://image.flaticon.com/icons/svg/1159/1159633.svg' class='create-chat-button'>
    </form
`;

class CreateChatButton extends HTMLElement {
  constructor() {
    super();
    this._shadowRoot = this.attachShadow({ mode: 'open' });
    this._shadowRoot.appendChild(template.content.cloneNode(true));

    this.$form = this._shadowRoot.querySelector('form');
    this.$createChatForm = this._shadowRoot.querySelector('create-chat-form');
    this.$createChatButton = this._shadowRoot.querySelector('.create-chat-button');
    this.$createChatButton.addEventListener('click', this._onClickCreateChat.bind(this));
    this.$createChatForm.addEventListener('keypress', this._onKeyPress.bind(this));
  }

  _onClickCreateChat(event) {
    event.preventDefault();
    this.$createChatForm.style.display = 'flex';
    document.querySelector('html').scrollTop += document.querySelector('html').scrollHeight;
  }

  _onKeyPress(event) {
    if (event.keyCode === 13) {
      event.preventDefault();
      this.$createChatForm.style.display = 'none';
      this.dispatchEvent(new Event('submit'));
    }
  }

  get chatName() {
    return this.$createChatForm.value;
  }
}

customElements.define('create-chat-button', CreateChatButton);
