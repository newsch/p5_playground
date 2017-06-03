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
  rectCenter = {
    x: canvasWidth * 2/3,
    y: canvasHeight / 2,
  }
  translate(rectCenter.x, rectCenter.y);
  rotate(radians(10));
  // diameter = canvasHeight / 3;
  rectMode(CENTER);
  rect(0, 0, canvasWidth / 40, canvasHeight * 2);
}

// function windowResized() {
//   resizeCanvas(windowWidth, windowHeight);
// }
