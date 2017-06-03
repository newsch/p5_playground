function setup() {
  canvasWidth = 400, canvasHeight = 400;
  colors = {
    foreground: '#000',
    background: '#fff'
  }

  createCanvas(canvasWidth, canvasHeight);
  frameRate(30);

  vertexSlider = createSlider(2, 50, 5, 1);
  randomSlider = createSlider(0, 100, 50);
  // slider.position(0, canvasHeight);
  vertexSlider.style('width', '300px');
  randomSlider.style('width', '300px');

  background(colors.background);
  // fill(colors.foreground);
  stroke(colors.foreground);
  strokeWeight(3);
  // noStroke();
  // noLoop();
}

function draw() {
  background(colors.background);
  translate(canvasWidth / 2, canvasHeight / 2);
  rotate(radians(-90));

  shapeBounds = {
    lower: -canvasHeight / 2,
    upper: canvasHeight / 2,
  }
  beginShape();
    for (i = 0; i < 360; i += 360 / vertexSlider.value()) {
      radius = 100 + random(0, randomSlider.value());
      var x = cos(radians(i)) * radius;
      var y = sin(radians(i)) * radius;
      vertex(x, y);
    }
  endShape(CLOSE);  // return to initial vertex and end shape
  ellipse(0, 0, canvasWidth / 100, canvasWidth / 100);
}
// function windowResized() {
//   resizeCanvas(windowWidth, windowHeight);
// }
