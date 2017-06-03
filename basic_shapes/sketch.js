function setup() {
  canvasWidth = 800, canvasHeight = 450;
  backgroundColor = '#ddd';

  createCanvas(canvasWidth, canvasHeight);

  stroke(backgroundColor);
  strokeWeight(10);
  noLoop();
}

function draw() {
  background(backgroundColor);
  diameter = canvasHeight * 0.75;
  ellipseCenter = {
    x: canvasWidth / 2,
    y: canvasHeight * 0.6
  }
  ellipse(ellipseCenter.x, ellipseCenter.y, diameter, diameter);
  triangle(0, canvasHeight, ellipseCenter.x, ellipseCenter.y - canvasHeight / 10, canvasWidth, canvasHeight);
  noStroke();
  rectHeight = canvasHeight / 8;
  rect(0, canvasHeight - rectHeight, canvasWidth, rectHeight);
}

// function windowResized() {
//   resizeCanvas(windowWidth, windowHeight);
// }
