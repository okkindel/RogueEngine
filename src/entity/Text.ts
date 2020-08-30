import { Printable } from '../core/printable';
import { Canvas } from '../core/canvas';
import { Point } from './Point';

export class Text implements Printable {
  public font: string = 'Consolas';
  public position: Point;
  public text: string;
  public size: number;

  constructor(text: string, position: Point, size: number, font?: string) {
    if (font) { this.font = font; }
    this.position = position;
    this.text = text;
    this.size = size;
  }

  public draw(shouldFill: boolean = true): void {
    const ctx = Canvas.Context;
    ctx.font = `${this.size}px ${this.font}`;
    if (shouldFill) { 
      ctx.fillText(this.text, this.position.x, this.position.y);
    } else {
      ctx.strokeText(this.text, this.position.x, this.position.y);
    }
  }
}
