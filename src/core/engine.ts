import CONFIG = require("../assets/config.json");
import { Circle, Point, Section } from "../entity";
import { setColor } from "./printable";
import { Canvas } from "./canvas";

export class Engine {
  private static _interval: number;

  public static createLoop(): void {
    this._interval = window.setInterval(() => {
      Canvas.Instance.reload();

      setColor(Canvas.Context, '#fff');
      new Circle(new Point(100, 100), 200).draw(true);
      new Section(new Point(300, 400), new Point(600, 800)).draw();
    }, 1000 / CONFIG.FRAMES);
  }

  public static removeLoop(): void {
    clearInterval(this._interval);
  }
}
