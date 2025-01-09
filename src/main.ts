import Stats from 'stats.js/src/Stats.js';
import { SingleParticle } from './SingleParticle';
import './style.css'

var stats = new Stats();
stats.showPanel(0);
document.body.appendChild(stats.dom);

let WIDTH = window.innerWidth;
let HEIGHT = window.innerHeight;
const canvas = <HTMLCanvasElement>document.querySelector('canvas');
const ctx = canvas.getContext('2d');
const inputElement = <HTMLInputElement>document.querySelector('input[type="range"]')

canvas.width = WIDTH;
canvas.height = HEIGHT;
let requestAnim: number;
let inputVal = 1;
inputElement.value = inputVal.toString()

let clickPosX = 0;
let clickPosY = 0;

ctx!.beginPath();
ctx!.rect(0, 0, WIDTH, HEIGHT);
ctx!.fillStyle = "#000";
ctx!.fill();

//Create particles
let obj: SingleParticle[] = []
const generateParticles = (inputVal: number) => {
	for (let i = 0; i < 10; i++) {
		const singleParticle = new SingleParticle(inputVal)
		obj.push(singleParticle)
	}
}

function updateSizeValue() {
	inputElement.addEventListener('change', (e: Event) => {
		const targetVar = (e.target as HTMLInputElement).value

		if (targetVar) inputVal = parseFloat(targetVar);
	})
}
updateSizeValue();

let angle = 0
let radius = 300

const animate = () => {
	stats.begin();

	ctx!.fillStyle = '#000';
	ctx!.fillRect(0, 0, WIDTH, HEIGHT);

	for(const [index, particle] of obj.entries()) {
		if (
			particle.life >= particle.maxLife &&
			particle.x + particle.size > 0 &&
			particle.x - particle.size < WIDTH &&
			particle.y + particle.size > 0 &&
			particle.y - particle.size < HEIGHT
		) {
			obj.splice(index, 1)
		} else {
			if (particle.life == 0) {
				particle.x = clickPosX;
				particle.y = clickPosY;
			}

			// Jeśli kulka dojdzie do krawędzi ekranu to zrób coś
			if (particle.x < -2) particle.x = WIDTH + 2;
			if (particle.y < -2) particle.y = HEIGHT + 2;
			if (particle.x > WIDTH + 2) particle.x = -2;
			if (particle.y > HEIGHT + 2) particle.y = -2;

			ctx!.beginPath();
			// ctx!.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2, false);
			ctx!.arc(WIDTH / 2 + radius * Math.cos(angle), HEIGHT / 2 + radius * Math.sin(angle), particle.size, 0, Math.PI * 2, false);
			ctx!.fillStyle = particle.color;
			ctx!.fill();
			particle.life = particle.life + 0.5;
			// particle.x += particle.vx / 10;
			// particle.y += particle.vy / 10;
			angle = index + 1 / 100000000 * Math.random()
		}
	}

	requestAnim = window.requestAnimationFrame(animate);
	stats.end();
}
requestAnim = window.requestAnimationFrame(animate);

function handleMouseMove() {
	generateParticles(inputVal)
	if (obj.length <= 0) {
		window.cancelAnimationFrame(requestAnim);
	}
}

let isMouseDown = false;
function clickHandler() {
	const handleMouseUp = () => {
		isMouseDown = false;
	}

	canvas.addEventListener('mousedown', () => { isMouseDown = true })
	canvas.addEventListener('mousemove', (e) => {
		clickPosX = e.clientX
		clickPosY = e.clientY

		if (isMouseDown) {
			handleMouseMove()
		}
	})

	canvas.addEventListener('mouseup', handleMouseUp)
	canvas.addEventListener('mouseleave', handleMouseUp)
}

document.addEventListener('DOMContentLoaded', () => {
	clickHandler()
})

window.addEventListener('resize', () => {
	WIDTH = window.innerWidth;
	HEIGHT = window.innerHeight;

	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
})