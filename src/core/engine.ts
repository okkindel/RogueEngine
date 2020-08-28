import CONFIG = require("../assets/config.json");
import { Canvas } from "./canvas";

export class Engine {
  private static _interval: number;

  public static createLoop(): void {
    this._interval = window.setInterval(() => {
      Canvas.getInstance().reload();
    }, 1000 / CONFIG.FRAMES);
  }

  public static removeLoop(): void {
    clearInterval(this._interval);
  }
}
