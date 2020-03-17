/* eslint-disable linebreak-style */
const template = document.createElement('template');
template.innerHTML = `
    <style>
        .flex-container-row {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            background-color: #8E24AA;
            height: 8vh;
        }

        .burger-button {
            display: flex;
            width: 3em;
            margin-left: 10px;
        }

        .search-button {
            width: 2em;
            margin-right: 10px;
            filter: invert(1);
        }

        .title {
            display: flex;
            font-size: 7vh;
            align-self: center;
            font-family: monospace;
            color: white;
        }
    </style>
    <form>
        <div class='flex-container-row'>
            <img src='http://vcmediapartners.com/media/images/hamburger-white.svg' class='burger-button'>
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
