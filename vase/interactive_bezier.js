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

slope = function(pointA, pointB) {
  return (pointB.y - pointA.y) / (pointB.x - pointA.x);
}

/** Class representing a point that can be moved by the mouse */
function MoveablePoint(x, y) {
  this.x = x;
  this.y = y;
  this.r = 15;  // radius
  this.fillColor = '#ffffff';
  this.strokeColor = '#000000';

  this.draw = function() {
    stroke(this.strokeColor);
    // fill(this.fillColor);
    noFill();
    ellipse(this.x, this.y, this.r * 2, this.r * 2);
    noStroke();
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
    stroke('#ffffff');
    line(this.c1.x, this.c1.y, this.a1.x, this.a1.y);
    line(this.c2.x, this.c2.y, this.a2.x, this.a2.y);
    this.c1.draw();
    this.a1.draw();
    this.c2.draw();
    this.a2.draw();
    noStroke();
  }

  this.checkPoints = function() {
    pointsToCheck = [this.c1, this.c2, this.a1, this.a2];
    for (i = 0; i < pointsToCheck.length; i++) {
      if (pointsToCheck[i].mouseOver()) {
        curX = pointsToCheck[i].x;
        curY = pointsToCheck[i].y;
        newX = mouseX;
        newY = mouseY;
        switch (i) {
          // // don't cross center line
          // default:
          //   if (newX >= 200) {
          //     newX = 200;
          //     print('hey');
          //   }
          // prevent control points from being moved above/below anchor points
          case 0:
            if (newY <= this.a1.y) {
              newY = this.a1.y;
            }
            break;
          case 1:
            if (newY >= this.a2.y) {
              newY = this.a2.y;
            }
            break;
          // keep base in same y position
          case 3:
            newY = curY;
            break;
        }
        diffX = newX - curX;
        diffY = newY - curY;
        if (i > 1) {  // if moving anchor point also move control point
          pointsToCheck[i - 2].x += diffX;
          pointsToCheck[i - 2].y += diffY;
        }

        pointsToCheck[i].x = newX;
        pointsToCheck[i].y = newY;
        break;
      }
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

  this.hasInflection = function() {
    bezSlope = slope(this.c1, this.c2);
    a1Slope = slope(this.c1, this.a1);
    a2Slope = slope(this.c1, this.a2);
    return !((a1Slope > bezSlope && a2Slope > bezSlope) || (a1Slope < bezSlope && a2Slope < bezSlope));
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
    line(this.c2.x, this.c2.y, this.a2.x, this.a2.y);
    this.c1.draw();
    this.c2.draw();
    this.a1.draw();
    this.a2.draw();
  }

  this.checkPoints = function() {
    pointsToCheck = [this.c1, this.c2, this.a1, this.a2];
    for (i = 0; i < pointsToCheck.length; i++) {
      if (pointsToCheck[i].mouseOver()) {
        pointsToCheck[i].x = mouseX;
        pointsToCheck[i].y = mouseY;
      }
    }
  }

  this.getPoints = function() {
    return [this.a1.x, this.a1.y, this.c1.x, this.c1.y, this.c2.x, this.c2.y, this.a2.x, this.a2.y];
  }
}
