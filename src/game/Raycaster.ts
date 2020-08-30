import CONFIG = require('../config.json');

import { Player } from './Player';
import { Board } from './Board';
import { Tile } from './Tile';

export class Raycaster {
  private static _instance: Raycaster;
  private _board: Board;

  private constructor(board: Board) {
    this._board = board;
  }

  public static castRays(): Tile[] {
    const tiles: Tile[] = [];
    for (let x = 0; x < 360; x += 10) {
      const rayAngle = (x * Math.PI) / 180;
      const tile = this._castRay(
        Player.Position.x,
        Player.Position.y,
        rayAngle
      );
      if (tiles) tile.forEach((el) => tiles.push(el));
    }
    return tiles.filter((v, i) => tiles.indexOf(v) === i);
  }

  private static _castRay(srcX: number, srcY: number, angle: number): Tile[] {
    const tiles = [];
    let rayX = srcX + Math.cos(angle);
    let rayY = srcY + Math.sin(angle);
    let dst = CONFIG.GAME.TILE_SIZE / 2;
    let isHit = false;
    while (!isHit && dst < 400) {
      dst += CONFIG.GAME.TILE_SIZE / 2;
      rayX = srcX + Math.cos(angle) * dst;
      rayY = srcY + Math.sin(angle) * dst;
      const row = (rayY / CONFIG.GAME.TILE_SIZE) >> 0;
      const col = (rayX / CONFIG.GAME.TILE_SIZE) >> 0;
      const tile =
        this._instance._board.board[col] &&
        this._instance._board.board[col][row];
      if (tile) {
        tiles.push(tile);
        if (!tile.isAccessible) {
          isHit = true;
        }
      }
    }
    return tiles.filter((el, index) => tiles.indexOf(el) === index);
  }

  public static setInstance(board: Board) {
    this._instance = new Raycaster(board);
  }
}
