const textarea = document.querySelector("textarea"),
      voicelist =  document.querySelector("select"),
      speechBtn = document.querySelector("button");

let synth = speechSynthesis,
    isSpeaking = true;
    
voices();

function voices(){
    for(let voice of synth.getVoices()){
        let selected = voice.name === "Google US English" ? "selected" : "";
        let option = `<option value="${voice.name}" ${selected}>${voice.name} (${voice.lang})</option>`;
        voicelist.insertAdjacentHTML("beforeend", option);
    }
}

synth.addEventListener("voiceschanged", voices);

 function textToSpeech(text){
    let utterance = new SpeechSynthesisUtterance(text);
    for (let voice of synth.getVoices()){
        if(voice.name === voicelist.value){
            utterance.voice = voice;
        }
    }
    synth.speak(utterance);
}

speechBtn.addEventListener("click", e =>{
    e.preventDefault();
    if(textarea.value !== ""){
        //confere se não está falando
        if(!synth.speaking){
            textToSpeech(textarea.value);
        }
        //Se o texto for longo
        if(textarea.value.length > 80){
            setInterval(() =>{
                if(!synth.speaking && !isSpeaking){
                    isSpeaking = true;
                    speechBtn.innerText = "Converter para Voz";
                } else { }

            }, 500);
            if(isSpeaking){
                synth.resume();
                isSpeaking = false;
                speechBtn.innerText = "Pausar Discurso";
            } else{
                synth.pause();
                isSpeaking = false;
                speechBtn.innerText = "Voltar voz";
            }

        }else {
            speechBtn.innerText = "Converter para Voz"
        }
    }
}); 