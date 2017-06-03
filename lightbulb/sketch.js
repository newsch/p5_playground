var on = false;
var colors = {
  off: {
    background: '#dddddd',
    bulb: '#cccccc',
    base: '#eeeeee',
  },
  on: {
    background: '#dddddd',
    bulb: '#cccccc',
    base: '#eeeeee',
  }
}

var oldFill;
var curFill;
function setFill(newFill) {
  if (curFill !== newFill) {
    oldFill = curFill;
    curFill = newFill;
  }
  fill(newFill);
}
function revertFill() {
  if (curFill !== oldFill) {
    fill(oldFill);
    curFill = oldFill;
    return true;
  } else {
    return false;
  }
}

function mirrorPoints(points, changes) {
  mirroredPoints = [];
  for (i = 0; i < points.length; i++) {
    if (changes[i] != null) {
      mirroredPoints[i] = points[i] + (changes[i] - points[i]) * 2;
    } else {
      mirroredPoints[i] = points[i];
    }
  }
  return mirroredPoints;
}

function setup() {
  createCanvas(400, 400);
  // background(30);
  // noStroke();
  noFill();
  // noLoop();
  bez = new InteractiveBezier(100, 150, 100, 250, 150, 200, 150, 350);
}

function draw() {
  // bulb
  // fill(255);
  background(255);
  arc(200, 150, 200, 200, PI, TWO_PI);
  bezier.apply(null, mirrorPoints(bez.getPoints(), [200, null, 200, null, 200, null, 200, null]));
  bez.draw();
  // base

}

function mouseMoved() {
  if (mouseIsPressed) {
    bez.checkPoints();
  }
}
