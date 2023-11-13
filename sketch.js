let message = 'I am a cage in search of a bird!';
let messageX;
let messageY;
const xSpeed = 0.8;
const ySpeed = 0.02;
const amplitude = 50;
const verticalLetterSpacing = 10;

function preload() {

}

function setup() {
  createCanvas(windowWidth, windowHeight);
  textFont();

  messageX = width;
  messageY = height / 2;
}

function draw() {
  background(32);
  fill(255, 100, 25);

  textSize(30);

  for (let i = 0; i < message.length; i++) {
    const letterX = messageX + textWidth(message.substring(0, i));

    const letterOffset = i * verticalLetterSpacing;
    const letterY = messageY + sin((frameCount - letterOffset) * ySpeed) * amplitude;

    text(message[i], letterX, letterY);
  }

  // Update position
  messageX -= xSpeed;

  // Check boundaries
  if (messageX < -textWidth(message)) {
    messageX = windowWidth;
    messageY += amplitude * 2; // Adjust this value to control how far down it moves
  }

  if (messageY > windowHeight) {
    messageY = 0;
  }
}
