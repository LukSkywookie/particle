export interface ISettings {
  settings: {
    size: number,
    x: number,
    y: number,
    vx: number,
    vy: number,
    life: number,
    maxLife: number,
    id: number,
    r: number,
    g: number,
    b: number,
    randomAlpha: number,
    color: number,
  }
}

export class SingleParticle {
  x = 0;
  y = 0;
  life = 0;
  public maxLife = 90;
  size;
  r = 0;
  g = 0;
  b = 0;
  // private randomAlpha = Math.random();
  color = '';

  constructor(size: number) {
    this.size = size;
    this.createParticle();
  }

  private updateColor = () => {
    this.color =  `rgba(${this.r}, ${this.g}, ${this.b})`;
  }

  private updateSize = () => {
    this.size = this.size * Math.random();
  }

  private rand = Math.random() * 60 - Math.random() * 60
  private rand2 = Math.random() * 60 - Math.random() * 60
  
  public vx = this.rand;
  public vy = this.rand2;
  private WIDTH = window.innerWidth;
  private HEIGHT = window.innerHeight;
  
  createParticle() {
    this.x = (this.WIDTH / 2) + 300 * Math.cos(360)
    this.y = (this.HEIGHT / 2) + 300 * Math.sin(360)
    this.vx
    this.vy
    this.maxLife;
    this.updateSize()
    this.r = Math.random() * 10 >> 0;
    this.g = Math.random() * 240 >> 0;
    this.b = Math.random() * 255 >> 0;
    this.updateColor()
  }
}