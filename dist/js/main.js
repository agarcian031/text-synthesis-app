// Initializes SpeechSynth API
const synth = window.speechSynthesis;
// Grab the DOM elements
const textForm = document.querySelector("form");
const textInput = document.querySelector("#text-input");
const voiceSelect = document.querySelector("#voice-select");
const rate = document.querySelector("#rate");
const rateValue = document.querySelector("#rate-value");
const pitch = document.querySelector("#pitch");
const pitchValue = document.querySelector("#pitch-value");
const body = document.querySelector('body')

// Initialize the voices array (to fetch the voice using the API)
// NOTE: The voice list is loaded async to the page and an onvoiceschanged event is fired when they are loaded, if no event is specified then it will return an empty array.
let voices = [];

const getVoices = () => {
  voices = synth.getVoices();

  // loop through voices and create an option for each one
  voices.forEach((voice) => {
    // create an option element in the DOM
    const option = document.createElement("option");
    // fill the option with the voice and language
    option.textContent = voice.name + "(" + voice.lang + ")";

    // set needed option attributes
    option.setAttribute("data-lang", voice.lang);
    option.setAttribute("data-name", voice.name);
    // append options to the select
    voiceSelect.appendChild(option);
  });
}; //end API

getVoices();
if (synth.onvoiceschanged !== undefined) {
  synth.onvoiceschanged = getVoices;
}

// Speak
// will run as soon as we press speak
const speak = () => {
  

  // check if speaking
  if (synth.speaking) {
    console.error("Already speaking...");
    return;
  }
  // make sure the input is not empty and then will tell speech api to say what is in the input
  if (textInput.value !== '') {
    // add background animation 
    body.style.background = '#000000 url(img/wave.gif)'; 
    body.style.backgroundRepeat = 'repeat-x'; 
    body.style.backgroundSize = '100% 100%'; 

  // get speak text 
    const speakText = new SpeechSynthesisUtterance(textInput.value);
    // speak end
    speakText.onend = (e) => {
      console.log("Done speaking...");
      body.style.background = '#000000'; 
    };

    // speak error
    speakText.onerror = (e) => {
      console.error("Something went wrong!");
    };

    // selected voice
    // will take the selected voice from whatever we picked
    const selectedVoice = voiceSelect.selectedOptions[0].getAttribute("data-name");

    // loop through the voices and if the voice selected matches then it will speak the input with the voice
    voices.forEach((voice) => {
      if (voice.name === selectedVoice) {
        speakText.voice = voice;
      }
    });

    // set pitch and rate
    speakText.rate = rate.value;
    speakText.pitch = pitch.value;

    // will speak
    synth.speak(speakText);
  }
};

// EVENT LISTENERS
// form submission: when we click button it will call the speak function
textForm.addEventListener("submit", (e) => {
  e.preventDefault();
  speak();
  textInput.blur();
});

// Rate value change depending on the slider position
rate.addEventListener("change", (e) => (rateValue.textContent = rate.value));
// Pitch value change depending on the slider position
pitch.addEventListener("change", (e) => (pitchValue.textContent = pitch.value));

// Voice select change
voiceSelect.addEventListener("change", (e) => speak());




