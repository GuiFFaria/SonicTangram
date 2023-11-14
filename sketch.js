let message = 'I am a cage in search of a bird!';
let messageX; // posição da frase em x
let messageY; // posição da frase em y
let velX = 5; //velocidade do movimento em x
let velY = 0; //velocidade do movimento em y
let xSpeed = 2; // velocidade horizontal
let ySpeed = 0.02; // velocidade da ondulação
const amplitude = 10;
const verticalLetterSpacing = 10;
let font;

function preload() {
  font = loadFont('font/Outfit-Regular.ttf');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  textFont(font);

  // centralizar a frase
  messageX = width / 3;
  messageY = height * 0.95;
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

  // Atualizar posição da frase
  messageX += velX;
  messageY += velY;

  // Quando atinge a extremidade direita ou esquerda
  if (messageX + textWidth(message) > width || messageX < 0) {
    messageX = constrain(messageX, 0, width - textWidth(message)); // Manter-se dentro dos limites

    // Se atingir a extremidade esquerda, mova para baixo
    if (messageX <= 0) {
      velY = 5;
      velX = 0;
     
    }
    // Se atingir a extremidade direita, mova para cima
    else {
      velY = -5;
      velX = 0;
    }
  }

  // Quando atinge a extremidade superior ou inferior
  if (messageY + verticalLetterSpacing > height || messageY < 0) {
    messageY = constrain(messageY, 0, height - verticalLetterSpacing); // Manter-se dentro dos limites

    // Se atingir a parte superior, mova para a esquerda
    if (messageY <= 0) {
      velX = -5;
      velY = 0;
    }
    // Se atingir a parte inferior, mova para a direita
    else {
      velX = 5;
      velY = 0;
    }
  }
}


