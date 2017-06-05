function setup() {
  canvasWidth = 800, canvasHeight = 450;
  colors = {
    foreground: '#000',
    background: '#fff'
  }

  createCanvas(canvasWidth, canvasHeight);

  // set up grid
  var grid = new EasyGrid({
    columns: 10,
    rows: 10,
    gutter: 10,
    width: canvasWidth,
    height: canvasHeight,
  });

  // reveal modules
  stroke(colors.foreground);
  for (var i = 0; i < grid.modules.length; i++) {
    var module = grid.modules[i];
    rect(module.x, module.y, module.width, module.height);
  }

  // background(colors.background);
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
