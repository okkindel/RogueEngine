import { Printable } from '../core/printable';
import { Tile } from './Tile';

import CONFIG = require('../config.json');
import { Player } from './Player';

export class Board implements Printable{
  public board: Tile[][] = [];

  constructor(xSize: number, ySize: number) {
    this._createBoard(xSize, ySize);
  }

  private _createBoard(xSize: number, ySize: number): void {
    for (let i = 0; i < xSize; i++) {
      const boardRow: Tile[] = [];
      for (let j = 0; j < ySize; j++) {
        if (Math.random() * 10 < 1) {
          boardRow.push(Tile.getTile('WALL', i, j));
        } else {
          boardRow.push(Tile.getTile('GRASS', i, j));
        }
      }
      this.board.push(boardRow);
    }
  }

  public draw(): void {
    const xPossibleKeys = (window.innerWidth / CONFIG.GAME.TILE_SIZE / 2 + 5) >> 0;
    const yPossibleKeys = (window.innerHeight / CONFIG.GAME.TILE_SIZE / 2 + 5) >> 0;

    for (let i = Math.max(Player.Instance.yCord - yPossibleKeys, 0); i < Math.min(Player.Instance.yCord + yPossibleKeys, CONFIG.GAME.BOARD_SIZE_Y); i++) {
      for (let j = Math.max(Player.Instance.xCord - xPossibleKeys, 0); j < Math.min(Player.Instance.xCord + xPossibleKeys, CONFIG.GAME.BOARD_SIZE_X); j++) {
        if (!(i === Player.Instance.yCord && j === Player.Instance.xCord)) {
          this.board[j][i].draw();
        }
      }
    }
  }
}
