let message = 'I am a cage in search of a bird!';
let messageX; //posição da frase em x
let messageY; //posição da frase em y
let velX =1;
let velY =0;
let xSpeed = 2; //velociade horizontal
let ySpeed = 0.02; //velocidade da ondulação
const amplitude = 10;
const verticalLetterSpacing = 10;
let font;

function preload() {
  font = loadFont('font/Outfit-Regular.ttf');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  textFont(font);

//centrar a frase
  messageX = width / 3;
  messageY = height*0.95;
}

function draw() {
  background(32);
  fill(255, 255, 255);

  textSize(30);

  for (let i = 0; i < message.length; i++) {
    const letterX = messageX + textWidth(message.substring(0, i));

    const letterOffset = i * verticalLetterSpacing;
    const letterY = messageY + sin((frameCount - letterOffset) * ySpeed) * amplitude;

    text(message[i], letterX, letterY);
  }
  messageX += velX;
  messageY += velY;

  if (messageX + textWidth(message) > width || messageX < 0) {
   // messageX = window.innerWidth - text.offsetWidth;
    messageX = constrain(messageX, 0, width - textWidth(message)); // Manter-se detro dos limites
    messageY += verticalLetterSpacing;
    velX = 0;
    velY = 0.5;
  }
  if (messageY + verticalLetterSpacing > height || messageY < 0) {
  //  messageY = window.innerHeight - text.offsetHeight;
    messageY = constrain(messageY, 0, height - verticalLetterSpacing); // Manter-se dentro dos limites
    messageX += velX;
    
    velX = -0.5;
    velY = 0;
  }
  
  if (messageX < 0) {
    messageX = 0;
    velX = 0;
    velY = -0.5;
  }
  if (messageY < 0) {
    messageY = 0;
    velX = 0.5;
    velY = 0;
  }


}
/*
  messageX -= xSpeed;

  if (messageX + textWidth(message) > width || messageX < 0) {
    xSpeed *= -1;
    messageX = constrain(messageX, 0, width - textWidth(message)); // Manter-se detro dos limites
    messageY += verticalLetterSpacing;
  }

  if (messageY + verticalLetterSpacing > height || messageY < 0) {
    ySpeed *= -1;
    messageY = constrain(messageY, 0, height - verticalLetterSpacing); // Manter-se dentro dos limites
    messageX += xSpeed;
  }*/

