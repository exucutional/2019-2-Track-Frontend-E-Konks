const template = document.createElement('template');
template.innerHTML = `
    <style>
        .message {
            display: flex;
            color: white;
            word-break: break-word;
            white-space: pre-wrap;
            background: coral;
            border: 0.5rem solid;
            border-radius: 20px;
            border-color: coral;
            width: fit-content;
            max-width: 300px;
            margin-left: 20px;
        }

        .flex-container-column {
            display: flex;
            flex-direction: column;
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
        }
    </style>
    <form>
        <div class="flex-container-column">
            <div class="flex-container-row">
                <svg width="25px" height="25px" viewBox="0 0 32 32">
                    <circle cx="16" cy="16" r="16" fill="red"/>
                </svg>
                <div class="name"></div>
                <div class="time"></div>
            </div>
            <div class="message"></div>
        </div>
    </form> 
`;

class ReplyForm extends HTMLElement {
    constructor () {
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
