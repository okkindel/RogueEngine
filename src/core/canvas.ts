import CONFIG = require('../assets/config.json');
import { Circle, Point, Line } from '../entity';

export class Canvas {
  private _context: CanvasRenderingContext2D;
  private _canvas: HTMLCanvasElement;
  private static _instance: Canvas;

  private constructor(canvas: HTMLCanvasElement) {
    this._context = canvas.getContext('2d');
    this._canvas = canvas;
    this._setupCanvas();
  }

  public static setInstance(canvas: HTMLCanvasElement): Canvas {
    this._instance = new Canvas(canvas);
    return this._instance;
  }

  public static getInstance(): Canvas {
    return this._instance;
  }

  public reload(): void {
    this._reloadBackground();
  }

  private _setupCanvas(): void {
    this._canvas.height = window.innerHeight;
    this._canvas.width = window.innerWidth;
    // SET ORIGIN TO LOWER-LEFT CORNER
    this._context.translate(0, this._canvas.height);
    this._context.scale(1, -1);
  }

  private _reloadBackground(): void {
    this.setColor(CONFIG.BACKGROUND_COLOR);
    this._context.fillRect(0, 0, this._canvas.width, this._canvas.height);
    this._context.fill();
  }

  // ----------------------------------
  // FIXME: Remove it from singleton
  // ----------------------------------

  public drawPoint(point: Point) {
    this._context.beginPath();
    this._context.arc(
      point.x,
      point.y,
      this._context.lineWidth,
      0,
      2 * Math.PI,
      false
    );
    this._context.fill();
  }

  drawLine(line: Line) {
    this._context.beginPath();
    this._context.moveTo(0, line.at(0));
    this._context.lineTo(this._context.canvas.width, line.at(this._context.canvas.width));
    this._context.stroke();
  }

  public drawSection(p: Point, q: Point) {
    this._context.beginPath();
    this._context.moveTo(p.x, p.y);
    this._context.lineTo(q.x, q.y);
    this._context.stroke();
  }

  public drawCircle(circle: Circle, isFilled = false) {
    this._context.beginPath();
    this._context.arc(
      circle.center.x,
      circle.center.y,
      circle.radius,
      0,
      2 * Math.PI
    );
    this._context.stroke();
    if (isFilled) {
      this._context.fill();
    }
  }

  public setColor(color: string): void {
    this._context.strokeStyle = color;
    this._context.fillStyle = color;
  }

  public setLineWidth(weight: number): void {
    this._context.lineWidth = weight;
  }
}
