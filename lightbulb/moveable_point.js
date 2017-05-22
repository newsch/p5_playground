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


}
