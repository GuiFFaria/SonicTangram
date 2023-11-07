class DraggableSquare {
    constructor(x, y, w, h, ang, chosenColor) {
      this.dragging = false; // Is the object being dragged?
      this.rollover = false; // Is the mouse over the ellipse?

      this.ang = ang;

      this.x = x;
      this.y = y;

      this.w = w;
      this.h = h;

      this.offsetX = 0;
      this.offsetY = 0;
      
      this.chosenColor = chosenColor
    }
    
    currentMouseX() {
      return mouseX - windowWidth * 0.5;
    }
    
    currentMouseY() {
      return mouseY - windowHeight * 0.5;
    }
    
    over() {
      // Is mouse over object
      if (this.currentMouseX() > this.x && this.currentMouseX() < this.x + this.w && this.currentMouseY() > this.y && this.currentMouseY() < this.y + this.h) {
        this.rollover = true;
      } else {
        this.rollover = false;
      }
    }
  
    update() {
      // Adjust location if being dragged
      if (this.dragging) {
        this.x = this.currentMouseX() + this.offsetX;
        this.y = this.currentMouseY() + this.offsetY;
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
      rotate(this.ang)
      rect(this.x, this.y, this.w, this.h);
      pop()
    }
  
    pressed() {
      // Did I click on the rectangle?
      if (this.currentMouseX() > this.x && this.currentMouseX() < this.x + this.w && this.currentMouseY() > this.y && this.currentMouseY() < this.y + this.h) {
        this.dragging = true;
        // If so, keep track of relative location of click to corner of rectangle
        this.offsetX = this.x - this.currentMouseX();
        this.offsetY = this.y - this.currentMouseY();
      }
    }
  
    released() {
      // Quit dragging
      this.dragging = false;
    }
    
    display() {
      this.over();
      this.update();
      this.show();
    }
  }