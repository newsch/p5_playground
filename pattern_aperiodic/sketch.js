function setup() {
  canvasWidth = 400, canvasHeight = 400;
  colors = {
    foreground: '#000',
    background: '#fff'
  }

  // from http://tilings.math.uni-bielefeld.de/substitution/tribonacci/
  createCanvas(canvasWidth, canvasHeight);

  background(colors.background);
  fill(colors.foreground);
  noStroke();
  // noLoop();
  frameRate(30);

  mod = 0.5;
  shrink = true;
}

modLength = 3 / 4;

function split1(x, y, length, height, depth) {
  if (depth > 0) {
    fill('#000');
    rect(x, y, length, height);
    split1(x, y, length * modLength, height, depth - 1);
    split2(x + length * modLength, y, length * (1 - modLength), height, depth);
  }
}

function split2(x, y, length, height, depth) {
  fill('#444');
  rect(x, y, length, height);
  split1(x, y, length * modLength, depth - 1);
  split3(x + length * modLength, y, length * (1 - modLength), height, depth);
}

function split3(x, y, length, height, depth) {
  fill('#888');
  rect(x, y, length, height);
  split1(x, y, length, height, depth - 1);
}

function draw() {
  background(colors.background);
  split1(0, 0, 400, 400, 5);
}

// function windowResized() {
//   resizeCanvas(windowWidth, windowHeight);
// }
