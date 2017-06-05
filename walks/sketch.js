var canvasWidth = 400, canvasHeight = 500;

var HSL_BACK_COLOR = true;     // use HSL for background
var BACK_COLOR = '#fff';       // value used if !HSL_BACK_COLOR

var RND_BACK_HUE = true;       // random hue for background color
var BACK_HUE = 0;              // value used if !RND_BACK_HUE
var BACK_HUE_LOWER = 0;        // lower bound for rnd hue generation
var BACK_HUE_UPPER = 360;      // upper bound for rnd hue generation

var RND_BACK_SAT = false;      // random saturation for background color
var BACK_SAT = 30;
var BACK_SAT_LOWER = 0;
var BACK_SAT_UPPER = 100;

var RND_BACK_LIGHT = false;    // random lightness for background color
var BACK_LIGHT = 50;
var BACK_LIGHT_LOWER = 0;
var BACK_LIGHT_UPPER = 100;

var RND_FORE_COLOR = false;    // random foreground color
var FORE_COLOR = '#676767';

// line width and spacing are the opposite of what they appear

var USE_MASK = false;          // use masking (reveal objects behind shape)

var RND_LINE_WIDTH = true;     // random width for lines drawn over shape
var LINE_WIDTH = 4;
var LINE_WIDTH_LOWER = 1;
var LINE_WIDTH_UPPER = 3;

var RND_LINE_SPACING = true;   // random spacing for lines drawn over shape
var LINE_SPACING = 4;
var LINE_SPACING_LOWER = 1;
var LINE_SPACING_UPPER = 4;

var RND_VERTEX_RADIUS = true;  // random radius for vertices of shape
var VERTEX_RADIUS = 10;
var VERTEX_RADIUS_LOWER = 50;
var VERTEX_RADIUS_UPPER = 150;

var RND_VERTEX_COUNT = true;   // random number of vertices
var VERTEX_COUNT = 10;
var VERTEX_COUNT_LOWER = 4;
var VERTEX_COUNT_UPPER = 15;

// var RND_VERTEX_ANGLE = true;  // takes priority over RND_VERTEX_COUNT
// var VERTEX_ANGLE = 20;  // in radians
// var VERTEX_ANGLE_LOWER = 15;
// var VERTEX_ANGLE_UPPER = 90;

// function getVertex(angle, radius) {
//   return {
//     x: cos(radians(this.angle)) * this.radius,
//     y: sin(radians(this.angle)) * this.radius
//   }
// }

/** Sets fill color with HSLuv */
function fillHsluv(h, s, l, canvas=null) {
  var rgb = hsluv.hsluvToRgb([h, s, l]);
  if (this.canvas) this.canvas.fill(rgb[0] * 255, rgb[1] * 255, rgb[2] * 255);
  else fill(rgb[0] * 255, rgb[1] * 255, rgb[2] * 255);
}

/** Sets stroke color with HSLuv */
function strokeHsluv(h, s, l) {
  var rgb = hsluv.hsluvToRgb([h, s, l]);
  stroke(rgb[0] * 255, rgb[1] * 255, rgb[2] * 255);
}

/** Sets background color with HSLuv */
function backgroundHsluv(h, s, l) {
  var rgb = hsluv.hsluvToRgb([h, s, l]);
  background(rgb[0] * 255, rgb[1] * 255, rgb[2] * 255);
}

function setup() {
  canvas = createCanvas(canvasWidth, canvasHeight);

  noStroke();
  noLoop();
  // draw(), frameRate(1);  // FEATURE: slideshow w/o clearing background
}

