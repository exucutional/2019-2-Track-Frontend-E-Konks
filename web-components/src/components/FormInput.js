/* eslint-disable no-underscore-dangle */
const template = document.createElement('template');
template.innerHTML = `
    <style>
        input {
            width: calc(100%);
            font-size: 30px;
            border: none;
        } 

        .paperclip {
            max-width: 1em;
            transform: rotate(90deg);
        }

        :host {
            display: flex;
            border: 1px solid rgba(25, 25, 25, 0.32);
        }

        .container {
            font-size: 20px;
            width: 30em;
            display: flex;
            align-items: center;
            margin-right: 10px;
        }

        input[type='radio'] {
            width: unset;
            margin-left: 20px;
        }
    </style>
    <input class='message' type="text">
    <div class='container'>
        <span>Message from:</span>
        <input type='radio' name='name' value='You' checked>You
        <input type='radio' name='name' value='Companion'>Companion
    </div>
    <img src='https://image.flaticon.com/icons/svg/54/54848.svg' class='paperclip'>
`;

class FormInput extends HTMLElement {
  constructor() {
    super();
    this._shadowRoot = this.attachShadow({ mode: 'open' });
    this._shadowRoot.appendChild(template.content.cloneNode(true));

    this.$input = this._shadowRoot.querySelector('.message');
    this.$you = this._shadowRoot.querySelector("input[value='You']");
    this.$companion = this._shadowRoot.querySelector("input[value='Companion']");
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

  get name() {
    if (this.$you.checked) {
      return { name: 'You', host: true };
    }
    return { name: 'Companion', host: false };
  }
}

customElements.define('form-input', FormInput);
