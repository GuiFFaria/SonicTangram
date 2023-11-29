
let shape1, shape2, shape3, shape4, shape5, shape6, shape7
let color1, color2, color3, color4, color5, color6, color7
let menu
let infoImg
var melody
var melodyVolume = 0.1;

let message = 'I am a cage in search of a bird!';
let messageX; // posição da frase em x
let messageY; // posição da frase em y
let velX = 1; //velocidade do movimento
let velY = 0; //velocidade do movimento
let xSpeed = 1; // velocidade horizontal
let ySpeed = 2; // velocidade da ondulação
const amplitude = 10;
const verticalLetterSpacing = 10;
let font;

let sounds1 = new Array(3);
let sounds2 = new Array(3);
let sounds3 = new Array(3);
let sounds4 = new Array(3);
let sounds5 = new Array(3);
let sounds6 = new Array(3);
let sounds7 = new Array(3);
let rand;

function preload() {
  infoImg = loadImage('images/icon.png');
  melody = loadSound('/sounds/melody1.mp3');

  sounds1[0] = loadSound("/sounds/p1A4.mp3");
  sounds1[1] = loadSound("/sounds/p1A5_.mp3");
  sounds1[2] = loadSound("/sounds/p1A5.mp3");

  sounds2[0] = loadSound("/sounds/p2B5.mp3");
  sounds2[1] = loadSound("/sounds/p2C4.mp3");
  sounds2[2] = loadSound("/sounds/p2C5.mp3");

  sounds3[0] = loadSound("/sounds/p3D3.mp3");
  sounds3[1] = loadSound("/sounds/p3E5.mp3");
  sounds3[2] = loadSound("/sounds/p3F4.mp3");

  sounds4[0] = loadSound("/sounds/p4D5.mp3");
  sounds4[1] = loadSound("/sounds/p4E4.mp3");
  sounds4[2] = loadSound("/sounds/p4F6.mp3");

  sounds5[0] = loadSound("/sounds/p5B4.mp3");
  sounds5[1] = loadSound("/sounds/p5C7.mp3");
  sounds5[2] = loadSound("/sounds/p5F4_.mp3");

  sounds6[0] = loadSound("/sounds/p6C5_.mp3");
  sounds6[1] = loadSound("/sounds/p6C6_.mp3");
  sounds6[2] = loadSound("/sounds/p6E7.mp3");

  sounds7[0] = loadSound("/sounds/p7D6.mp3");
  sounds7[1] = loadSound("/sounds/p7E3.mp3");
  sounds7[2] = loadSound("/sounds/p7G5.mp3");

}

function setup() {
  textFont("Arial");
  angleMode(DEGREES);
  let canvas = createCanvas(windowWidth, windowHeight);
  //adicionar canvas com class 'objects'
  canvas.class('objects');
  messageX = width / 3;
  messageY = height * 0.95;

  let widthTangram = 200;
  let h = sqrt(pow(widthTangram, 2) * 2);
  
  //melody.setVolume(0.1, 1);
  //melody.loop();
  //color palette
  
  color1 = '#8ecae6'
  color2 = '#219ebc'
  color3 = '#126782'
  color4 = '#023047'
  color5 = '#ffb703'
  color6 = '#fd9e02'
  color7 = '#fb8500'

  
  menu = new DraggableMenu(widthTangram, -widthTangram, 30, "red", infoImg);
  
  shape1 = new DraggableTriangle(0, 0, h/2, h/2, -135, color1 , "/sounds/p1A4.mp3", "/sounds/p1A5_.mp3", "/sounds/p1A5.mp3");

  shape2 = new DraggableTriangle(0, 0, h/2, h/2, -45, color2, "/sounds/p2B5.mp3", "/sounds/p2C4.mp3", "/sounds/p2C5.mp3");
    
  shape3 = new DraggableSquare(0,0,h/4,h/4, 45, color3, "/sounds/p3D3.mp3", "/sounds/p3E5.mp3", "/sounds/p3F4.mp3");
  
  shape4 = new DraggableTriangle(h/4, 0, h/4, h/4, 45, color4, "/sounds/p4D5.mp3", "/sounds/p4E4.mp3", "/sounds/p4F6.mp3");
  
  shape5 = new DraggableTriangle(0, 0, h/4, h/4, 135, color5, "/sounds/p5B4.mp3", "/sounds/p5C7.mp3", "/sounds/p5F4_.mp3"); 
 
  shape6 = new DraggableParallelogram(-widthTangram/4,-widthTangram/4, widthTangram/2, widthTangram/4, 270, color6, "/sounds/p6C5_.mp3", "/sounds/p6C6_.mp3", "/sounds/p6E7.mp3");
  
  shape7 = new DraggableTriangle(-widthTangram/2,-widthTangram/2, widthTangram/2, widthTangram/2, -90, color7, "/sounds/p7D6.mp3", "/sounds/p7E3.mp3", "/sounds/p7G5.mp3");
  
  
  
}


