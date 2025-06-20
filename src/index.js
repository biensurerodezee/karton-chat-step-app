import { KartonElement, html } from 'kartonjs';

import './karton-chat-message.js'; // render each chat bubble

import steps from './steps.js';

class KartonApp extends KartonElement {
  init() {
    this.State('stepIndex', 0);
    this.State('chat', []);
    this.State('userResponses', []);
  }

  template() {
    const [stepIndex] = this.State('stepIndex');
    const [chat] = this.State('chat');
    const [userResponses] = this.State('userResponses');

    return html`
      <section>
        ${chat().map(msg => html`
          <karton-chat-message .text=${msg.text} .from=${msg.from}></karton-chat-message>
        `)}

        ${this.renderOptions(steps[stepIndex()], stepIndex())}
      </section>
    `;
  }

  renderOptions(step, stepIndex) {
    if (!step?.options) return '';

    return html`
      <div class="options">
        ${step.options.map(option => html`
          <button @click=${() => this.handleOption(option, stepIndex)}>
            ${option.text}
          </button>
        `)}
      </div>
    `;
  }

  handleOption(option, stepIndex) {
    const [, setStepIndex] = this.State('stepIndex');
    const [chat, setChat] = this.State('chat');
    const [userResponses, setUserResponses] = this.State('userResponses');

    // store user choice
    setUserResponses([...userResponses(), option.text]);

    // add user message
    setChat([...chat(), { text: option.text, from: 'user' }]);

    // advance to next step
    setStepIndex(stepIndex + 1);

    // add bot messages from next step (optional: delay)
    const nextStep = steps[stepIndex + 1];
    if (nextStep?.messages) {
      const msgs = nextStep.messages.map(m => ({
        text: m.replace('$lastUserMessage', option.text),
        from: 'bot',
      }));
      setChat([...chat(), { text: option.text, from: 'user' }, ...msgs]);
    }
  }
}

customElements.define('karton-app', KartonApp);

