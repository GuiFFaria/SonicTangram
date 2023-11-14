class DraggableSquare {

    sounds = new Array(3);
    rand;

    constructor(x, y, w, h, angle, chosenColor, sound1, sound2, sound3) {
      this.dragging = false; // Is the object being dragged?
      this.rollover = false; // Is the mouse over the ellipse?

      this.angle = angle;

      this.x = x;
      this.y = y;

      this.w = w;
      this.h = h;

      this.offsetX = 0;
      this.offsetY = 0;

      this.sounds[0] = loadSound(sound1);
      this.sounds[1] = loadSound(sound2);
      this.sounds[2] = loadSound(sound3);

      this.chosenColor = chosenColor
    }
    
    getCoord() {

        let newX, newY, auxX, auxY
        auxX = mouseX - windowWidth * 0.5
        auxY = mouseY - windowHeight * 0.5
        
        newX = auxX*cos(this.angle) + auxY*sin(this.angle)
        newY = -auxX*sin(this.angle) + auxY*cos(this.angle)
        
        return [newX, newY]
        
    }

    currentMouseX() {
      return mouseX - windowWidth * 0.5;
    }
    
    currentMouseY() {
      return mouseY - windowHeight * 0.5;
    }
    
    over() {
      // Is mouse over object
      if (this.getCoord()[0] > this.x && this.getCoord()[0] < this.x + this.w && this.getCoord()[1] > this.y && this.getCoord()[1] < this.y + this.h) {
        this.rollover = true;
      } else {
        this.rollover = false;
      }
    }
  
    update() {
      // Adjust location if being dragged
      if (this.dragging) {
        this.x = this.getCoord()[0] + this.offsetX;
        this.y = this.getCoord()[1] + this.offsetY;
      }
    }
  
    show() {
      stroke(0);
      // Different fill based on state
      if (this.dragging) {
        fill(50);
      } else if (this.rollover) {
        fill(100);
      } else {
        fill(color(this.chosenColor));
      }
      push()
      translate(windowWidth*0.5, windowHeight*0.5)
      rotate(this.angle)
      noStroke();
      rect(this.x, this.y, this.w, this.h);
      pop()
    }
  
    pressed() {
      // Did I click on the rectangle?
      if (this.getCoord()[0] > this.x && this.getCoord()[0] < this.x + this.w && this.getCoord()[1] > this.y && this.getCoord()[1] < this.y + this.h) {
        this.dragging = true;
        // If so, keep track of relative location of click to corner of rectangle
        this.offsetX = this.x - this.getCoord()[0];
        this.offsetY = this.y - this.getCoord()[1];

        //generate random number to choose sound
        this.rand = Math.floor(Math.random() * 3);

        this.sounds[this.rand].setVolume(1);
        this.sounds[this.rand].loop();
      }
    }
  
    released() {
      // Quit dragging
      this.dragging = false;
      this.sounds[0].stop();
      this.sounds[1].stop();
      this.sounds[2].stop();
    }
    
    display() {
      this.over();
      this.update();
      this.show();
    }
  }