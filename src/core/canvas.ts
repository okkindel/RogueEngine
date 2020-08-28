import CONFIG = require('../assets/config.json');

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
    this._setColor(CONFIG.BACKGROUND_COLOR);
    this._context.fillRect(0, 0, this._canvas.width, this._canvas.height);
    this._context.fill();
  }

  // ----------------------------------
  // FIXME: Remove it from singleton
  // ----------------------------------

  private _setColor(color: string): void {
    this._context.strokeStyle = color;
    this._context.fillStyle = color;
  }

  private _setLineWidth(weight: number): void {
    this._context.lineWidth = weight;
  }
}
