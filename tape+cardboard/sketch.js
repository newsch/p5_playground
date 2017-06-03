var canvasWidth = 800, canvasHeight = 450;
var backgroundColor = '#a58855';
var tapeColor = '#dddddd';
var tapeAlpha = 200;
var tapeNum = 2000;
var tapeWidth = canvasWidth / 80;
var tapeHeight = canvasHeight / 12.5;

function hexToRgb(hexString) {
  aColor = color(hexString);
  return [red(aColor), green(aColor), blue(aColor)];
}

function hexToRgbAlpha(hexString, alphaValue) {
  colorArray = hexToRgb(hexString);
  colorArray[3] = alphaValue;
  return colorArray;
}

function setup() {
  createCanvas(canvasWidth, canvasHeight);
  background(backgroundColor);
  rectMode(CENTER);
  noStroke();
  fill(hexToRgbAlpha(tapeColor, tapeAlpha));
}

function draw() {
  for (i = 0; i < tapeNum; i++) {
    x = random(0, canvasWidth);
    y = random(0, canvasHeight);
    rect(x, y, tapeWidth, tapeHeight);
  }
  noLoop();
}
