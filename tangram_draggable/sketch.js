let shape1, shape2, shape3, shape4, shape5, shape6, shape7



function setup() {
  angleMode(DEGREES);
  createCanvas(windowWidth, windowHeight);
  let widthTangram = 200;
  let h = sqrt(pow(widthTangram, 2) * 2);
  
  shape1 = new DraggableTriangle(0, 20, 100, 100, 0, "red");

  shape2 = new DraggableSquare(0, 20, 50, 50, 0, "green");
    
  shape3 = new DraggableParallelogram(20,0,70,30, 0, "yellow");
  
  shape1 = new DraggableTriangle(0, 0, h/2, h/2, -135, "red");

  shape2 = new DraggableTriangle(0, 0, h/2, h/2, -45, "orange");
    
  shape3 = new DraggableSquare(0,0,h/4,h/4, 45, "yellow");
  
  
  shape4 = new DraggableTriangle(h/4, 0, h/4, h/4, 45, "pink");
  
   shape5 = new DraggableTriangle(0, 0, h/4, h/4, 135, "green");
 
  shape6 = new DraggableParallelogram(0,0, widthTangram/2, widthTangram/4, 270, "blue");
  
  shape7 = new DraggableTriangle(-widthTangram/2,-widthTangram/2, widthTangram/2, widthTangram/2, -90, "purple");
  
  
}




function draw() {
  background(255)
  shape1.display();
  shape2.display();
  shape3.display();
  shape4.display();
  shape5.display();
  shape6.display();
  shape7.display();



}


function mousePressed() {
  shape1.pressed();
  shape2.pressed();
  shape3.pressed();
  shape4.pressed();
  shape5.pressed();
  shape6.pressed();
  shape7.pressed();
}

function mouseReleased() {
  shape1.released();
  shape2.released();
  shape3.released();
  shape4.released();
  shape5.released();
  shape6.released();
  shape7.released();
}