/* eslint-disable linebreak-style */
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

        .name {
            font-size: 30px;
            margin-right: 10px;
            margin-left: 10px;
        }

        .last-message {
            color: darkgrey;
            font-size: 20px;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            margin-left: 20px;
        }

        .time {
            font-size: 18px;
            color: darkgrey;
            margin-left: 25px
        }

        .border-bottom {
            border-bottom: 2px solid darkgrey;
            padding-bottom: 10px;
            width: 20em;
            justify-content: space-between;
        }

        .top {
            align-items: baseline;
            justify-content: space-between;
        }

        .margin-top {
            margin-top: 10px;
        }

        .indicator {

        }

        form {
          margin-left: 5px;
        }

        .check-mark  {
          display: none;
          width: 0.9em;
        }
    </style>
    <form>
        <div class='flex-container-row margin-top'>
            <svg width="50px" height="50px" viewBox="0 0 32 32">
                <circle cx="16" cy="16" r="16" fill="red"/>
            <div class='flex-container-column'>
                <div class='flex-container-row top'>
                    <span class='name'></span>
                    <span class='time'></span>
                </div>
                <div class='flex-container-row bot border-bottom'>
                    <span class='last-message'></span>
                    <span class='indicator'></span>
                    <div class='check-mark'>
                      <object
                        class='check-mark-obj'
                        type='image/svg+xml'
                        data='data/tick.svg'>
                        <img src="data/tick.svg">
                      </object>
                    </div>
                </div>
                <div class='create-chat-button'>
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
    this.$name.innerHTML = this.getAttribute('name') || null;
    this.$last_message = this._shadowRoot.querySelector('.last-message');
    this.$last_message.innerHTML = this.getAttribute('last-message') || null;
    this.$time = this._shadowRoot.querySelector('.time');
    this.$time.innerHTML = this.getAttribute('time') || null;
    this.$indicator = this._shadowRoot.querySelector('.check-mark');
    this.$indicator.display = this.getAttribute('indicator') || null;

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

  _onClick(event) {
    event.preventDefault();
    const chat = document.createElement('message-form');
    chat.$chatName = this.$name.innerHTML;
    chat.load();
    document.querySelector('chat-list-form').remove();
    document.querySelector('body').append(chat);
  }
}

customElements.define('chat-form', ChatForm);
