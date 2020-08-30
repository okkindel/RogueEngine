import { setColor } from '../core/printable';
import { Raycaster } from './Raycaster';
import { Canvas } from '../core/canvas';
import { Player } from './Player';
import { Board } from './Board';

import CONFIG = require('../config.json');

export class GameLoop {
  public static gameBoard: Board;
  public static player: Player;

  public static OnInit(): void {
    this.gameBoard = new Board(
      CONFIG.GAME.BOARD_SIZE_X,
      CONFIG.GAME.BOARD_SIZE_Y
    );
    Raycaster.setInstance(this.gameBoard);
    Player.setInstance(this.gameBoard);
  }

  public static OnLoop(): void {
    this._drawAllEntities();
  }

  private static _drawAllEntities(): void {
    this.gameBoard.draw();
    Player.draw();
  }
}
