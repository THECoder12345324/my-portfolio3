var STARAMOUNT = 1000;
var MAXSPEED = 50;

var speed;

var fastamount = 0;

stars = [];


function setup() {
  createCanvas(800, 800);
  for (var i =0; i < STARAMOUNT; i++) {
    stars[i] = new Star();
  }
}
function draw() {
  speed = map(fastamount, 0, width, 0, MAXSPEED)
  background(0);
  translate(width / 2, height / 2);
  for (var i =0; i < stars.length; i++) {
    stars[i].update();
    stars[i].show();
  }
  if (keyDown("LEFT_ARROW") && fastamount != 0) {
    fastamount -= 30;
  }
  if (keyDown("RIGHT_ARROW")) {
    fastamount += 30;
  }
}