function draw() {
  translate(canvasWidth / 2, canvasHeight / 2);

    // generate colors
    if (RND_FORE_COLOR) {
      // TODO: implement random foreground color
    } else foregroundColor = FORE_COLOR;

    if (HSL_BACK_COLOR) {
      if (RND_BACK_HUE) {
        backHue = random(BACK_HUE_LOWER, BACK_HUE_UPPER);
      } else backHue = BACK_HUE;
      if (RND_BACK_SAT) {
        backSat = random(BACK_SAT_LOWER, BACK_SAT_UPPER);
      } else backSat = BACK_SAT;
      if (RND_BACK_LIGHT) {
        backLight = random(BACK_LIGHT_LOWER, BACK_LIGHT_UPPER);
      } else backLight = BACK_LIGHT;
      backHsluv = [backHue, backSat, backLight];
      console.log('random color: ', backHsluv);
    } else backgroundColor = BACK_COLOR;
    if (HSL_BACK_COLOR) {
      backgroundHsluv.apply(null, backHsluv);
    } else background(BACK_COLOR);
    fill(foregroundColor);

  // // prove mask
  // fill('#ff0000');
  // ellipse(0, 0, 50, 50);

  // shape
  shapeBounds = {
    lower: -canvasHeight / 2,
    upper: canvasHeight / 2,
  }
  if (RND_VERTEX_COUNT) {
    vertexCount = random(VERTEX_COUNT_LOWER, VERTEX_COUNT_UPPER);
  } else vertexCount = VERTEX_COUNT;

  if (USE_MASK) {
    shapeMask = createGraphics(canvasWidth, canvasHeight);
    shapeMask.translate(canvasWidth / 2, canvasHeight / 2);
    // shapeMask.background(0, 0, 255);  // set background to blue (not necessary?)
    shapeMask.noStroke();
    shapeMask.fill(foregroundColor);
    shapeMask.beginShape();
  } else {
    noStroke();
    fill(foregroundColor);
    beginShape();
  }
    for (i = 0; i < 360; i += 360 / vertexCount) {
      if (RND_VERTEX_RADIUS) {
        radius = random(VERTEX_RADIUS_LOWER, VERTEX_RADIUS_UPPER);
      } else radius = VERTEX_RADIUS;
      x = cos(radians(i)) * radius;
      y = sin(radians(i)) * radius;
      if (USE_MASK) shapeMask.vertex(x, y); else vertex(x, y);
    }
  if (USE_MASK) shapeMask.endShape(CLOSE); else endShape(CLOSE);

  // lines
  translate(-canvasWidth / 2, -canvasHeight / 2);
  x = 0;
  lineWidth = 0;
  lineSpacing = 0;
  strokeWeight(lineWidth);

  if (USE_MASK) {  // create renderer object
    lineMask = createGraphics(canvasWidth, canvasHeight);
    // lineMask.translate(canvasWidth / 2, canvasHeight / 2);
    lineMask.stroke('#0000ff');
  }

  if (HSL_BACK_COLOR) {
    strokeHsluv.apply(null, backHsluv);
  } else stroke(BACK_COLOR);

  while (x < canvasWidth) {
    // TODO: allow for vertices to move backwards
    x += lineWidth / 2;
    if (RND_LINE_WIDTH) {
      lineWidth = random(LINE_WIDTH_LOWER, LINE_WIDTH_UPPER);
      strokeWeight(lineWidth);
    } else lineWidth = LINE_WIDTH;
    if (RND_LINE_SPACING) {
      lineSpacing = random(LINE_SPACING_LOWER, LINE_SPACING_UPPER);
    } else lineSpacing = LINE_SPACING;
    x += lineSpacing + lineWidth / 2;
    if (USE_MASK) {  // draw to renderer
      lineMask.strokeWeight(lineWidth);
      lineMask.line(x, 0, x, canvasHeight);
    } else line(x, 0, x, canvasHeight);
  }
  if (USE_MASK) {  // put it all together
    function copyPixels(canvas1, canvas2) {
      canvas1.loadPixels();
      canvas2.loadPixels();
      for (i = 0; i < canvas2.pixels.length; i++) {
        canvas2.pixels[i] = canvas1.pixels[i];
      }
    }
    canvas.loadPixels();
    lineMask.loadPixels();
    shapeMask.loadPixels();
    lineImage = new p5.Image(canvasWidth, canvasHeight);
    shapeImage = new p5.Image(canvasWidth, canvasHeight);
    lineImage.loadPixels();
    shapeImage.loadPixels();
    // lineImage.pixels = lineMask.pixels.slice();
    copyPixels(lineMask, lineImage);
    // lineImage.copy(lineMask);
    lineImage.updatePixels();
    // shapeImage.pixels = shapeMask.pixels.slice();
    copyPixels(shapeMask, shapeImage);
    shapeImage.updatePixels();
    shapeImage.mask(lineImage);
    image(shapeImage, 0, 0);
  }
  // TODO: center canvas around shape
  console.log('done');
}

// function windowResized() {
//   resizeCanvas(windowWidth, windowHeight);
// }
