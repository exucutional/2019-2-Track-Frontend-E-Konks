/* eslint-disable class-methods-use-this */
/* eslint-disable linebreak-style */
const template = document.createElement('template');
template.innerHTML = `
    <style>
        .flex-container-row {
            display: flex;
            flex-direction: row;
        }
        .flex-container-column {
            display: flex;
            flex-direction: column;
        }
    </style>
    <form>
        <div class='flex-container-row'>
            <div class='flex-container-row'>
                <div class='flex-container-column'>
                    <span class='name'></span>
                    <span class='last-message'></span>
                </div>
                <div class='flex-container-column'>
                    <span class='time'></span>
                    <span class='indicator'></span>
                </div>
            </div>
        </div>
    </form>
`;

class ChatForm extends HTMLElement {
  constructor() {
    super();
    this._shadowRoot = this.attachShadow({ mode: 'open' });
    this._shadowRoot.appendChild(template.content.cloneNode(true));

    this.$form = this._shadowRoot.querySelector('form');
    this.$name = this._shadowRoot.querySelector('.name');
    this.$name.innerHTML = this.getAttribute('name') || undefined;
    this.$last_message = this._shadowRoot.querySelector('.last-message');
    this.$last_message.innerHTML = this.getAttribute('last-message') || undefined;
    this.$time = this._shadowRoot.querySelector('.time');
    this.$time.innerHTML = this.getAttribute('time') || undefined;
    this.$indicator = this._shadowRoot.querySelector('.indicator');
    this.$indicator.innerHTML = this.getAttribute('indicator') || undefined;

    this.$form.addEventListener('click', this._onClick.bind(this));
  }

  set name(value) {
    this.$name.innerHTML = value;
  }

  set lastMessage(value) {
    this.$last_message.innerHTML = value;
  }

  set time(value) {
    this.$time.innerHTML = value;
  }

  set indicator(value) {
    this.$indicator.innerHTML = value;
  }

  _onClick(event) {
    event.preventDefault();
    console.log('click');
  }
}

customElements.define('chat-form', ChatForm);
