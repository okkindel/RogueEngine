import CONFIG = require('../config.json');

import { GameLoop } from '../game/GameLoop';
import { Canvas } from './canvas';

export class Engine {
  private static _interval: number;

  public static createLoop(): void {
    GameLoop.OnInit();

    this._interval = window.setInterval(() => {
      Canvas.Instance.reload();
      GameLoop.OnLoop();
    }, 1000 / CONFIG.FRAMES);
  }

  public static removeLoop(): void {
    clearInterval(this._interval);
  }
}