function draw() {
  background(255)
  fill(0);
  // image(infoImg, 0, 0)

  textSize(25);
  
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
      velY = 1;
      velX = 0;
     
    }
    // Se atingir a extremidade direita, mova para cima
    else {
      velY = -1;
      velX = 0;
     
    }
  }

  // Quando atinge a extremidade superior ou inferior
  if (messageY + verticalLetterSpacing > height || messageY < 0) {
    messageY = constrain(messageY, 0, height - verticalLetterSpacing); // Manter-se dentro dos limites

    // Se atingir a parte superior, mova para a esquerda
    if (messageY <= 0) {
      velX = -1;
      velY = 0;
    }
    // Se atingir a parte inferior, mova para a direita
    else {
      velX = 1;
      velY = 0;
    }
  }
  shape1.display();
  shape2.display();
  shape3.display();
  shape4.display();
  shape5.display(); 
  shape6.display();
  shape7.display();
  menu.display();

  // function event listener for mouse events when the div .arrow is pressed, the function playSound is called, when the div .arrow is released, the function stopSound is called


  document.getElementById('peca1').addEventListener('mousedown', mousepressed1);
  document.getElementById('peca1').addEventListener('mouseup', mousereleased1);

  document.getElementById('peca2').addEventListener('mousedown', mousepressed2);
  document.getElementById('peca2').addEventListener('mouseup', mousereleased2);

  document.getElementById('peca3').addEventListener('mousedown', mousepressed3);
  document.getElementById('peca3').addEventListener('mouseup', mousereleased3);

  document.getElementById('peca4').addEventListener('mousedown', mousepressed4);
  document.getElementById('peca4').addEventListener('mouseup', mousereleased4);

  document.getElementById('peca5').addEventListener('mousedown', mousepressed5);
  document.getElementById('peca5').addEventListener('mouseup', mousereleased5);

  document.getElementById('peca6').addEventListener('mousedown', mousepressed6);
  document.getElementById('peca6').addEventListener('mouseup', mousereleased6);

  document.getElementById('peca7').addEventListener('mousedown', mousepressed7);
  document.getElementById('peca7').addEventListener('mouseup', mousereleased7);



  /*use interact.js to drag and drop the shapes*/
  function dragMoveListener(event) {
    var target = event.target
    // keep the dragged position in the data-x/data-y attributes
    var x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx
    var y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy

    // translate the element
    target.style.webkitTransform =
      target.style.transform =
      'translate(' + x + 'px, ' + y + 'px)'

    // update the posiion attributes
    target.setAttribute('data-x', x)
    target.setAttribute('data-y', y)
  }

  interact('.forma')
    .draggable({
      // enable inertial throwing
      inertia: true,
      // keep the element within the area of it's parent
      modifiers: [
        interact.modifiers.restrictRect({
          restriction: 'parent',
          endOnly: true
        })
      ],
      // enable autoScroll
      autoScroll: true,
      
      listeners: {
        // call this function on every dragmove event
        move: dragMoveListener,

        // call this function on every dragend event
        end(event) {
          var textEl = event.target.querySelector('forma')

          textEl && (textEl.textContent =
            'moved a distance of ' +
            (Math.sqrt(Math.pow(event.pageX - event.x0, 2) +
              Math.pow(event.pageY - event.y0, 2) | 0))
              .toFixed(2) + 'px')
        }
      }
    }
  )


  // this is used later in the resizing demo
  window.dragMoveListener = dragMoveListener

  // use interact.js to resize with pinch gesture*/
  var angleScale = {
    angle: 0,
    scale: 1
  }
  var gestureArea = document.querySelector('.forma')
  var scaleElement = document.querySelector('.forma')
  var resetTimeout
  
  interact(gestureArea)
    .gesturable({
      listeners: {
        start (event) {
          angleScale.angle -= event.angle
  
          clearTimeout(resetTimeout)
          scaleElement.classList.remove('reset')
        },
        move (event) {
          // document.body.appendChild(new Text(event.scale))
          var currentAngle = event.angle + angleScale.angle
          var currentScale = event.scale * angleScale.scale
  
          scaleElement.style.transform =
            'rotate(' + currentAngle + 'deg)' + 'scale(' + currentScale + ')'
  
          // uses the dragMoveListener from the draggable demo above
          dragMoveListener(event)
        },
        end (event) {
          angleScale.angle = angleScale.angle + event.angle
          angleScale.scale = angleScale.scale * event.scale
  
          resetTimeout = setTimeout(reset, 1000)
          scaleElement.classList.add('reset')
        }
      }
    })
    .draggable({
      listeners: { move: dragMoveListener }
    })
  
  function reset () {
    scaleElement.style.transform = 'scale(1)'
  
    angleScale.angle = 0
    angleScale.scale = 1
  }

  /*use interact.js to resize with mouse the shapes*/
  /*
  interact('.forma')
    .resizable({
      // resize from all edges and corners
      edges: {
        left: true,
        right: true,
        bottom: true,
        top: true
      },

      listeners: {
        move(event) {
          var target = event.target
          var x = (parseFloat(target.getAttribute('data-x')) || 0)
          var y = (parseFloat(target.getAttribute('data-y')) || 0)

          // update the element's style
          target.style.width = event.rect.width + 'px'
          target.style.height = event.rect.height + 'px'

          // translate when resizing from top or left edges
          x += event.deltaRect.left
          y += event.deltaRect.top

          target.style.transform =
            'translate(' + x + 'px,' + y + 'px)'

          target.setAttribute('data-x', x)
          target.setAttribute('data-y', y)
          target.textContent = Math.round(event.rect.width) + '\u00D7' + Math.round(event.rect.height)
        }
      },
      modifiers: [
        // keep the edges inside the parent
        interact.modifiers.restrictEdges({
          outer: 'parent',
          endOnly: true
        }),

        // minimum size
        
        interact.modifiers.restrictSize({
          min: {
            width: 100,
            height: 50
          }
        })
        
      ],

      inertia: true
    })
    */  
    // rotate
    
    var angle = 0
    interact('.forma')
      .gesturable({
        listeners: {
          move(event) {
            var objects = document.getElementsByClassName('forma')

            angle += event.da

            for (var i = 0; i < objects.length; i++) {
              console.log(objects[i])
                objects[i].style.transform =
                'rotate(' + angle + 'deg)'
            }

          }
        }
      })
      
}

