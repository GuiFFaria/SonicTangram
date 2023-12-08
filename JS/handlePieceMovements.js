var angleScale = {
    angle: 0,
    scale: 1
  }
  /* var gestureArea = document.getElementById('gesture-area')
  var scaleElement = document.getElementById('scale-element') */
  var resetTimeout
  
  
  // target elements with the "draggable" class
  interact('.draggable')
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
        end (event) {
          var textEl = event.target.querySelector('p')
  
          textEl && (textEl.textContent =
            'moved a distance of ' +
            (Math.sqrt(Math.pow(event.pageX - event.x0, 2) +
                       Math.pow(event.pageY - event.y0, 2) | 0))
              .toFixed(2) + 'px')
        }
      }
    })
  
  function dragMoveListener (event) {
    var target = event.target
    // keep the dragged position in the data-x/data-y attributes
    var x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx
    var y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy
  
    // translate the element
    target.style.transform = 'translate(' + x + 'px, ' + y + 'px)'
  
    // update the posiion attributes
    target.setAttribute('data-x', x)
    target.setAttribute('data-y', y)
  }
  
  // this function is used later in the resizing and gesture demos
  window.dragMoveListener = dragMoveListener
  
  for (let i = 0; i < 7; i++) {
    (function () {  // Create a closure to encapsulate variables for each iteration
      var gestureArea = document.getElementById(`gesture-area-${i + 1}`);
      var scaleElement = document.getElementById(`piece${i + 1}`);
      scaleElement.classList.add('scale-element');
  
      interact(gestureArea)
        .gesturable({
          listeners: {
            start(event) {
              angleScale.angle -= event.angle;
            },
            move(event) {
              var currentAngle = event.angle + angleScale.angle;
              var currentScale = event.scale * angleScale.scale;
  
              scaleElement.style.transform =
                'rotate(' + currentAngle + 'deg)' + 'scale(' + currentScale + ')';
  
              dragMoveListener(event);
            },
            end(event) {
              angleScale.angle = angleScale.angle + event.angle;
              angleScale.scale = angleScale.scale * event.scale;
            },
          },
        })
        .draggable({
          listeners: { move: dragMoveListener },
        });
    })();  // Immediately invoke the closure
  }
  
  
  function reset () {
    scaleElement.style.transform = 'scale(1)'
  
    angleScale.angle = 0
    angleScale.scale = 1
  }