let volume = document.getElementById("volume");
let rate = document.getElementById("rate");
let pitch = document.getElementById("pitch");
let select = document.querySelector("#voices");
let controlButton = document.querySelectorAll("button");
let text = document.getElementById("text");

let sp = new SpeechSynthesisUtterance();
sp.lang = "en";
let spOptions = [];

// Need to call getVoices() -> returns an array of voices
// without this it won't work on android
window.speechSynthesis.getVoices();

window.speechSynthesis.onvoiceschanged = () => {
    spOptions = window.speechSynthesis.getVoices();
    sp.voice = spOptions[0];
    console.log(spOptions);
    spOptions.forEach((voice, i) => {
        select.options[i] = new Option(voice.name, i);
    });
};

volume.addEventListener("input", () => {
    const volumeValue = volume.value;
    sp.volume = volumeValue;
    document.getElementById("label-v").innerHTML = volumeValue;
});

pitch.addEventListener("input", () => {
    const pitchValue = pitch.value;
    sp.pitch = pitchValue;
    document.getElementById("label-p").innerHTML = pitchValue;
});

rate.addEventListener("input", () => {
    const rateValue = rate.value;
    sp.rate = rateValue;
    document.getElementById("label-r").innerHTML = rateValue;
});

select.addEventListener("change", () => {
    sp.voice = spOptions[select.value];
});

for (const button of controlButton) {
    button.addEventListener("click", (e) => {
        if (e.target.id == "start") {
            sp.text = text.value;
            window.speechSynthesis.speak(sp);
        } else if (e.target.id == "resume") {
            window.speechSynthesis.resume();
        } else if (e.target.id == "pause") {
            window.speechSynthesis.pause();
        } else if (e.target.id == "cancel") {
            window.speechSynthesis.cancel();
        }
    });
}
