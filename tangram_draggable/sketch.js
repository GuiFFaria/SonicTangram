let shape1, shape2, shape3, shape4, shape5, shape6, shape7
let color1, color2, color3, color4, color5, color6, color7
let menu, infoImg

function preload() {
  infoImg = loadImage('icon.png');
}
function setup() {

  angleMode(DEGREES);
  createCanvas(windowWidth, windowHeight);
  let widthTangram = 200;
  let h = sqrt(pow(widthTangram, 2) * 2);
  
  //color palette
  
  color1 = '#8ecae6'
  color2 = '#219ebc'
  color3 = '#126782'
  color4 = '#023047'
  color5 = '#ffb703'
  color6 = '#fd9e02'
  color7 = '#fb8500'

  
  menu = new DraggableMenu(widthTangram, -widthTangram, 20, "red", infoImg);
  
  shape1 = new DraggableTriangle(0, 0, h/2, h/2, -135, color1);

  shape2 = new DraggableTriangle(0, 0, h/2, h/2, -45, color2);
    
  shape3 = new DraggableSquare(0,0,h/4,h/4, 45, color3);
  
  shape4 = new DraggableTriangle(h/4, 0, h/4, h/4, 45, color4);
  
  shape5 = new DraggableTriangle(0, 0, h/4, h/4, 135, color5); 
 
  shape6 = new DraggableParallelogram(-widthTangram/4,-widthTangram/4, widthTangram/2, widthTangram/4, 270, color6);
  
  shape7 = new DraggableTriangle(-widthTangram/2,-widthTangram/2, widthTangram/2, widthTangram/2, -90, color7); 
  
  
}




function draw() {
  background(255)
  // image(infoImg, 0, 0)
  shape1.display();
  shape2.display();
  shape3.display();
  shape4.display();
  shape5.display(); 
  shape6.display();
  shape7.display();
  menu.display();



}


function mousePressed() {
  shape1.pressed();
  shape2.pressed();
  shape3.pressed();
  shape4.pressed();
  shape5.pressed();
  shape6.pressed();
  shape7.pressed();
  menu.pressed();
}

function mouseReleased() {
  shape1.released();
  shape2.released();
  shape3.released();
  shape4.released();
  shape5.released();
  shape6.released();
  shape7.released();
  menu.released();
}