import { Printable } from '../core/printable';
import { Canvas } from '../core/canvas';
import { Point } from './Point';

export class Section implements Printable {
  public p: Point;
  public q: Point;

  constructor(p: Point, q: Point) {
    this.p = p;
    this.q = q;
  }

  public draw(): void {
    const ctx = Canvas.Context;
    ctx.beginPath();
    ctx.moveTo(this.p.x, this.p.y);
    ctx.lineTo(this.q.x, this.q.y);
    ctx.stroke();
  }
}
