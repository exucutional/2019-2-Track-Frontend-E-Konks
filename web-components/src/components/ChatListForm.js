/* eslint-disable linebreak-style */
/* eslint-disable prefer-destructuring */
/* eslint-disable linebreak-style */
/* eslint-disable no-restricted-syntax */
/* eslint-disable class-methods-use-this */
/* eslint-disable linebreak-style */
import './CreateChatButton';
import './ChatHeadForm';

const template = document.createElement('template');
template.innerHTML = ` 
    <style>
        .chat-block {
            display: flex;
            flex-direction: column;
            overflow-y: auto;
        }
    </style>
    <form>
        <chat-head-form></chat-head-form>
        <div class='flex-container'>
            <div class='chat-block'></div>
        </div>
        <create-chat-button></create-chat-button>
    </form>
`;

class ChatListForm extends HTMLElement {
  constructor() {
    super();
    this._shadowRoot = this.attachShadow({ mode: 'open' });
    this._shadowRoot.appendChild(template.content.cloneNode(true));

    this.$chatBlock = this._shadowRoot.querySelector('.chat-block');
    this.$createChatButton = this._shadowRoot.querySelector('create-chat-button');
    this.$createChatButton.addEventListener('submit', this._onSubmit.bind(this));
    this.load();
    // document.querySelector('message-form').remove();
    // document.querySelector('body').append(document.createElement('message-form'));
  }

  load() {
    const jsonIn = localStorage.getItem('chats');
    this.$chatBlock.innerHTML = '';
    if (jsonIn) {
      const chats = JSON.parse(jsonIn);
      for (const chat of chats) {
        const chatf = document.createElement('chat-form');
        chatf.name = chat.name;
        if (chat.conversation.length > 0) {
          const lastReply = chat.conversation.slice(-1)[0];
          chatf.lastMessage = lastReply.message;
          chatf.time = lastReply.time;
          chatf.$indicator.style.display = 'block';
        }
        this.$chatBlock.append(chatf);
      }
    }
  }

  save(chatName) {
    const saveForm = {
      name: chatName,
      conversation: [],
    };
    const indata = localStorage.getItem('chats');
    let chats = [];
    if (indata) {
      chats = JSON.parse(indata);
    }
    chats.push(saveForm);
    const outdata = JSON.stringify(chats);
    localStorage.setItem('chats', outdata);
    this.load();
  }

  _onSubmit(event) {
    event.preventDefault();
    const chatf = document.createElement('chat-form');
    const chatName = this.$createChatButton.chatName;
    if (chatName) {
      chatf.name = chatName;
      this.$chatBlock.append(chatf);
      this.save(chatName);
    }
  }
}

customElements.define('chat-list-form', ChatListForm);
