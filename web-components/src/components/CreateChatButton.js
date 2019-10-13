/* eslint-disable linebreak-style */
/* eslint-disable class-methods-use-this */
/* eslint-disable linebreak-style */
import './CreateChatForm';

const template = document.createElement('template');
template.innerHTML = `
    <style>
    .create-chat-button-obj {
        width: 2em;
        pointer-events: none;
    }

    .create-chat-button {
        width: 2em;
        position: fixed;
        right: 20px;
        bottom: 20px;
    }

    create-chat-form {
        display: none;
        margin: 1em;
        border: solid;
        width: fit-content;
    }
    </style>
    <form>
        <create-chat-form></create-chat-form>
        <div class='create-chat-button'>
            <object
                class="create-chat-button-obj"
                type="image/svg+xml"
                data="data/pen.svg">
                <img src="data/pen.svg">
            </object>
        </div>
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
