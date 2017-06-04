function setup() {
  canvasWidth = 400, canvasHeight = 400;
  colors = {
    foreground: '#000',
    background: '#fff'
  }

  createCanvas(canvasWidth, canvasHeight);

  background(colors.background);
  fill(colors.foreground);
  noStroke();
  noLoop();
}

function draw() {
  diameter = canvasHeight / 3;
  ellipse(canvasWidth / 2, canvasHeight / 2, diameter, diameter);
}

// function windowResized() {
//   resizeCanvas(windowWidth, windowHeight);
// }
