import { KartonElement, html } from 'kartonjs';
import './karton-chat-message.js';
import steps from './steps.js';

customElements.define('karton-app', class extends KartonElement {
  init() {
    this.colorClass = '';

    // 👇 define state getters BEFORE using them
    [this.getCurrentStep, this.setCurrentStep] = this.State('currentStep', 'home');
    [this.getChat, this.setChat] = this.State('chat', []);
    [this.getUserResponses, this.setUserResponses] = this.State('userResponses', []);

    [this.getMessageIndex, this.setMessageIndex] = this.State('messageIndex', 0);

    // ✅ safe now
    this.loadStep(this.getCurrentStep());
  }

  async loadStep(stepName) {
    const step = steps[stepName];
    if (!step) return;

    this.colorClass = step.color || '';
    this.setMessageIndex(0);
    this.setChat([]); // Start fresh for this step

    this.showNextMessage(stepName);
  }
/*
  async loadStep(stepName) {
    const step = steps[stepName];
    if (!step) return;

    const last = this.getUserResponses().at(-1) || '';
    const beforeLast = this.getUserResponses().at(-2) || '';

    const botMessages = Array.isArray(step.messages)
      ? step.messages.map(msg => ({
          text: typeof msg === 'string'
            ? msg.replace('$lastUserMessage', last).replace('$beforeLastUserMessage', beforeLast)
            : '[Invalid message]',
          from: 'bot'
        }))
      : [];

    this.colorClass = step.color || '';
    this.setChat([...this.getChat(), ...botMessages]); // ✅ FIXED
  }
*/

  showNextMessage(stepName) {
    const step = steps[stepName];
    const index = this.getMessageIndex();
    const last = this.getUserResponses().at(-1) || '';
    const beforeLast = this.getUserResponses().at(-2) || '';

    if (index >= (step.messages?.length || 0)) return; // All done

    const rawMsg = step.messages[index];
    const text = typeof rawMsg === 'string'
      ? rawMsg.replace('$lastUserMessage', last).replace('$beforeLastUserMessage', beforeLast)
      : '[Invalid message]';

    const newMessage = { text, from: 'bot' };
    this.setChat([...this.getChat(), newMessage]);
  }

  handleOptionClick(option) {
    console.log('[handleOptionClick]', option);
    const lastMessage = this.getChat().at(-1)?.text || '';
    this.setUserResponses([...this.getUserResponses(), lastMessage]);
    this.setChat([...this.getChat(), { text: option.text, from: 'user' }]);
    this.setCurrentStep(option.next);
    this.loadStep(option.next);
  }

  template() {
    const chat = this.getChat;
    const step = steps[this.getCurrentStep()];
    const options = step?.options || [];

    const mainClass = `min-h-screen p-4 ${this.colorClass}`;

    return html`
      <main class=${mainClass}>
        <section class="max-w-xl mx-auto">
          ${chat().map(msg => html`
            <karton-chat-message
              .text=${typeof msg.text === 'string' ? msg.text : String(msg.text)}
              .from=${msg.from}>
            </karton-chat-message>
          `)}
        </section>
        <section class="max-w-xl mx-auto flex flex-col gap-2 mt-4">
          ${options.map(opt => html`
            <button class="bg-amber-700 text-white py-2 px-4 rounded"
                    @click=${() => this.handleOptionClick(opt)}>
              ${opt.text}
            </button>
          `)}
          <button class="text-xs underline mt-4"
                  @click=${() => { localStorage.clear(); location.reload(); }}>
            Reset
          </button>
        </section>
      </main>
    `;
  }
});

