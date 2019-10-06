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
            display: block;
            color: white;
            text-align: center;
            background: orange;
            margin: unset;
            padding: 20px;
            margin-bottom: 2px;
            font-family: monospace;
        }

        input[type=submit] {
            visibility: collapse;
        }
    </style>
    <form>
        <div class="flex-container">
            <h1 class="head">Chat Screen</h1>
            <div class="reply-block">
            </div>
            <form-input name="message-text" placeholder="Введите сообщение"></form-input>
        </div>
    </form> 
`;

class MessageForm extends HTMLElement {
    constructor () {
        super();
        this._shadowRoot = this.attachShadow({ mode: 'open' });
        this._shadowRoot.appendChild(template.content.cloneNode(true));
        this.$form = this._shadowRoot.querySelector('form');
        this.$input = this._shadowRoot.querySelector('form-input');
        this.$reply_block = this._shadowRoot.querySelector('.reply-block');

        this.$form.addEventListener('submit', this._onSubmit.bind(this));
        this.$form.addEventListener('keypress', this._onKeyPress.bind(this));
        this.loadConversation();
    }

    loadConversation() {
        var log = localStorage.getItem('local');
        var conversation = JSON.parse(log);
        for (reply of conversation) {
            let replyf = document.createElement('reply-form');
            replyf.$message.innerText = reply.message;
            replyf.$name.innerText = reply.name;
            replyf.$time.innerText = reply.time;
            this.$reply_block.append(replyf);
        }
    }

    _onSubmit (event) {
        event.preventDefault();
        let reply = document.createElement('reply-form');
        reply.$message.innerText = this.$input.value;
        reply.$name.innerText = 'Name';
        let date = new Date();
        h = date.getHours();
        h = (h < 10) ? '0' + h : h;
        m = date.getMinutes();
        m = (m < 10) ? '0' + m : m; 
        reply.$time.innerText = h + ':' + m;
        this.$reply_block.append(reply);
        this.$reply_block.scrollTop = this.$reply_block.scrollHeight;
        this.save(reply.$name.innerText, reply.$time.innerText, reply.$message.innerText);
        //this.$message.innerText = this.$input.value;
    }

    save(name_, time_, message_) {
        let reply = {
            name: name_,
            time: time_,
            message: message_
        };
        let indata = localStorage.getItem('local');
        let conversation = [];
        if (indata) {
            conversation = JSON.parse(indata);
        } 
            conversation.push(reply);
            let outdata = JSON.stringify(conversation);
            localStorage.setItem('local', outdata);
    }

    _onKeyPress (event) {
        if (event.keyCode == 13) {
            this.$form.dispatchEvent(new Event('submit'));
        }
    }
}

customElements.define('message-form', MessageForm);
