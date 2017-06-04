var canvasWidth = 800, canvasHeight = canvasWidth / 8 * 4;
var backgroundColor = '#111111';
var lineColor = '#dddddd';
var lineHeight = canvasHeight / 30;
var lineSpacing = canvasHeight / 100;
var lineLengthMin = canvasWidth * 0.05;
var lineLengthMax = canvasWidth * 0.75;

var USE_COLORS = true;
var NUM_COLORS = 9;
var colors = [];

function fillHsluv(h, s, l) {
  var rgb = hsluv.hsluvToRgb([h, s, l]);
  fill(rgb[0] * 255, rgb[1] * 255, rgb[2] * 255);
}

function strokeHsluv(h, s, l) {
  var rgb = hsluv.hsluvToRgb([h, s, l]);
  stroke(rgb[0] * 255, rgb[1] * 255, rgb[2] * 255);
}

function setup() {
  createCanvas(canvasWidth, canvasHeight);
  background(backgroundColor);
  strokeWeight(lineHeight);

  // fill color palette
  for (i = 0; i < NUM_COLORS; i++) {
    colors[i] = [int(random(37)) * 10, 100, 35 + 25 / NUM_COLORS * i];
  }
}

function draw() {
  currentY = lineSpacing + lineHeight / 2;
  canvasBounds = [0, canvasWidth];
  while (currentY < canvgiasHeight - (lineHeight + lineSpacing)) {
    pointA = canvasBounds[int(random(1, 3)) - 1];
    pointB = new int;
    lineLength = random(lineLengthMin, lineLengthMax);
    switch (pointA) {
      case 0:
        pointB = lineLength;
        break;
      case canvasWidth:
        pointB = canvasWidth - lineLength;
        break;
    }

    if (USE_COLORS) {
      chosenColor = colors[int(random(colors.length))];
      console.log(chosenColor);
      strokeHsluv.apply(null, chosenColor);
    } else stroke(lineColor);
    line(pointA, currentY, pointB, currentY);
    currentY += lineSpacing + lineHeight;
    console.log(pointA + ', ' + lineLength + ': ' + pointB);
  }
  noLoop();
}
