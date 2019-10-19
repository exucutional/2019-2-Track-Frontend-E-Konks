/* eslint-disable linebreak-style */
const template = document.createElement('template');
template.innerHTML = `
    <style>
        .flex-container-row {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            background-color: #C8A2C8;
            height: 6.5vh;
        }

        .burger-button {
            display: flex;
            width: 3em;
        }

        .search-button {
            width: 2em;
            margin-right: 10px;
        }

        .title {
            display: flex;
            font-size: 6.5vh;
            align-self: center;
            margin-bottom: 10px;
            font-family: monospace;
        }
    </style>
    <form>
        <div class='flex-container-row'>
            <img src='https://image.flaticon.com/icons/svg/60/60510.svg' class='burger-button'>
            <span class='title'>Messenger</span>
            <img src='https://image.flaticon.com/icons/svg/149/149309.svg' class='search-button'>
            </div>
        </div>
    </form
`;

class ChatHeadForm extends HTMLElement {
  constructor() {
    super();
    this._shadowRoot = this.attachShadow({ mode: 'open' });
    this._shadowRoot.appendChild(template.content.cloneNode(true));
  }
}

customElements.define('chat-head-form', ChatHeadForm);
