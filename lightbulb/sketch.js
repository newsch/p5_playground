var on = false;
var bez = {
  a1: {
    x: 100,
    y: 150,
  },
  a2: {
    x: 150,
    y: 350,
  },
  c1diff: {
    x: 0,
    y: 100,
  },
  c2diff: {
    x: 0,
    y: 150,
  },
  c1: new MoveablePoint(100, 250),
  c2: new MoveablePoint(150, 200),

  draw: function() {
    noFill();
    bezier(this.a1.x, this.a1.y, this.c1.x, this.c1.y, this.c2.x, this.c2.y, this.a2.x, this.a2.y);
    line(this.c1.x, this.c1.y, this.a1.x, this.a1.y);
    this.c1.draw();
    line(this.c2.x, this.c2.y, this.a2.x, this.a2.y);
    this.c2.draw();
  },

  checkPoints: function() {
    if (this.c1.mouseOver()) {
      this.c1.x = mouseX;
      this.c1.y = mouseY;
    } else if (this.c2.mouseOver()) {
      this.c2.x = mouseX;
      this.c2.y = mouseY;
    }
      // if (this.points[i].mouseOver()) {
      //   this.points[i].move();
      // }
  },

  getPoints: function() {
    return [this.a1.x, this.a1.y, this.c1.x, this.c1.y, this.c2.x, this.c2.y, this.a2.x, this.a2.y];
  },
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
}

function draw() {
  // bulb
  // fill(255);
  background(255);
  arc(200, 150, 200, 200, PI, TWO_PI);
  noFill();
  bezier.apply(null, mirrorPoints(bez.getPoints(), [200, null, 200, null, 200, null, 200, null]));
  bez.draw();
  // base

}

function mouseMoved() {
  if (mouseIsPressed) {
    bez.checkPoints();
  }
}
