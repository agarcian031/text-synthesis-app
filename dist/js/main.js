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

// Initialize the voices array (to fetch the voice using the API)
// NOTE: The voice list is loaded async to the page and an onvoiceschanged event is fired when they are loaded, if no event is specified then it will return an empty array. 
let voices = [];

const getVoices = () => {
  voices = synth.getVoices();

  // loop through voices and create an option for each one 
  voices.forEach(voice => {
    // create an option element in the DOM 
    const option = document.createElement('option');
    // fill the option with the voice and language
    option.textContent = voice.name + '('+ voice.lang +')'; 
    
    // set needed option attributes 
    option.setAttribute('data-lang', voice.lang); 
    option.setAttribute('data-name', voice.name); 
    // append options to the select 
    voiceSelect.appendChild(option); 

  })
  
};

getVoices();
if(synth.onvoiceschanged !== undefined) {
  synth.onvoiceschanged = getVoices; 
}
