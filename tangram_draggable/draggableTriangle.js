
class DraggableTriangle {
  
    constructor(x, y, c1, c2, ang, chosenColor) {
      
      this.dragging = false; // Is the object being dragged?
      this.rollover = false; // Is the mouse over the ellipse?

      this.ang = ang

      this.x = x ;
      this.y = y ;
      
      //catetos
      this.c1 = c1;
      this.c2 = c2;

      this.offsetX = 0;
      this.offsetY = 0;

      this.chosenColor = chosenColor;
      
    }
    
    local() {
      const matrix = drawingContext.getTransform();
      const localCoord = matrix
                        .inverse()
                        .transformPoint(
                          new DOMPoint(
                            mouseX * pixelDensity(),
                            mouseY * pixelDensity())
                                      );
    return localCoord;
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
      if (this.isInside(this.currentMouseX(), this.currentMouseY())) {
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
      rotate(this.ang)
      triangle(this.x, this.y, this.x + this.c1, this.y, this.x, this.y + this.c2);
      pop() 
    }
  
    pressed() {
      // Did I click on the rectangle?
      if (this.isInside(this.currentMouseX(), this.currentMouseY())) {
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