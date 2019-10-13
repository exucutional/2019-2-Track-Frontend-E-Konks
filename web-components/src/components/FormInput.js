/* eslint-disable no-underscore-dangle */
const template = document.createElement('template');
template.innerHTML = `
    <style>
        input {
            width: calc(100%);
            font-size: 30px;
            
        } 

        .paperclip {
            width: 5%;
            transform: rotate(90deg);
        }

        :host {
            display: flex;
            border: 1px solid rgba(25, 25, 25, 0.32);
        }
    </style>
      <input type="text">
      <object
          class="paperclip"
          type="image/svg+xml"
          data="data/paperclip.svg">
          <img src="data/paperclip.svg">
      </object>
`;

class FormInput extends HTMLElement {
  constructor() {
    super();
    this._shadowRoot = this.attachShadow({ mode: 'open' });
    this._shadowRoot.appendChild(template.content.cloneNode(true));

    this.$input = this.shadowRoot.querySelector('input');
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

customElements.define('form-input', FormInput);
