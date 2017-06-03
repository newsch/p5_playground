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

  background(colors.background);
  fill(colors.foreground);
  noStroke();
  // noLoop();
}

function draw() {
  divisions = divisionSlider.value();
  rectWidth = (canvasWidth - padding * 2) / divisions;
  rectHeight = (canvasHeight - padding * 2) / 2;
  for (i = 0; i < divisions; i++) {
    colorMode(HSL);  // hue (0-360), saturation (0 - 100), luminance (0 - 100)
    // colorMode(HSB);  // hue (0-360), saturation (0 - 100), brightness(0 - 100)
    fill(360 / divisions * i, 100, 50);  // HSL
    // fill(360 / divisions * i, 100, 100);  // HSB
    x = padding + rectWidth * i;
    y = padding;
    rect(x, y, rectWidth, rectHeight);

    colorMode(RGB);
    // fillHsluv(360 / divisions * i, 100, 50);  // HSLuv w/ static lightness
    fillHsluv(360 / divisions * i, 100, 100 / divisions * i);  // HSLuv w/ static lightness
    y_hsluv = padding + rectHeight;
    rect(x, y_hsluv, rectWidth, rectHeight);
  }
}

// function windowResized() {
//   resizeCanvas(windowWidth, windowHeight);
// }
