function setup() {
  canvasWidth = 450, canvasHeight = 900;
  colors = {
    foreground: '#000',
    background: '#fff'
  }

  createCanvas(canvasWidth, canvasHeight);

  background(colors.background);
  fill(colors.foreground);
  stroke(colors.background);
  strokeWeight(10);
  noLoop();
}

function draw() {
  translate(canvasWidth / 2, canvasHeight / 3);
  diameter = canvasHeight / 3;
  // ice cream
  for (i = 1; i >= 0; i--) {
      ellipse(-i * 40, -i * 160, diameter - i * 40, diameter - i * 40);
  }
  startingPoint = {
    x: -diameter / 2,
    y: 30,
  }
  // cone
  coneWidth = abs(startingPoint.x) * 2;
  triangleBase = coneWidth / 3;
  triangleHeight = canvasHeight / 6;
  for (c = 0; c < 3; c++) {
    for (r = 0; r < 3; r++) {
      triangle(startingPoint.x + triangleBase * c,
               startingPoint.y + triangleHeight * r,
               startingPoint.x + triangleBase * (c + 1),
               startingPoint.y + triangleHeight * r,
               startingPoint.x + triangleBase * (c + 1) / 2,
               startingPoint.y + triangleHeight * (r + 1)
      );
    }
  }
  // triangle(startingPoint.x, startingPoint.y, diameter / 2, 30, 0, canvasHeight * 2/3);
}

// function windowResized() {
//   resizeCanvas(windowWidth, windowHeight);
// }
