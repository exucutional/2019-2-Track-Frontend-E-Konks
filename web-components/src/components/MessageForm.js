/* eslint-disable class-methods-use-this */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-undef */
/* eslint-disable no-underscore-dangle */
/* eslint-disable prefer-template */
const template = document.createElement('template');
template.innerHTML = `
    <style>
        form-input {
            display: flex;
            width: 100%;
            align-self: flex-end;
        }

        .reply {
            display: flex;
            color: red;
            word-break: break-word;
            white-space: pre-wrap;
        }

        .reply-block {
            display: flex;
            flex-direction: column;
            overflow-y: auto;
            width: -webkit-fill-available;
            flex: 1;
        }

        .flex-container {
            display: flex;
            flex-direction: column;
            height: -webkit-fill-available;
            overflow: hidden;
        }

        .head {
            display: flex;
            color: white;
            background: orange;
            margin: unset;
            padding: 15px;
            margin-bottom: 2px;
            font-family: monospace;
            flex-direction: row;
            height: 0.5em;
        }

        .obj-back-button {
            display: flex;
            width: 1.5em;
            height: 2em;
            pointer-events: none;
            margin-top: -0.6em;
        }

        .back-button {
          display: flex;
          height: 1em;
          margin-top: -0.2em
        }
      
        .title {
          display: flex;
          flex: 1;
          justify-content: center;
        }

        input[type=submit] {
            visibility: collapse;
        }

        form-input {
          height: 2em;
        }
    </style>
    <form>
        <div class="flex-container">
            <h1 class="head">
                <div class="back-button">
                  <object
                      class="obj-back-button"
                      type="image/svg+xml"
                      data="data/angle-left.svg">
                      <img src="data/angle-left.svg">
                  </object>
                </div>
                <span class="title">Chat Screen</span>
            </h1>
            <div class="reply-block">
            </div>
            <form-input name="message-text" placeholder="Введите сообщение"></form-input>
        </div>
    </form> 
`;

class MessageForm extends HTMLElement {
  constructor() {
    super();
    this._shadowRoot = this.attachShadow({ mode: 'open' });
    this._shadowRoot.appendChild(template.content.cloneNode(true));
    this.$form = this._shadowRoot.querySelector('form');
    this.$input = this._shadowRoot.querySelector('form-input');
    this.$replyBlock = this._shadowRoot.querySelector('.reply-block');
    this.$backButton = this._shadowRoot.querySelector('.back-button');
    this.$chatName = this.getAttribute('name') || null;

    this.$form.addEventListener('submit', this._onSubmit.bind(this));
    this.$form.addEventListener('keypress', this._onKeyPress.bind(this));
    this.$backButton.addEventListener('click', this._onClickBack.bind(this));
    this.load();
  }

  static get observedAttributes() {
    return ['name'];
  }

  // eslint-disable-next-line no-unused-vars
  attributeChangedCallBack(name, oldValue, newValue) {
    this.load();
  }

  load() {
    const jsonIn = localStorage.getItem('chats');
    if (jsonIn) {
      const chats = JSON.parse(jsonIn);
      chat = chats.find((ch) => ch.name === this.$chatName);
      if (chat && this.$chatName) {
        for (reply of chat.conversation) {
          const replyf = document.createElement('reply-form');
          replyf.$message.innerText = reply.message;
          replyf.$name.innerText = reply.name;
          replyf.$time.innerText = reply.time;
          if (reply.name === 'You') {
            replyf.style['align-self'] = 'flex-end';
          }
          this.$replyBlock.append(replyf);
        }
      }
    }
  }

  _onSubmit(event) {
    event.preventDefault();
    const reply = document.createElement('reply-form');
    reply.$message.innerText = this.$input.value;
    const { name, host } = this.$input.name;
    if (reply.$message.innerText) {
      reply.$name.innerText = name;
      const date = new Date();
      let h = date.getHours();
      h = (h < 10) ? '0' + h : h;
      let m = date.getMinutes();
      m = (m < 10) ? '0' + m : m;
      reply.$time.innerText = h + ':' + m;
      if (host) {
        reply.style['align-self'] = 'flex-end';
      }
      this.$replyBlock.append(reply);
      this.$replyBlock.scrollTop = this.$replyBlock.scrollHeight;
      this.save(reply.$name.innerText, reply.$time.innerText, reply.$message.innerText);
    }
    // this.$message.innerText = this.$input.value;
  }

  save(name_, time_, message_) {
    const reply = {
      name: name_,
      time: time_,
      message: message_,
    };
    let chat = {
      name: this.$chatName,
      conversation: [],
    };
    let chats = [chat];
    const jsonIn = localStorage.getItem('chats');
    if (jsonIn) {
      chats = JSON.parse(jsonIn);
      chat = chats.find((ch) => ch.name === this.$chatName);
    }
    chat.conversation.push(reply);
    const outdata = JSON.stringify(chats);
    localStorage.setItem('chats', outdata);
  }

  _onKeyPress(event) {
    if (event.keyCode === 13) {
      this.$form.dispatchEvent(new Event('submit'));
    }
  }

  _onClickBack(event) {
    event.preventDefault();
    const chatList = document.createElement('chat-list-form');
    document.querySelector('message-form').remove();
    document.querySelector('body').append(chatList);
  }
}

customElements.define('message-form', MessageForm);
