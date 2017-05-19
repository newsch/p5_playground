const canvas_w = 400, canvas_h = 200;

function setup() {
  createCanvas(canvas_w, canvas_h);
  paper = color(248, 236, 194);
  noLoop();
}

function draw() {
  background(paper);
  // orangish stripe
  noStroke();
  fill(255, 50, 0,  200);
  top_width = canvas_w / 3;
  bottom_width = canvas_w / 6;
  x1 = canvas_w / 2 - top_width / 2;
  x2 = canvas_w / 2 + top_width / 2;
  x3 = canvas_w / 2 + bottom_width / 2;
  x4 = canvas_w / 2 - bottom_width / 2;
  quad(x1, 0, x2, 0, x3, canvas_h, x4, canvas_h);
  // text
  textSize(125);
  textAlign(CENTER, CENTER);
  fill(0, 0, 0, 200);
  text("DADA", canvas_w / 2, canvas_h / 2);
  add_grain();
}

function add_grain() {
  ellipseMode(CENTER)
  fill(paper);
  for (i = 0; i < 300; i++) {
    diameter = getRandomInt(min=1, max=3);
    ellipse(getRandomInt(0, canvas_w), getRandomInt(0, canvas_h), diameter, diameter);
  }
 }

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}
