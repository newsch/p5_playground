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
  translate(canvasWidth / 2, canvasHeight / 2);

  shapeBounds = {
    lower: -canvasHeight / 2,
    upper: canvasHeight / 2,
  }
  beginShape();
    for (i = 0; i < 10; i++) {
      vertex(random(shapeBounds.lower, shapeBounds.upper),
             random(shapeBounds.lower, shapeBounds.upper));
    }
  endShape(CLOSE);  // return to initial vertex and end shape
}
// function windowResized() {
//   resizeCanvas(windowWidth, windowHeight);
// }
