let message = 'I am a cage in search of a bird!';
let messageX;
let messageY;
let xSpeed = 2;
let ySpeed = 0.02;
const amplitude = 20;
const verticalLetterSpacing = 10;
let font;

function preload() {
  font = loadFont('font/Outfit-Regular.ttf');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  textFont(font);

  messageX = width / 2;
  messageY = height / 4;
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
  }
}
