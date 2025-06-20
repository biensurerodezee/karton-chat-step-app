export default {
  home: {
    messages: [
      "Picture yourself in a situation where you lately felt triggered (quite emotional).",
      "If you feel something, it is because you believe something and you can remember all details that formed this belief."
    ],
    options: [
      { text: "I feel the emotion", next: "emotion" }
    ],
    color: "bg-blue-500"
  },
  emotion: {
    messages: [
      "How does that make you feel right now?",
      "What comes to your mind as you focus on what you are feeling?"
    ],
    options: [
      { text: "I can discribe the feeling", next: "memory" },
      { text: "I feel angry", next: "anger" }
    ],
    color: "bg-blue-400"
  },
  memory: {
    messages: [
      "How would you 'name' this feeling?",
      "Why do you feel that way?",
      "Why does believing '$lastUserMessage' make you feel '$beforeLastUserMessage'?"
    ],
    options: [
      { text: "This might be true", next: "belief" }
    ],
    color: "bg-red-400"
  },
  belief: {
    messages: ["Do you believe this? Or even a little bit?"],
    options: [
      { text: "Yes", next: "truth" },
      { text: "No", next: "home" }
    ],
    color: "bg-emerald-400"
  },
  truth: {
    messages: [
      "Would you like to know how the Lord thinks about this believe?",
    ],
    options: [
      { text: "Yes, please", next: "truthLord" },
      { text: "No, retry", next: "home" }
    ],
    color: "bg-yellow-400"
  },
  truthLord: {
    messages: [
      "Then please ask Him and wait for Him to speak to you ... OK?",
      "How did that go, did you experience something?"
    ],
    options: [
      { text: "I experienced something", next: "transformation" },
      { text: "I didn't experience anything", next: "home" }
    ],
    color: "bg-yellow-500"
  },
  transformation: {
    messages: ["Does the belief still feel true? Or has something shifted?"],
    options: [
      { text: "No, something shifted", next: "end" },
      { text: "Yes, go again", next: "home" }
    ],
    color: "bg-cyan-500"
  },
  end: {
    messages: ["Thank you for engaging, would you like to go further for other feelings?"],
    options: [
      { text: "Go further", next: "home" },
      { text: "Bye", next: "end" }
    ],
    color: "bg-blue-500"
  },
  anger: {
    messages: [
      "Is any portion of what you are feeling beeing felt towards any person or anything?",
    ],
    options: [
      { text: "Yes, person or thing", next: "angerToPersonOrThing" },
      { text: "No, towards God", next: "angerToGod" }
    ],
    color: "bg-red-400"
  },
  angerToGod: {
    messages: [
      "Why do you feel angry towards God?",
      "Why does that make you feel angry at God?",
      "Because of that, how do you picture yourself?"
    ],
    options: [
      { text: "I know what I believe about myself", next: "truth" },
      { text: "Back to the situation", next: "home" }
    ],
    color: "bg-red-500"
  },  
  angerToPersonOrThing: {
    messages: [
      "To who or what do you feel angry towards?",
      "Not that it is true, but is it possible that you might be resistant or hesitant to let go of this anger?"
    ],
    options: [
      { text: "Yes, I resist or hesitate", next: "angerSolution" },
      { text: "No, not at all", next: "angerSolution" }
    ],
    color: "bg-red-500"
  },
  angerSolution: {
    messages: [
      "What do you believe that would happen if you would let go of this anger?",
      "So then, the reason for your anger is what?",
      "Would you like to ask the Lord to carry the anger away? ... OK?",
      "Did you experience something? What about the anger?"
    ],
    options: [
      { text: "Anger is still there", next: "anger" },
      { text: "Anger is gone", next: "end" }
    ],
    color: "bg-purple-600"
  }
};
