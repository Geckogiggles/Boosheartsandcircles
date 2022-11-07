var WIDTH = outerWidth;
var HEIGHT = outerHeight;
var GRAVITY = .025;
var colors = ['#FB33DB', '#7FFF00', '#FCF340', '#0310EA', '#8C00FC'];
var circles = [];

var c = document.querySelectorAll('#canvas')[0].getContext('2d');

c.canvas.width = WIDTH;
c.canvas.height = HEIGHT;
c.globalCompositeOperation = "lighter";

function Circle(x, y) {
  this.x = x;
  this.y = y;
  this.rad = Math.floor(Math.random() * (30-2));
  this.start = 0;
  this.end = Math.PI *2;
  this.color = Math.floor(Math.random() * (colors.length - 0));
  this.startTime = (new Date()).getTime();
  circles.push(this);
  requestAnimFrame(applyGravity);
}

function applyGravity() {
  c.lineWidth = .6;
  c.clearRect(0, 0, WIDTH, HEIGHT);

  for(var i=0, j=circles; i<j.length; i++) {
    var time = (new Date()).getTime() - j[i].startTime;
    j[i].y = j[i].y + (GRAVITY * Math.pow(time / 1000, 2));

    c.beginPath();
    c.arc(j[i].x, j[i].y, j[i].rad, j[i].start, j[i].end, false);
    c.strokeStyle = colors[j[i].color];
    c.stroke();
    c.closePath();
    if((j[i].y>c.canvas.height)) {
      j.splice(i, 1);
    } 
  }

  if(circles.length > 0) {
    requestAnimFrame(applyGravity);
  }
};

window.requestAnimFrame = (function(callback){
    return window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    function(callback){
        window.setTimeout(callback, 1000 / 60);
    };
})();

c.canvas.addEventListener('mousemove', function(e) {
  new Circle(e.x-c.canvas.getBoundingClientRect().left, e.y-c.canvas.getBoundingClientRect().top);
}, false);
