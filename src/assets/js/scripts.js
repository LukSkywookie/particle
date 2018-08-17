require('../scss/style.scss')

//Create canvas
var canvas = document.querySelector('canvas');
var ctx = canvas.getContext('2d');
var WIDTH = window.innerWidth;
var HEIGHT = window.innerHeight;
canvas.width = WIDTH;
canvas.height = HEIGHT;

ctx.beginPath();
// ctx.globalCompositeOperation = "lighten";
ctx.rect(0, 0, WIDTH, HEIGHT);
ctx.fillStyle = "#000";
ctx.fill();

//Create particles
var obj = {};
var particleIndex = 0;
var clickPosX;
var clickPosY;
var particleIndex;
var requestAnim;
var alpha = 1.00;
var inputValue = $('input').val();

function generateParticles() {
	for (var i = 0; i < 10; i++) {
		new createParticle();
	}
}

function updateValue() {
	$('input').on('change', function(){
		inputValue = $(this).val();
	})
}
updateValue();

function createParticle() {
	this.x = Math.random() * WIDTH;
	this.y = Math.random() * HEIGHT;
	this.vx = Math.random() * 10 - Math.random() * 10;
	this.vy = Math.random() * 10 - Math.random() * 10;
	this.life = 0;
	this.maxLife = 100;
	this.clickPosX = 0;
	this.clickPosY = 0;
	this.size = Math.random() * (inputValue - 5 + 1) + 5;
	obj[particleIndex] = this;
	this.id = particleIndex;
    particleIndex++;
	this.r = Math.random() * 10 >> 0;
	this.g = Math.random() * 140 >> 0;
	this.b = Math.random() * 255 >> 0;
	this.randomAlpha = Math.floor(Math.random() * (1 - 0.5 + 1)) + 0.5; 
	this.color = "rgba("+ this.r +","+ this.g +","+ this.b +","+ this.randomAlpha +")";
}

function draw() {
	ctx.fillStyle = "#000";
	ctx.fillRect(0, 0, WIDTH, HEIGHT);

	for (var j in obj) {
		var p = obj[j];

		if (p.life == 0) {
			p.clickPosX = clickPosX;
			p.clickPosY = clickPosY;
		}
		
		if (p.life >= p.maxLife) {
			delete obj[p.id];
		}

        // Jeśli kulka dojdzie do krawędzi ekranu to zrób coś
		// if(p.x < -2) p.x = WIDTH + 2;
		// if(p.y < -2) p.y = HEIGHT + 2;
		// if(p.x > WIDTH + 2) p.x = -2;
        // if(p.y > HEIGHT + 2) p.y = -2;

		ctx.beginPath();
		ctx.arc(p.clickPosX, p.clickPosY, p.size, Math.PI*2, false);
		ctx.fillStyle = p.color;
		ctx.fill();
		p.life++; 
		p.randomAlpha = p.randomAlpha - Math.random() *0.03;
		p.color = "rgba("+ p.r +","+ p.g +","+ p.b +","+ p.randomAlpha +")";
		p.clickPosX += p.vx;
		p.clickPosY += p.vy;
	
	}

	if ( Object.keys(obj).length <= 0 ) {
		window.cancelAnimationFrame(requestAnim);
	}

	requestAnim = window.requestAnimationFrame(draw);
}

function clickHandler() {
	$('canvas').mousedown(function () {
		$(this).mousemove(function (e) {
			window.cancelAnimationFrame(requestAnim);

			clickPosX = e.clientX;
			clickPosY = e.clientY;

			generateParticles();

			new draw();
		});
	}).mouseup(function () {
		$(this).unbind('mousemove');
	}).mouseout(function () {
		$(this).unbind('mousemove');
	});
}
clickHandler()