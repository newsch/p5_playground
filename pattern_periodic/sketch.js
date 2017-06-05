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
  frameRate(30);

  mod = 0;
  shrink = true;
}

function draw() {
  background(colors.background);
  size = 100;
  x = 0;
  y = 0;
  for (i = 0; i <= canvasWidth / size; i++) {
    for (j = 0; j <= canvasHeight / size; j++) {
      x = size * i;
      y = size * j;
      quad(
        x, y,
        x + size * mod, y + size * (1 - mod),
        x + size, y + size,
        x + size * (1 - mod), y + size * mod,
      );
    }
  }
  if (mod <= 0) shrink = true;
  else if (mod >= 0.5) shrink = false;
  if (shrink) mod += 0.01; else mod -= 0.01;
}

// function windowResized() {
//   resizeCanvas(windowWidth, windowHeight);
// }
