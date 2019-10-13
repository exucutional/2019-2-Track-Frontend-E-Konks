/* eslint-disable no-restricted-syntax */
/* eslint-disable class-methods-use-this */
/* eslint-disable linebreak-style */
const template = document.createElement('template');
template.innerHTML = ` 
    <style>
    </style>
    <form>
        <div class='flex-container'>
            <div class='chat-block'>
                <chat-form name='Host' time='15:27' last-message='hello'></chat-form>
                <chat-form name='Host' time='15:27' last-message='hello'></chat-form>
            </div>
        </div>
    </form>
`;

class ChatListForm extends HTMLElement {
  constructor() {
    super();
    this._shadowRoot = this.attachShadow({ mode: 'open' });
    this._shadowRoot.appendChild(template.content.cloneNode(true));
    this.$chatBlock = this._shadowRoot.querySelector('.chat-block');
    // document.querySelector('message-form').remove();
    // document.querySelector('body').append(document.createElement('message-form'));
  }

  load() {
    const jsonIn = localStorage.getItem('chats');
    if (jsonIn) {
      const chats = JSON.parse(jsonIn);
      for (const chat of chats) {
        const chatf = document.createElement('chat-form');
        chatf.name = chat.name;
        const lastReply = chat.conversation.slice(-1)[0];
        chatf.lastMessage = lastReply.message;
        chatf.time = lastReply.time;
        this.$chatBlock.append(chatf);
      }
    }
  }

  save() {
    const saveForm = {
      name: undefined,
      conversation: [],
    };
    const indata = localStorage.getItem('chats');
    let chats = [];
    if (indata) {
      chats = JSON.parse(indata);
    }
    chats.push(saveForm);
    const outdata = JSON.stringify(chats);
    localStorage.setItem('local', outdata);
  }
}

customElements.define('chat-list-form', ChatListForm);
