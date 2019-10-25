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
            height: 10vh;
            background: white;
            border-top: groove;
            border-right: none;
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
            background-color: rgba(0, 0, 0, 0.04);
        }

        .head {
            display: flex;
            background: #8E24AA;
            font-family: monospace;
            flex-direction: row;
            height: 8vh;
            margin-bottom: 10px;
        }

        .back-button {
          display: flex;
          height: auto;
          max-width: 3em;
          margin-left: 10px;
          filter: invert(1);
          animation: none;
        }
        
        .back-button:hover {
          filter: invert(0.5);
        }

        .title {
          display: flex;
          flex: 1;
          justify-content: center;
          font-size: 7vh;
          align-self: center;
          color: white;
          margin-right: 2vw;
        }

        input[type=submit] {
          visibility: collapse;
        }

        reply-form {
          margin-right: 10px;
          margin-left: 10px;
          width: fit-content;
        }

        reply-form:hover {
          background: #8e24aa17;
        }

    </style>
    <form>
        <div class="flex-container">
            <span class="head">
                <img src="https://image.flaticon.com/icons/svg/109/109618.svg" class='back-button'>
                <span class="title">Chat Screen</span>
            </span>
            <div class="reply-block">
            </div>
            <form-input name="message-text" placeholder="Сообщение"></form-input>
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
    this.$title = this._shadowRoot.querySelector('.title');
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
      if (this.$chatName !== null) {
        this.$title.innerHTML = this.$chatName;
      }
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
