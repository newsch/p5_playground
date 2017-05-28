mapVal = function(a, b, t) {
  return a + (b - a) * t;
}

mapPoint = function(pointA, pointB, t) {
  return {
    x: mapVal(pointA.x, pointB.x, t),
    y: mapVal(pointA.y, pointB.y, t),
  }
}

distFromLine = function(pointA, pointB, pointC) {
  return Math.abs((pointB.y - pointA.y) * pointC.x - (pointB.y, pointA.x) * pointC.y + pointB.x * pointA.y - pointB.y * pointA.x) / Math.sqrt((pointB.y - pointB.y) ** 2 + (pointB.x - pointA.x) ** 2);
}

function MoveablePoint(x, y) {
  this.x = x;
  this.y = y;
  this.r = 10;  // diameter
  this.fillColor = '#ffffff';
  this.strokeColor = '#000000';

  this.draw = function() {
    stroke(this.strokeColor);
    // fill(this.fillColor);
    ellipse(this.x, this.y, this.r * 2, this.r * 2);
  }

  this.mouseOver = function() {
    return dist(mouseX, mouseY, this.x, this.y) <= this.r;
  }
}

function InteractiveBezier(a1x, a1y, c1x, c1y, c2x, c2y, a2x, a2y) {
  this.a1 = new MoveablePoint(a1x, a1y);
  this.c1 = new MoveablePoint(c1x, c1y);
  this.a2 = new MoveablePoint(a2x, a2y);
  this.c2 = new MoveablePoint(c2x, c2y);

  this.draw = function() {
    bezier(this.a1.x, this.a1.y, this.c1.x, this.c1.y, this.c2.x, this.c2.y, this.a2.x, this.a2.y);
    line(this.c1.x, this.c1.y, this.a1.x, this.a1.y);
    this.c1.draw();
    line(this.c2.x, this.c2.y, this.a2.x, this.a2.y);
    this.c2.draw();
  }

  this.checkPoints = function() {
    if (this.c1.mouseOver()) {
      this.c1.x = mouseX;
      this.c1.y = mouseY;
    } else if (this.c2.mouseOver()) {
      this.c2.x = mouseX;
      this.c2.y = mouseY;
    }
  }

  this.getPoints = function() {
    return [this.a1.x, this.a1.y, this.c1.x, this.c1.y, this.c2.x, this.c2.y, this.a2.x, this.a2.y];
  }

  this.getPoint = function(t) {
    return {
      x: bezierPoint(this.a1.x, this.c1.x, this.c2.x, this.a2.x, t),
      y: bezierPoint(this.a1.y, this.c1.y, this.c2.y, this.a2.y, t),
    }
  }

  this.split = function(t) {
    // from this stack overflow: https://stackoverflow.com/questions/18655135/divide-bezier-curve-into-two-equal-halves
    E = mapPoint(this.a1, this.c1, t);
    F = mapPoint(this.c1, this.c2, t);
    G = mapPoint(this.c2, this.a2, t);
    H = mapPoint(E, F, t);
    J = mapPoint(F, G, t);
    K = mapPoint(H, J, t);  //equal to this.getPoint(t)
    return [[this.a1.x, this.a1.y, E.x, E.y, H.x, H.y, K.x, K.y], [K.x, K.y, J.x, J.y, G.x, G.y, this.a2.x, this.a2.y]]  // TODO: replace this with InteractiveBezier.getPoints()
  }

  this.getInflection = function() {
    self = this;
    distLine = function(t) {
      return distFromLine(self.a1, self.a2, self.getPoint(t));
    }
    curRatio = 0.5;
    leftRatio = 0;
    rightRatio = 1;
    curDist = distLine(curRatio);
    count = 0;
    while (curDist > 2 && count < 1000) {  // binary search
      leftTestRatio = (curRatio + leftRatio) / 2;
      leftTestDist = distLine(leftTestRatio);
      rightTestRatio = (curRatio + leftRatio) / 2;
      rightTestDist = distLine(rightTestRatio);
      if (leftTestDist < rightTestDist) {
        rightRatio = curRatio;
        curRatio = leftTestRatio;
        curDist = leftTestDist
      } else {
        leftRatio = curRatio;
        curRatio = rightTestRatio;
        curDist = rightTestDist;
     }
     count++;
    }
    return curRatio;
  }
}

function InteractiveCurve(a1x, a1y, c1x, c1y,  c2x, c2y, a2x, a2y) {
  this.a1 = new MoveablePoint(a1x, a1y);
  this.c1 = new MoveablePoint(c1x, c1y);
  this.a2 = new MoveablePoint(a2x, a2y);
  this.c2 = new MoveablePoint(c2x, c2y);

  this.draw = function() {
    curve(this.c1.x, this.c1.y, this.a1.x, this.a1.y, this.a2.x, this.a2.y, this.c2.x, this.c2.y,);
    line(this.c1.x, this.c1.y, this.a1.x, this.a1.y);
    this.c1.draw();
    line(this.c2.x, this.c2.y, this.a2.x, this.a2.y);
    this.c2.draw();
  }

  this.checkPoints = function() {
    if (this.c1.mouseOver()) {
      this.c1.x = mouseX;
      this.c1.y = mouseY;
    } else if (this.c2.mouseOver()) {
      this.c2.x = mouseX;
      this.c2.y = mouseY;
    }
  }

  this.getPoints = function() {
    return [this.a1.x, this.a1.y, this.c1.x, this.c1.y, this.c2.x, this.c2.y, this.a2.x, this.a2.y];
  }
}
