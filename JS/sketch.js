
let infoImg
var melody
var melodyVolume = 0.1;



let sounds1 = new Array(3);
let sounds2 = new Array(3);
let sounds3 = new Array(3);
let sounds4 = new Array(3);
let sounds5 = new Array(3);
let sounds6 = new Array(3);
let sounds7 = new Array(3);
let rand;

function preload() {
  melody = loadSound('../sounds/melody1.mp3');

  sounds1[0] = loadSound("../sounds/P1A4.mp3");
  sounds1[1] = loadSound("../sounds/P1A5_.mp3");
  sounds1[2] = loadSound("../sounds/P1A5.mp3");

  sounds2[0] = loadSound("../sounds/P2B5.mp3");
  sounds2[1] = loadSound("../sounds/P2C4.mp3");
  sounds2[2] = loadSound("../sounds/P2C5.mp3");

  sounds3[0] = loadSound("../sounds/P3D3.mp3");
  sounds3[1] = loadSound("../sounds/P3E5.mp3");
  sounds3[2] = loadSound("../sounds/P3F4.mp3");

  sounds4[0] = loadSound("../sounds/P4D5.mp3");
  sounds4[1] = loadSound("../sounds/P4E4.mp3");
  sounds4[2] = loadSound("../sounds/P4F6.mp3");

  sounds5[0] = loadSound("../sounds/P5B4.mp3");
  sounds5[1] = loadSound("../sounds/P5C7.mp3");
  sounds5[2] = loadSound("../sounds/P5F4_.mp3");

  sounds6[0] = loadSound("../sounds/P6C5_.mp3");
  sounds6[1] = loadSound("../sounds/P6C6_.mp3");
  sounds6[2] = loadSound("../sounds/P6E7.mp3");

  sounds7[0] = loadSound("../sounds/P7D6.mp3");
  sounds7[1] = loadSound("../sounds/P7E3.mp3");
  sounds7[2] = loadSound("../sounds/P7G5.mp3");

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
  
  
  
}


function draw() {
  background(255)
  fill(0);
 

  // function event listener for mouse events when the div .arrow is pressed, the function playSound is called, when the div .arrow is released, the function stopSound is called


  document.getElementById('piece1').addEventListener('mousedown', mousepressed1);
  document.getElementById('piece1').addEventListener('mouseup', mousereleased1);

  document.getElementById('piece2').addEventListener('mousedown', mousepressed2);
  document.getElementById('piece2').addEventListener('mouseup', mousereleased2);

  document.getElementById('piece3').addEventListener('mousedown', mousepressed3);
  document.getElementById('piece3').addEventListener('mouseup', mousereleased3);

  document.getElementById('piece4').addEventListener('mousedown', mousepressed4);
  document.getElementById('piece4').addEventListener('mouseup', mousereleased4);

  document.getElementById('piece5').addEventListener('mousedown', mousepressed5);
  document.getElementById('piece5').addEventListener('mouseup', mousereleased5);

  document.getElementById('piece6').addEventListener('mousedown', mousepressed6);
  document.getElementById('piece6').addEventListener('mouseup', mousereleased6);

  document.getElementById('piece7').addEventListener('mousedown', mousepressed7);
  document.getElementById('piece7').addEventListener('mouseup', mousereleased7);



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

  interact('.shape')
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
          var textEl = event.target.querySelector('shape')

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
  var gestureArea = document.querySelector('.shape')
  var scaleElement = document.querySelector('.shape')
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
  interact('.shape')
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
    interact('.shape')
      .gesturable({
        listeners: {
          move(event) {
            var objects = document.getElementsByClassName('shape')

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


/* TODO: acho que o codigo podia ficar mais clean que nao houvesse tanta repetição destas funções
podia ser uma só função com um switch por exemplo */

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
