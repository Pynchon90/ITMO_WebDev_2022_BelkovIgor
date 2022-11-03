import { Earth, Mars, Moon, PlanetComposable, Position, RotatedPlanet, Sun } from './src/solar-system.js';

const canvas = document.createElement('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
canvas.style.backgroundColor = '#f1f1f1';

document.getElementById('app').append(canvas);

const ctx = canvas.getContext('2d');

const sun = new Sun(new Position(canvas.width / 2, canvas.height / 2));
const earth = new Earth(sun.position, sun.size + 100);
const mars = new Mars(sun.position, sun.size + 250);
const moon = new Moon(earth.position, earth.size + 30);

const planets = [sun, earth, moon, mars];

window.requestAnimationFrame(renderPlanets);

class RenderCirclePlanetAlgorithm {
  constructor(color, atmosphere, size) {
    this.color = color;
    this.atmosphere = atmosphere;
    this.size = size;
  }
  render(ctx, position) {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.strokeStyle = this.atmosphere;
    ctx.arc(position.x, position.y, this.size, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.fill();
  }
}

class RenderSquarePlanetAlgorithm {
  constructor(color, atmosphere, size) {
    this.color = color;
    this.atmosphere = atmosphere;
    this.size = size;
  }
  render(ctx, position) {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.strokeStyle = this.atmosphere;
    ctx.rect(position.x, position.y, this.size, this.size);
    ctx.stroke();
    ctx.fill();
  }
}

class MoveRotateAlgorithm {
  constructor(radius, speed) {
    this.radius = radius;
    this.speed = speed;
    this.alpha = 0;
  }
  move(position, offset) {
    this.alpha += this.speed / Math.PI;
    position.x = this.radius * Math.sin(this.alpha) + offset.x;
    position.y = this.radius * Math.cos(this.alpha) + offset.y;
    if (this.alpha >= 2 * Math.PI) this.alpha = 0;
  }
}

const r1 = new RenderCirclePlanetAlgorithm('blue', 'lightblue', 50);
const r2 = new RenderSquarePlanetAlgorithm('red', 'lightblue', 30);

const planetComposable = new PlanetComposable(new Position(100, 100), r1, new MoveRotateAlgorithm(150, 0.04));

document.onclick = (e) => {
  planetComposable.offset = new Position(e.pageX, e.pageY);
  if (planetComposable.renderAlgorithm instanceof RenderCirclePlanetAlgorithm) {
    planetComposable.renderAlgorithm = r2;
  } else planetComposable.renderAlgorithm = r1;
};

function renderPlanets() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  planetComposable.render(ctx);
  planetComposable.move();

  planets.forEach((item) => {
    if (item instanceof RotatedPlanet) {
      item.rotate();
    }
    item.render(ctx);
  });

  window.requestAnimationFrame(renderPlanets);
}
