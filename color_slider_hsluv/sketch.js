function fillHsluv(h, s, l) {
  var rgb = hsluv.hsluvToRgb([h, s, l]);
  fill(rgb[0] * 255, rgb[1] * 255, rgb[2] * 255);
}

function strokeHsluv(h, s, l) {
  var rgb = hsluv.hsluvToRgb([h, s, l]);
  stroke(rgb[0] * 255, rgb[1] * 255, rgb[2] * 255);
}

function setup() {
  canvasWidth = 800, canvasHeight = 450;
  colors = {
    foreground: '#000',
    background: '#fff'
  }
  padding = 100;

  createCanvas(canvasWidth, canvasHeight);

  divisionSlider = createSlider(1, 100, 7, 1);
  divisionSlider.style('width', '300px');

  colorMode(RGB);
  background(colors.background);
  fill(colors.foreground);
  noStroke();
  // noLoop();
}

function draw() {
  divisions = divisionSlider.value();
  rectWidth = (canvasWidth - padding * 2) / divisions;
  rectHeight = (canvasHeight - padding * 2);
  for (i = 0; i < divisions; i++) {
    x = padding + rectWidth * i;
    y = padding;
    // fillHsluv(360 / divisions * i, 100, 50);  // HSLuv w/ static lightness
    fillHsluv(0, 100, 100 / divisions * i);  // HSLuv w/ variable lightness
    rect(x, y, rectWidth, rectHeight);
  }
}

// function windowResized() {
//   resizeCanvas(windowWidth, windowHeight);
// }
