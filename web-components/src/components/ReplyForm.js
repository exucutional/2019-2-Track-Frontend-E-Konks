/* eslint-disable no-underscore-dangle */
const template = document.createElement('template');
template.innerHTML = `
    <style>
        .message {
            position: relative;
            display: flex;
            color: white;
            word-break: break-word;
            white-space: pre-wrap;
            background: white;
            border: 0.5rem solid;
            border-radius: .4em;
            border-color: rgba(0, 0, 0, 0);
            width: fit-content;
            max-width: 45vw;
            margin-left: 20px;
            margin-top: 5px;
            color: black;
        }

        .message:after {
            content: '';
            position: absolute;
            top: 0;
            left: 10px;
            width: 0;
            height: 0;
            border: 15px solid transparent;
            border-bottom-color: white;
            border-top: 0;
            border-left: 0;
            margin-left: -13.5px;
            margin-top: -15px;
        }

        .flex-container-column {
            display: flex;
            flex-direction: column;
            margin-bottom: 10px;
        }

        .flex-container-row {
            display: flex;
            flex-direction: row;
            height: 25px;
            margin-left: 2px;
        }

        .name {
            font-size: 15px;
            color: darkgrey;
            margin-right: 10px;
            margin-left: 10px;
        }

        .time {
            font-size: 15px;
            color: darkgrey;
            margin-right: 10px;
        }
    </style>
    <form>
        <div class="flex-container-column">
            <div class="flex-container-row">
                <svg width="25px" height="25px" viewBox="0 0 32 32">
                    <circle cx="16" cy="16" r="16" fill="rgba(60, 190, 170, 0.71)"/>
                </svg>
                <div class="name"></div>
                <div class="time"></div>
            </div>
            <div class="message"></div>
        </div>
    </form> 
`;

class ReplyForm extends HTMLElement {
  constructor() {
    super();
    this._shadowRoot = this.attachShadow({ mode: 'open' });
    this._shadowRoot.appendChild(template.content.cloneNode(true));

    this.$form = this._shadowRoot.querySelector('form');
    this.$name = this._shadowRoot.querySelector('.name');
    this.$time = this._shadowRoot.querySelector('.time');
    this.$message = this._shadowRoot.querySelector('.message');
  }

  attributeChangedCallback(name, oldValue, newValue) {
    this.setAttribute(name, newValue);
  }
}

customElements.define('reply-form', ReplyForm);
