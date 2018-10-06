var canvas = document.querySelector('canvas');
var scrheight = window.innerHeight;
var scrwidth = window.innerWidth;
canvas.width = scrwidth;
canvas.height = scrheight;

var c = canvas.getContext("2d");

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

var mouse = {
	x:undefined,
	y:undefined
}

window.addEventListener('mousemove',
	function(event){
		mouse.x = event.x;
		mouse.y = event.y;
	});

window.addEventListener('resize',
	function(){
		canvas.width = scrwidth = window.innerWidth;
		canvas.height = scrheight = window.innerHeight;
	})

var colors = [
	'#2E112D',
	'#540032',
	'#820333',
	'#C9283E',
	'#F0433A',
];


function Circle(x, y, r, dx, dy) {
	this.x = x;
	this.y = y;
	this.r = r;
	this.minr = r;
	this.dx = dx;
	this.dy = dy;
	this.color = colors[getRandomInt(0, 6)];

	this.draw = function() {
		c.beginPath();
		c.arc(this.x, this.y, this.r, 0, Math.PI * 2, false);
		c.fill();
		c.fillStyle = this.color;
	}

	this.update = function() {
		if(this.x + this.r > scrwidth || this.x - this.r < 0){
			this.dx = -this.dx;
		}
		if(this.y + this.r > scrheight || this.y - this.r < 0){
			this.dy = -this.dy;
		}
		this.x += this.dx;
		this.y += this.dy;

		// interactivity

		if (Math.abs(mouse.x - this.x) < 50 && Math.abs(mouse.y - this.y) < 50){
			if (this.r < 20){
				this.r += 2;
			}
		}
		else if (this.r > this.minr){
			this.r -= 1;
		}
		this.draw();

	}
}

var circles = [];


for(var i = 0; i < 300; i++){
	var r = getRandomInt(5,10);
	var x = getRandomInt(r, scrwidth-r);
	var y = getRandomInt(r, scrheight-r);
	var dx = 0, dy = 0;
  while(dx == 0 || dy == 0 || dx == dy){
    dx = getRandomInt(-3,3)
    dy = getRandomInt(-3,3)
  }
	circles.push(new Circle(x, y, r, dx, dy));

}

// var c1 = ;
var circle = new Circle(200, 200, 100, 10, 10);
function animate(){
	requestAnimationFrame(animate);
	c.clearRect(0,0,scrwidth, scrheight);
	for (var i = 0; i < circles.length; i++){
		circles[i].update();
	}
}

animate();
