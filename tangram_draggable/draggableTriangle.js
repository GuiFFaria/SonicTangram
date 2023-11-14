
class DraggableTriangle {

    sounds = new Array(1);

    constructor(x, y, c1, c2, angle, chosenColor, sound1, sound2, sound3) {
      
      this.dragging = false; // Is the object being dragged?
      this.rollover = false; // Is the mouse over the ellipse?

      this.angle = angle

      this.x = x ;
      this.y = y ;
      
      //catetos
      this.c1 = c1;
      this.c2 = c2;

      this.offsetX = 0;
      this.offsetY = 0;

      this.sounds[0] = loadSound(sound1);
      this.sounds[1] = loadSound(sound2);
      this.sounds[2] = loadSound(sound3);  

      this.chosenColor = chosenColor;

      
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
      let p1 = [this.x, this.y];
      let p2 = [this.x + this.c1, this.y];
      let p3 = [this.x, this.y + this.c2];
  
      let area = this.triangleArea (p1, p2, p3);  
      let area1 = this.triangleArea (p, p2, p3);    
      let area2 = this.triangleArea (p1, p, p3); 
      let area3 = this.triangleArea (p1, p2, p);
      
      let res = area1 + area2 + area3;
    
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
      }
    }
  
    show() {
      //stroke(0);
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
      triangle(this.x, this.y, this.x + this.c1, this.y, this.x, this.y + this.c2);
      pop() 
    }
  
    pressed() {
      // Did I click on the rectangle?
      if (this.isInside(this.getCoord()[0], this.getCoord()[1])) {
        this.dragging = true;
        // If so, keep track of relative location of click to corner of rectangle
        this.offsetX = this.x -this.getCoord()[0];
        this.offsetY = this.y - this.getCoord()[1];

        this.rand = Math.floor(Math.random() * 3);

        this.sounds[this.rand].setVolume(1);
        this.sounds[this.rand].loop();
      }
    }
  
    released() {
      // Quit dragging
      this.dragging = false;
      console.log(this.rand);
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