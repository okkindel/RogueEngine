import { Printable } from '../core/printable';
import { Canvas } from '../core/canvas';

export class Point implements Printable {
  public x: number;
  public y: number;

  public static polarToCartesian(
    point: Point,
    radius: number,
    slope: number
  ): Point {
    return new Point(
      point.x + radius * Math.cos(slope),
      point.y + radius * Math.sin(slope)
    );
  }

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  public draw(): void {
    const ctx = Canvas.Context;
    ctx.beginPath();
    ctx.arc(this.x, this.y, ctx.lineWidth, 0, 2 * Math.PI, false);
    ctx.fill();
  }
}
