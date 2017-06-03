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

  colorMode(HSL);  // hue (0-360), saturation (0 - 100), luminance (0 - 100)
  // colorMode(HSB);  // hue (0-360), saturation (0 - 100), brightness(0 - 100)

  background(colors.background);
  fill(colors.foreground);
  noStroke();
  // noLoop();
}

function draw() {
  divisions = divisionSlider.value();
  rectWidth = (canvasWidth - padding * 2) / divisions;
  rectHeight = canvasHeight - padding * 2;
  for (i = 0; i < divisions; i++) {
    fill(360 / divisions * i, 100, 50);  // HSL
    // fill(360 / divisions * i, 100, 100);  // HSB
    x = padding + rectWidth * i;
    y = padding;
    rect(x, y, rectWidth, rectHeight);
  }
}

// function windowResized() {
//   resizeCanvas(windowWidth, windowHeight);
// }
