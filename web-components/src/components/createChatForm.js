/* eslint-disable linebreak-style */
/* eslint-disable class-methods-use-this */
/* eslint-disable linebreak-style */
const template = document.createElement('template');
template.innerHTML = `
    <style>
        .create-form {
            display: inherit;
        }


        input {
            display: inherit;
            width: 100%;
            font-size: 30px;
        }

        form {
            display: inherit;
        }
    </style>
    <form>
        <div class='create-form'>
            <input type='text' placeholder='Название чата'></input>
        </div>
    </form>
`;

class CreateChatForm extends HTMLElement {
  constructor() {
    super();
    this._shadowRoot = this.attachShadow({ mode: 'open' });
    this._shadowRoot.appendChild(template.content.cloneNode(true));

    this.$form = this._shadowRoot.querySelector('form');
    this.$input = this._shadowRoot.querySelector('input');
  }

  static get observedAttributes() {
    return ['name', 'value', 'placeholder', 'disabled'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    this.$input.setAttribute(name, newValue);
  }

  get value() {
    const result = this.$input.value;
    this.$input.value = '';
    return result;
  }
}

customElements.define('create-chat-form', CreateChatForm);
