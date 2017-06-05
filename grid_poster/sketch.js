function setup() {
  canvasWidth = 850, canvasHeight = 1100;
  colors = {
    foreground: '#000',
    background: '#fff'
  }

  createCanvas(canvasWidth, canvasHeight);

  // set up grid
  marginHorizontal = 10;
  marginVertical = 10;
  var grid = new EasyGrid({
    x: marginHorizontal,
    y: marginVertical,
    columns: 6,
    rows: 8,
    gutter: 10,
    width: canvasWidth - marginHorizontal * 2,
    height: canvasHeight - marginVertical * 2,
  });

  background(colors.background);

  // reveal modules
  stroke(colors.foreground);
  for (var i = 0; i < grid.modules.length; i++) {
    var module = grid.modules[i];
    rect(module.x, module.y, module.width, module.height);
  }

  fill(colors.foreground);
  noStroke();

  rectMode(CORNERS);
  mod1 = grid.getModule(1, 1);
  mod2 = grid.getModule(3, 1);
  rect(mod1.x, mod1.y, mod2.x + mod2.width, mod2.y + mod2.height);
}

// function windowResized() {
//   resizeCanvas(windowWidth, windowHeight);
// }
