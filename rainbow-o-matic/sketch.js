var rainbowColors = ['#eeeeee', '#FF0000', '#FF7F00', '#FFFF00', '#00FF00', '#0000FF', '#4B0082', '#9400D3'];
var backgroundColor = '#dddddd';
var rainbowArcs = [];
var currentColor = 0;
var oldRadius = 0;
var currentRadius = 0;
var drawRainbow = false;
// var target = false;
var canvasWidth = 400; canvasHeight = 400;

function setup() {
  createCanvas(canvasWidth, canvasHeight);
  background(backgroundColor);
  noStroke();
  frameRate(60);
}

function draw() {
  if (drawRainbow) {
    fill(rainbowColors[currentColor]);
    arc(canvasWidth / 2, canvasHeight, currentRadius, currentRadius, PI, 0);
    currentRadius += 5;
    console.log('rainbowArcs length: ' + rainbowArcs.length);
    if (rainbowArcs.length > 0) {
      for (i = rainbowArcs.length - 1; i >= 0; i--) {
          console.log('i: ' + i);
          fill(rainbowColors[i]);
          arcRadius = rainbowArcs[i];
          arc(canvasWidth / 2, canvasHeight, arcRadius, arcRadius, PI, 0);
          console.log('drew ' + rainbowColors[i]);
      }
    }
  }
}

function mousePressed() {
  if (currentColor >= rainbowColors.length) {
    background(backgroundColor);
    rainbowArcs = [];
    currentColor = 0;
    currentRadius = 0;
  } else {
    drawRainbow = true;
  }
  // loop();
  // console.log('down');
}

function mouseReleased() {
  if (drawRainbow) {
  drawRainbow = false;
  // noLoop();
  rainbowArcs[rainbowArcs.length] = currentRadius;
  currentColor++;
}
  // console.log('up');
}
