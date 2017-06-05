function setup() {
  colors = {
    foreground: '#000',
    background: '#fff'
  }

  canvasWidth = 800;
  canvasHeight = 450;

  createCanvas(canvasWidth, canvasHeight);

  // set up grid
  grid = new EasyGrid({
    columns: 10,
    rows: 10,
    gutter: 0,
    width: canvasWidth,
    height: canvasHeight,
  });

  curWidth = grid.modules[0].width;
  curHeight = grid.modules[0].height;
  shrink = true;
  percentage = 0.1;

  stroke(colors.foreground);

  rectMode(CENTER);

  // background(colors.background);
  fill(colors.foreground);
  noStroke();
  // stroke('#888');
  frameRate(30);
  // noLoop();
}

function draw() {
  background(colors.background);
  // reverse growing/shrinking
  if (curWidth < 0.5 || curHeight < 0.5) {
    shrink = false;
  } else if (curWidth >= grid.modules[0].width || curHeight >= grid.modules[0].height) {
    shrink = true;
  }

  if (shrink) {
    curWidth *=  1 - percentage;
    curHeight *= 1 - percentage;
  } else {
    curWidth *= 1 + percentage;
    curHeight *= 1 + percentage;
  }
  for (var i = 0; i < grid.modules.length; i++) {
    var module = grid.modules[i];
    moduleCenter = {
      x: module.x + module.width / 2,
      y: module.y + module.height / 2,
    }
    rect(moduleCenter.x, moduleCenter.y, curWidth, curHeight);
  }
}

// function windowResized() {
//   resizeCanvas(windowWidth, windowHeight);
// }