//event listener for mouse events 
// when the div .arrow is pressed, the function playSound is called
//when the div .arrow is released, the function stopSound is called



function mousepressed1() {

  console.log("mouse pressed");
  rand = Math.floor(Math.random() * 3);

  console.log(rand);
  sounds1[rand].setVolume(0.1);
  sounds1[rand].loop();

}

function mousepressed2() {

  console.log("mouse pressed");
  rand = Math.floor(Math.random() * 3);

  console.log(rand);
  sounds2[rand].setVolume(0.1);
  sounds2[rand].loop();

}

function mousepressed3() {

  console.log("mouse pressed");
  rand = Math.floor(Math.random() * 3);

  console.log(rand);
  sounds3[rand].setVolume(0.1);
  sounds3[rand].loop();

}

function mousepressed4() {

  console.log("mouse pressed");
  rand = Math.floor(Math.random() * 3);

  console.log(rand);
  sounds4[rand].setVolume(0.1);
  sounds4[rand].loop();

}

function mousepressed5() {

  console.log("mouse pressed");
  rand = Math.floor(Math.random() * 3);

  console.log(rand);
  sounds5[rand].setVolume(0.1);
  sounds5[rand].loop();

}

function mousepressed6() {

  console.log("mouse pressed");
  rand = Math.floor(Math.random() * 3);

  console.log(rand);
  sounds6[rand].setVolume(0.1);
  sounds6[rand].loop();
}

function mousepressed7() {

  console.log("mouse pressed");
  rand = Math.floor(Math.random() * 3);

  console.log(rand);
  sounds7[rand].setVolume(0.1);
  sounds7[rand].loop();

}

function mousereleased1() {

  console.log("mouse released");
  sounds1[0].setVolume(0, 2);
  sounds1[1].setVolume(0, 2);
  sounds1[2].setVolume(0, 2);
 
}

function mousereleased2() {

  console.log("mouse released");
  sounds2[0].setVolume(0, 2);
  sounds2[1].setVolume(0, 2);
  sounds2[2].setVolume(0, 2);
 
}

function mousereleased3() {

  console.log("mouse released");
  sounds3[0].setVolume(0, 2);
  sounds3[1].setVolume(0, 2);
  sounds3[2].setVolume(0, 2);
 
}

function mousereleased4() {

  console.log("mouse released");
  sounds4[0].setVolume(0, 2);
  sounds4[1].setVolume(0, 2);
  sounds4[2].setVolume(0, 2);
 
}

function mousereleased5() {

  console.log("mouse released");
  sounds5[0].setVolume(0, 2);
  sounds5[1].setVolume(0, 2);
  sounds5[2].setVolume(0, 2);
 
}

function mousereleased6() {

  console.log("mouse released");
  sounds6[0].setVolume(0, 2);
  sounds6[1].setVolume(0, 2);
  sounds6[2].setVolume(0, 2);
 
}

function mousereleased7() {

  console.log("mouse released");
  sounds7[0].setVolume(0, 2);
  sounds7[1].setVolume(0, 2);
  sounds7[2].setVolume(0, 2);
 
}
