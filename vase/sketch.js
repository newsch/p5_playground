var colors = {
  background: '#cccccc',
  vase: '#eeeeee',
}
var canvasWidth = 400;
var canvasHeight = 400

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

function drawVase(a1x, a1y, c1x, c1y, c2x, c2y, a2x, a2y, mirrorX) {
  leftPoints = [a1x, a1y, c1x, c1y, c2x, c2y, a2x, a2y];
  rightPoints = mirrorPoints(leftPoints, [mirrorX, null, mirrorX, null, mirrorX, null, mirrorX, null])
  bezier.apply(null, leftPoints);
  bezier.apply(null, rightPoints);
  quad(leftPoints[0], leftPoints[1], rightPoints[0], rightPoints[1], rightPoints[6], rightPoints[7], leftPoints[6], leftPoints[7]);
}

function drawPetal(a1x, a1y, c1x, c1y, c2x, c2y, a2x, a2y) {
  leftPoints = [a1x, a1y, c1x, c1y, c2x, c2y, a2x, a2y];
  // rightPoints = mirrorPoints(leftPoints, [null, null, mirrorX, null, mirrorX, null, null, null])  // TODO: reflect along line between
  bezier.apply(null, leftPoints);
  bezier.apply(null, rightPoints);
}

function setup() {
  createCanvas(canvasWidth, canvasHeight);
  bez = new InteractiveBezier(100, 150, 75, 200, 75, 250, 150, 350);
}

function draw() {
  background(colors.background);
  fill(colors.vase);
  bez.draw();
  // splitBezPoints = bez.split(bez.getInflection);
  // bezUpperPoints = splitBezPoints[0];
  // bezLowerPoints = splitBezPoints[1];
  stroke(colors.vase);

  mirroredPoints = mirrorPoints(bez.getPoints(), [200, null, 200, null, 200, null, 200, null])
  fill(colors.vase);
  bezier.apply(null, mirroredPoints);  // draw mirrored side
  quad(bez.a1.x, bez.a1.y, mirroredPoints[0], mirroredPoints[1], mirroredPoints[6], mirroredPoints[7], bez.a2.x, bez.a2.y);
  bez.draw();
  if (bez.hasInflection()) {
    console.log('hasInflection');
  }
}

function mouseMoved() {
  if (mouseIsPressed) {
    bez.checkPoints();
  }
}
