import { Point } from "./point";

export class Snake {
  coordonates: Point;
  r: number;
  vspeed: number;
  hspeed: number;

  constructor(x: number = 0, y: number = 0) {
    this.coordonates = { x, y } as Point;
    this.r = 10;
    this.vspeed = 0;
    this.hspeed = 0;
  }

  getX() {
    return this.coordonates.x;
  }

  getY() {
    return this.coordonates.y;
  }

  getRadius() {
    return this.r;
  }

  right() {
    this.hspeed = 1 * this.r;
    this.vspeed = 0;
  }

  left() {
    this.hspeed = -1 * this.r;
    this.vspeed = 0;
  }

  up() {
    this.hspeed = 0;
    this.vspeed = -1 * this.r;
  }

  down() {
    this.hspeed = 0;
    this.vspeed = 1 * this.r;
  }

  pause() {
    this.hspeed = 0;
    this.vspeed = 0;
  }

  reset() {
    this.coordonates.x = 0;
    this.coordonates.y = 0;
  }

  collision(x1: number, y1: number, radius: number): boolean {
    const { x, y } = { ...this.coordonates };

    const dist = Math.sqrt((x1 - x) ** 2 + (y1 - y) ** 2);

    if (dist <= radius + this.getRadius()) {
      this.pause();
      alert("game over");
      this.reset();
      return true;
    }

    return false;
  }
  goal(goalObj: Snake): boolean {
    const { x, y } = { ...this.coordonates };

    const x1 = goalObj.coordonates.x;
    const y1 = goalObj.coordonates.y;
    const radius = goalObj.getRadius();

    const dist = Math.sqrt((x1 - x) ** 2 + (y1 - y) ** 2);

    if (dist <= radius + this.getRadius()) {
      this.pause();
      alert("goal!");
      this.reset();
      return true;
    }

    return false;
  }
  move(width: number, height: number) {
    let { x, y } = { ...this.coordonates };
    const { hspeed, vspeed } = this;

    if (x + hspeed < width && x + hspeed >= 0) {
      x += hspeed;
    }

    if (y + vspeed < height && y + vspeed >= 0) {
      y += vspeed;
    }

    this.coordonates = {
      x,
      y,
    } as Point;
  }
}
