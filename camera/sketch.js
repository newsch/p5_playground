/*
Here's our first contest to kick off Summer of Scripting,
giving new programmers a chance to practice drawing/coloring functions.

Create a drawing of something you like to do/eat/see in the summer time
(or winter time, if that's what it is where you are.)
Maybe it's flying kites, eating ice cream cones, watching beach sunsets?

In your program, please state if you're a Summer of Scripting student.
If you're not, state your experience level
(# of months you've been programming, % of JS intro concepts you understand).
Attribute any parts of your code you didn't write, as always.

Deadline is July 4th.
I will judge in the week after that, and award based on
creativity, clean commented code, and originality.
You can keep working until I judge.
The top 5 in each bracket (beginner, advanced)
will get a Golden Winston.
*/

var drawCamera, drawPhoto
var palette
var camX = 100;
var camY = 50;
//shutter button variables
var sWidth = 30;
var shutter1 = true;
var shutter2 = false;
//flash variables
var fLength = 30;
var flash1 = false;
var flash2 = false;
//photo variables
var p = 0;
var photo1 = false;
var photo2 = false;

function setup() {
  createCanvas(400, 400);
  frameRate(60);
  palette = [color(255, 239, 214), color(59, 55, 44), color(255, 255, 255), color(0, 0, 0), color(204, 91, 10)];
  noStroke();

  drawCamera = function(xPos, yPos, scale) {
      //camera body
      fill(palette[0]);
      rect(xPos, yPos, 200, 110, 10);

          //rainbow stripes
          var rb = [color(255, 171, 171), color(255, 171, 255), color(255, 255, 171), color(171, 255, 171), color(171, 255, 255)];
          strokeWeight(6);
          for (var i = 0; i < 5; i++) {
              stroke(rb[i]);
              line(xPos + 88 + i * 6, yPos + 103, xPos + 88 + i * 6, yPos + 50);
          }
          noStroke();

      fill(palette[1]);
      rect(xPos, yPos + 100, 200, 50, 10);
      rect(xPos, yPos + 100, 200, 10);

      //lens
      var lensX = xPos + 100;
      var lensY = yPos + 40;
      fill(palette[1]);
      ellipse(lensX, lensY, 70, 70);
      fill(palette[0]);
      ellipse(lensX, lensY, 60, 60);
      fill(palette[1]);
      ellipse(lensX, lensY, 55, 55);
      fill(palette[3]);
      ellipse(lensX, lensY, 30, 30);

      //flash - center at 165, 25
      fill(palette[2]);
      rect(xPos + 145, yPos + 10, 40, 30, 5);

      //photo slot
      fill(palette[3]);
      rect(xPos + 10, yPos + 130, 180, 10);

      //shutter button
      fill(palette[4]);
      ellipse(xPos + 30, yPos + 70, 30, 30);
  };

  drawPhoto = function(xPos, yPos, yScale) {
      fill(palette[2]);
      rect(xPos, yPos, 160, 180 * yScale);
      fill(palette[1]);
      rect(xPos + 10, yPos + 10 * yScale, 140, 140 * yScale);
  };

  drawCamera(camX, camY);
}

function draw() {
  background(194, 167, 167);
  drawCamera(camX, camY);

  //shutter button animation
  if (sWidth <= 20) {
      shutter1 = false;
      shutter2 = true;
      flash1 = true;
  } else if (shutter2 && sWidth >= 30) {
      shutter2 = false;
  }
  if (shutter1) {
      sWidth -= 1;
      fill(palette[0]);
      ellipse(camX + 30, camY + 70, 30, 30);
      fill(palette[4]);
      ellipse(camX + 30, camY + 70, sWidth, sWidth);
  } else if (shutter2) {
      sWidth += 1;
      fill(palette[0]);
      ellipse(camX + 30, camY + 70, 30, 30);
      fill(palette[4]);
      ellipse(camX + 30, camY + 70, sWidth, sWidth);
  }

  //flash animation
  fill(palette[2]);
  if (fLength > 850) {
      flash1 = false;
      flash2 = true;
  } else if (fLength <= 0 && !flash1) {
      flash2 = false;
      photo1 = true;
  }
  if (flash1) {
      ellipse(265, 75, fLength, fLength);
      fLength += 50;
  }
  if (flash2) {
      strokeWeight(fLength);
      noFill();
      stroke(palette[2]);
      ellipse(265, 75, 850, 850);
      fLength -= 50;
      noStroke();
  }

  //photo animation
  if (p >= 1) {
      photo1 = false;
      photo2 = true;
  }
  if (photo1) {
      p += 0.05;
      drawPhoto(120, 185, p);
  }
  if (photo2) {
      drawPhoto(120, 185, 1);
      noLoop();
  }
}

// drawPhoto(120, 185, 1);
