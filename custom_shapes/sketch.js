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

  beginShape();
    vertex(-canvasWidth / 3, -canvasHeight / 3);
    vertex(canvasWidth / 3, -canvasHeight / 3);
    vertex(canvasWidth / 3, canvasHeight / 3);
    bezierVertex(0, canvasHeight / 4,
                 0, canvasHeight / 4,
                 -canvasWidth / 3, canvasHeight / 3,
    );
    // vertex(-canvasWidth / 3, canvasHeight / 3);
    push();
    translate(canvasWidth / 3, canvasHeight / 6);
    beginContour();  // contours must cut in the opposite direction of the shape
      vertex(-canvasWidth / 6, canvasHeight / 6);
      vertex(canvasWidth / 6, canvasHeight / 6);
      vertex(canvasWidth / 6, -canvasHeight / 6);
      vertex(-canvasWidth / 6, -canvasHeight / 6);
    endContour();
    pop();
  endShape(CLOSE);
}
// function windowResized() {
//   resizeCanvas(windowWidth, windowHeight);
// }
