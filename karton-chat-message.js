import { KartonElement, html } from 'kartonjs';

class KartonChatMessage extends KartonElement {

  template() {
    const from = this.from;
    const text = this.text;
    const isUser = from === 'user';

    return html`
      <style>
        .chat-bubble {
          max-width: 70%;
          padding: 0.6em 1em;
          margin: 0.5em;
          border-radius: 1em;
          font-size: 1em;
          line-height: 1.4;
          display: inline-block;
        }

        .from-user {
          background-color: #d0a675;
          color: white;
          align-self: flex-end;
          margin-left: auto;
        }

        .from-bot {
          background-color: #f4e9dc;
          color: #3e2e1e;
          align-self: flex-start;
          margin-right: auto;
        }
      </style>
      <div class=${'chat-bubble ' + (isUser ? 'from-user' : 'from-bot')}>
        ${text}
      </div>
    `;
  }
}

customElements.define('karton-chat-message', KartonChatMessage);

