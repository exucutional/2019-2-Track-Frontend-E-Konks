/* eslint-disable linebreak-style */
const template = document.createElement('template');
template.innerHTML = `
    <style>
        .flex-container-row {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            background-color: orange;
            height: 2em;
        }

        .burger-button {
            display: flex;
            margin-left: 10px;
        }

        .search-button {
            width: 2em;
            margin-right: 10px;
        }

        .title {
            display: flex;
            font-size: 60px;
            margin-top: 10px;
            font-family: monospace;
        }
    </style>
    <form>
        <div class='flex-container-row'>
            <div class='burger-button'>
                <object
                    class="burger-button-obj"
                    type="image/svg+xml"
                    data="data/burger.svg">
                    <img src="data/burger.svg">
                </object>
            </div>
            <span class='title'>Messenger</span>
            <div class='search-button'>
                <object
                    class="search-button-obj"
                    type="image/svg+xml"
                    data="data/search.svg">
                    <img src="data/search.svg">
                </object>
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
