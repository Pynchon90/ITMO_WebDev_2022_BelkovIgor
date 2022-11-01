const canvas = document.createElement('canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

canvas.style.backgroundColor = '#f1f1f1';

document.getElementById('app').append(canvas);

const ctx = canvas.getContext('2d');

class Position {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

class Planet {
  constructor(color, atmosphere, position, size) {
    this.color = color;
    this.atmosphere = atmosphere;
    this.position = position;
    this.size = size;
  }
  render(ctx) {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.strokeStyle = this.atmosphere;
    ctx.lineWidth = 10;
    ctx.arc(this.position.x, this.position.y, this.size, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.fill();
  }
}

class Earth extends Planet {
  constructor(position) {
    super('green', 'blue', position, 40);
  }
  render(ctx) {
    super.render(ctx);
    ctx.fillStyle = 'blue';
    ctx.beginPath();
    ctx.arc(this.position.x, this.position.y, this.size, 0, 2 * Math.PI);
    ctx.fill();
  }
}
class Sun extends Planet {
  constructor(position) {
    super('red', 'yellow', position, 100);
  }
}

const sun = new Sun(new Position(canvas.width / 2, canvas.height / 2));
const earthPositionRelativeToSun = getPositionRelativeToPlanetWithOffset(sun, 10, 40);
const earth = new Earth(earthPositionRelativeToSun);
earth.render(ctx);
sun.render(ctx);

let alpha = 0;
//window.requestAnimationFrame(renderPlanets)

setInterval(() => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  //const offsetPosition = getPositionRelativeToPlanetWithOffset(sun, 10, earth.size);
  earth.position.x = 200 * Math.sin(alpha) + sun.position.x;
  earth.position.y = 200 * Math.cos(alpha) + sun.position.y;
  earth.render(ctx);
  sun.render(ctx);
  alpha += 1 / Math.PI;
  if (alpha >= 2 * Math.PI) alpha = 0;
}, 100);

function getPositionRelativeToPlanetWithOffset(planet, offset, radius) {
  return new Position(
    planet.position.x + planet.size + offset + radius,
    planet.position.y + planet.size + offset + radius
  );
}
