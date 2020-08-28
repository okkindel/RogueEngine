import { Printable } from '../core/printable';
import { Canvas } from '../core/canvas';
import { slope } from '../utils';
import { Point } from './Point';

/**
 * Line in Euclidean concept
 * in the form of ax + b.
 */
export class Line implements Printable {
  public a: number;
  public b: number;

  public static fromPoints(p: Point, q: Point): Line {
    const m = slope(p, q);
    const b = -m * p.x + p.y;
    return new Line(m, b);
  }

  public static fromPointSlope(p: Point, m: number): Line {
    const b = -m * p.x + p.y;
    return new Line(m, b);
  }

  constructor(a: number, b: number) {
    this.a = a;
    this.b = b;
  }

  public draw(): void {
    const ctx = Canvas.Context;
    ctx.beginPath();
    ctx.moveTo(0, this.at(0));
    ctx.lineTo(ctx.canvas.width, this.at(ctx.canvas.width));
    ctx.stroke();
  }

  public at(x: number): number {
    return this.a * x + this.b;
  }

  public intersectPoint(line: Line): Point {
    const x = (line.b - this.b) / (this.a - line.a);
    const y = this.at(x);
    return new Point(x, y);
  }
}
