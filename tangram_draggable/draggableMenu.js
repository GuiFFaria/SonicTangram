
class DraggableMenu {
  
    constructor(x, y, r, chosenColor) {
      
      this.dragging = false; // Is the object being dragged?
      this.rollover = false; // Is the mouse over the ellipse?
      this.click = false;

      this.r = r;
      this.x = x ;
      this.y = y ;

      this.r2 = this.r * 2.5

      this.offsetX = 0;
      this.offsetY = 0;

      this.chosenColor = chosenColor;
      
    }
    
    getCoord() {

        let newX, newY
        newX = mouseX - windowWidth * 0.5
        newY = mouseY - windowHeight * 0.5     
        
        return [newX, newY]
        
    }
    
   
  
    isInside(px, py) {
      let d = dist(this.x, this.y, px, py)
      // distance is greater than radius
      if (d > this.r) {
        return false;
      }
      else {
        return true;
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
    
    /* preload() {
      infoImg = loadImage('/images/info-icon.png');
    } */
    openMenu(c) {
      fill(color(c));
      push()
      translate(windowWidth * 0.5, windowHeight * 0.5)
      noStroke();
      ellipse(this.x, this.y, this.r2, this.r2);
      pop()
    }
    show() {
      //stroke(0);
      // Different fill based on state
      if (this.dragging && this.click == true) {
        this.openMenu("#9BA4B5")
      } else if (this.dragging == true){
        fill(50);
      } else if (this.rollover && this.click == true) {
        this.openMenu("#9BA4B5")
      } else if (this.click == true) {
        this.openMenu("#9BA4B5")
      }
      else {
        fill(color(this.chosenColor));
      }
      fill("#212A3E")
      push()
      translate(windowWidth * 0.5, windowHeight * 0.5)
      noStroke();
      ellipse(this.x, this.y, this.r, this.r);
      pop() 
    }
  
    pressed() {
      // Did I click on the rectangle?
      if (this.isInside(this.getCoord()[0], this.getCoord()[1])) {
        this.dragging = true;
        if (this.click == true) {
          this.click = false
        } else {
          this.click = true;
        }
        // If so, keep track of relative location of click to corner of rectangle
        this.offsetX = this.x - this.getCoord()[0];
        this.offsetY = this.y - this.getCoord()[1];
      }
    }
  
    released() {
      // Quit dragging
      this.dragging = false;
      console.log("here")
       

    }
    
    display() {
      this.over();
      this.update();
      this.show();
    }
  }