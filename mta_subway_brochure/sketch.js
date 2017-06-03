var canvasWidth = 800, canvasHeight = canvasWidth / 8 * 4;
var backgroundColor = '#111111';
var lineColor = '#dddddd';
var lineHeight = canvasHeight / 30;
var lineSpacing = canvasHeight / 100;
var lineLengthMin = canvasWidth * 0.05;
var lineLengthMax = canvasWidth * 0.75;

function setup() {
  createCanvas(canvasWidth, canvasHeight);
  background(backgroundColor);
  strokeWeight(lineHeight);
}

function draw() {
  currentY = lineSpacing + lineHeight / 2;
  canvasBounds = [0, canvasWidth];
  while (currentY < canvasHeight - (lineHeight + lineSpacing)) {
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
    stroke(lineColor);
    line(pointA, currentY, pointB, currentY);
    currentY += lineSpacing + lineHeight;
    console.log(pointA + ', ' + lineLength + ': ' + pointB);
  }
  noLoop();
}
