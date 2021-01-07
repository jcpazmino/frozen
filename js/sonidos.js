function control_Audiobienvenida(){ 
    Audio_bienvenida.play();
}
function fncAudio_teEquivocaste() { 
    Audio_teEquivocaste.play();
}
function fncAudio_loLograste() { 
    Audio_loLograste.play();
}
function fncAudio_cara() { 
    Audio_cara.play();
}
function fncAudio_mano() { 
    Audio_mano.play();
}
//****** sonidos */
var path_sonidos= "./sonidos/";
var Audio_bienvenida = document.createElement('audio');
Audio_bienvenida.src = path_sonidos+'bienvenida.mp3';
Audio_bienvenida.type = 'audio/mpeg';

var Audio_loLograste = document.createElement('audio');
Audio_loLograste.src = path_sonidos+'loLograste.mp3';
Audio_loLograste.type = 'audio/mpeg';

var Audio_teEquivocaste = document.createElement('audio');
Audio_teEquivocaste.src = path_sonidos+'teEquivocaste.mp3';
Audio_teEquivocaste.type = 'audio/mpeg';

var Audio_mano = document.createElement('audio');
Audio_mano.src = path_sonidos+'mano.mp3';
Audio_mano.type = 'audio/mpeg';

var Audio_cara = document.createElement('audio');
Audio_cara.src = path_sonidos+'cara.mp3';
Audio_cara.type = 'audio/mpeg';
