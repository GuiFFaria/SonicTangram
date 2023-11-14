class DraggableParallelogram {
  

    sounds = new Array(1);

    constructor(x, y, w, h, angle, chosenColor, sound1) {
      this.dragging = false; // Is the object being dragged?
      this.rollover = false; // Is the mouse over the ellipse?

      this.angle = angle;

      this.offsetX = 0;
      this.offsetY = 0;

      this.x = x;
      this.y = y;
      
      this.w = w;
      this.h = h;

      this.p1 = [this.x, this.y];
      this.p2 = [this.x + this.w, this.y];
      this.p3 = [this.x + this.w + this.h, this.y - this.h];
      this.p4 = [this.x + this.h, this.y - this.h];

      this.chosenColor = chosenColor;

      this.sounds[0] = loadSound(sound1);
      
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
    
    triangleArea(p1, p2, p3) {        
      
      let area = abs((p1[0]*(p2[1]-p3[1]) + p2[0]*(p3[1]-p1[1])+ p3[0]*(p1[1] - p2[1])) * 0.5);
      return area;
    }
  
    isInside(px, py) {
      
      let p = [px, py];
      
      let area = this.w * this.h;
      
      let area1 = this.triangleArea (p, this.p1, this.p4);    
      let area2 = this.triangleArea (p, this.p4, this.p3); 
      let area3 = this.triangleArea (p, this.p3, this.p2);
      let area4 = this.triangleArea (p, this.p2, this.p1);
      
      let res = area1 + area2 + area3 + area4;
      
      if (area == res) {
        return true;
      }
      else {
        return false;
      }
      
  
    }
    
    
    over() {
      // Is mouse over object
      if (this.isInside(this.getCoord()[0], this.getCoord()[1])) {
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
        
        this.p1 = [this.x, this.y];
        this.p2 = [this.x + this.w, this.y];
        this.p3 = [this.x + this.w + this.h, this.y - this.h];
        this.p4 = [this.x + this.h, this.y - this.h];
        
       
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
      translate(windowWidth * 0.5, windowHeight * 0.5)
      rotate(this.angle)
      noStroke();
      quad(this.x, this.y, this.x + this.h, this.y - this.h, this.x + this.w + this.h, this.y - this.h, this.x + this.w, this.y);
      pop()
    }
  
    pressed() {
      // Did I click on the rectangle?
      var cenas = this.isInside(this.getCoord()[0], this.getCoord()[1]);
  
      if (cenas) {
        this.dragging = true;
        // If so, keep track of relative location of click to corner of rectangle
        this.offsetX = this.x - this.getCoord()[0];
        this.offsetY = this.y - this.getCoord()[1];

        this.sounds[0].setVolume(1);
        this.sounds[0].loop();
      
      }
    }
  
    released() {
      // Quit dragging
      this.dragging = false;
      this.sounds[0].stop();
    }
    
    display() {
      this.over();
      this.update();
      this.show();
    }
  }