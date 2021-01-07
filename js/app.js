var width = window.innerWidth;
var height = window.innerHeight;
var parte_descubrir = "cara";
var parte_cambio=false;

var sources = {
    fondo: 'completa.png',
    cara: 'cara.png',
    cara_pintada: 'cara_pintada.png',
    mano: 'mano.png',
    mano_pintada: 'mano_pintada.png',
    btn: 'btn.png'
}

var textPosX=15, textPosY=550, textBorrarX=10, textBorrarY=500, textBorrarW=600, textBorrarH=100;
var subtitPosX=500, subtitY=40, subtitBorrarX=480, subtitBorrarY=10, subtitBorrarW=400, subtitBorrarH=50;
var iniciaSeleccion=false;

function iniciarJuego(){
    loadImages(sources, initStage);
}

function loadImages(sources, callback) {
    var imgsDir = './imgs/';
    var images = {};
    var loadedImages = 0;
    var numImages = 0;
    for (var src in sources) {
        numImages++;
    }
    for (var src in sources) {
        images[src] = new Image();
        images[src].onload = function () {
            if (++loadedImages >= numImages) {
                callback(images);
            }
        };
        images[src].src = imgsDir + sources[src];
    }    
}


function initStage(images) {
//1. crear el escenario
    var stage = new Konva.Stage({
        container: 'container',
        width: width,
        height: height,
        x:10,
        y:10
    });
    var background = new Konva.Layer();
    var fichasLayer = new Konva.Layer();
    var boton = new Konva.Layer();

    // posición de la imagenes
    var fichas = {
        cara: { x: 139, y: 70},
        mano: { x: -4, y: 253}
    }; 
//2. carga al layer cada ficha y le da características
    for (var key in fichas) {
        (function () {
            var privKey = key;
            var fich_a = fichas[key]; 
            //carga cada una de las fichas
            var ficha = new Konva.Image({
                image: images[key],
                x: fich_a.x,
                y: fich_a.y,
            });
            ficha.on('mouseover', function () {              
                if(iniciaSeleccion){
                    if(parte_descubrir==privKey){
                        ficha.image(images[privKey + '_pintada']);
                        fichasLayer.draw();
                        parte_cambio=true; //se mostro la parte pintada   
                        dibujarBtn(stage, boton, images.btn, fichas, fichasLayer);
                        drawSubtitulo(fichasLayer, "Genial, lo lograste!!!", "loLograste"); 
                        reiniciarSelecion(false);
                    }else{
                        drawSubtitulo(fichasLayer, "Upss te has equivocado!!!", "teEquivocaste");
                        reiniciarSelecion(true);
                    }
                }
            }); 
            ficha.on('mouseout', function () {
                if(iniciaSeleccion){
                    if(parte_cambio){// se vuelve a mostrar la parte sin pintar
                        ficha.image(images[privKey]);
                        fichasLayer.draw(); 
                    }
                }
            });  
            
            //Adiciona cada ficha al layer
            fichasLayer.add(ficha);
        })();
    }

//3. Adiciona el background y el layer
    stage.add(background);
    stage.add(fichasLayer); 

    drawBackground( background, images.fondo, 'Descubre Las partes de Frozen!' );
    muestraParteSeleccionar(fichasLayer, parte_descubrir);
             
}
function muestraParteSeleccionar(layer, parte_descubrir){
    texto="Selecciona la "+parte_descubrir; 
    sonido = parte_descubrir;
    setTimeout(function(){        
        corriendoFunction=false;
        drawSubtitulo(layer, texto, sonido);
        iniciaSeleccion=true;
    }, 2000);     
}
function dibujarBtn(stage, boton, imagen, fichas, fichasLayer){
    var btn = new Konva.Image({
        image: imagen,
        x: 600,
        y: 70,
    });
    btn.on('mouseover', function () { 
        document.body.style.cursor = 'pointer';
    });
    btn.on('mouseout', function () {
        document.body.style.cursor = 'default';
    });
    btn.on('click', function () {        
       /* //utlizar cuando haya mas de dos fichas a escoger
        keysFichas= Object.keys(fichas);
        min=1; max = Object.keys(fichas).length;console.log(max);
        indice=Math.ceil(Math.random() * (max - min)) + min;
        console.log(keysFichas[indice-1]);  */
        if(parte_descubrir == "cara") parte_descubrir = "mano";
        else parte_descubrir = "cara";
        muestraParteSeleccionar(fichasLayer, parte_descubrir);
    });
    boton.draw();
    boton.add(btn);    
    stage.add(boton);  
}
function reiniciarSelecion(reiniciar){
    iniciaSeleccion=false;
    setTimeout(function(){  
        iniciaSeleccion=reiniciar; 
    }, 2000); 
}

function drawBackground(background, fondoImg, text) {
    var context = background.getContext();
    context.drawImage(fondoImg, 0, 0);
    context.setAttr('font', '30pt Calibri');
    context.setAttr('textAlign', 'left');
    context.setAttr('fillStyle', 'black');
    context.clearRect(textBorrarX, textBorrarY, textBorrarW, textBorrarH);
    context.fillText(text, textPosX, textPosY);
    control_Audiobienvenida();
}

function drawSubtitulo(fichasLayer, texto, sonido){ 
    var context = fichasLayer.getContext();
    context.setAttr('font', '25pt Calibri');
    context.setAttr('textAlign', 'left');
    context.setAttr('fillStyle', 'black');
    context.clearRect(subtitBorrarX, subtitBorrarY, subtitBorrarW, subtitBorrarH);
    context.fillText(texto, subtitPosX, subtitY); 

    switch(sonido){
        case "cara":
            fncAudio_cara(); 
        break;
        case "mano":
            fncAudio_mano();
        break;
        case "loLograste":
            fncAudio_loLograste();
        break;
        case "teEquivocaste":
            fncAudio_teEquivocaste();
        break;
    }   
}
