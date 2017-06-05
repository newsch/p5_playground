function setup() {
  createCanvas(400, 400);
  background('#fff');

  opentype.load('./Roboto-Regular.ttf', function(err, font) {
    console.log('done');
    var path = font.getPath('neat!', 5, 300, 200);
    fill(125, 125, 125, 125);
    for (var i = 2; i < path.commands.length; i++) {
      cmds = path.commands.slice(i - 2, i + 1);
      triangle(cmds[0].x, cmds[0].y, cmds[1].x, cmds[1].y, cmds[2].x, cmds[2].y);
    }
    // beginShape();
    // for(var i = 0; i < path.commands.length; i++) {
    //   var cmd = path.commands[i];
    //
    //   switch (cmd.type) {
    //     case 'M':
    //       endShape(CLOSE);
    //       beginShape();
    //       break;
    //     case 'L':
    //       vertex(cmd.x, cmd.y);
    //       break;
    //     case 'Q':
    //       if (typeof cmd.x2 === 'undefined') {
    //         quadraticVertex(cmd.x1, cmd.y1, cmd.x, cmd.y);
    //       } else {
    //         bezierVertex(cmd.x1, cmd.y1, cmd.x2, cmd.y2, cmd.x, cmd.y);
    //       }
    //       break;
    //     case 'Z':
    //       endShape(CLOSE);
    //       break;
    //     default:
    //
    //   }
    // }
    // endShape();
  });
}
