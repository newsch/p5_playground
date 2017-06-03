function setup() {
  canvasWidth = 400, canvasHeight = 400;
  backgroundColor = '#fff';
  fillColor = '#000';

  createCanvas(canvasWidth, canvasHeight);

  background(backgroundColor);
  fill(fillColor);
  noStroke();

  noLoop();
}

function draw() {
  rectMode(CENTER);
  push();  // save current state of canvas
  translate(canvasWidth / 2, canvasHeight / 2);  // translate reference point to center of canvas
  rotate(radians(45));  // rotate canvas 45 degrees
  diameter = canvasHeight / 3;
  rect(0, 0, diameter, diameter);
  pop();  // load saved state
  fill(backgroundColor);
  rect(canvasWidth / 2, canvasHeight / 2, diameter / 3, diameter / 3);
}

// function windowResized() {
//   resizeCanvas(windowWidth, windowHeight);
// }
