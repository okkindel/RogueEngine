import { Printable, setColor } from '../core/printable';
import { shadeColor, euclidean } from '../utils';
import { Raycaster } from './Raycaster';
import { Canvas } from '../core/canvas';
import { Player } from './Player';
import { Tile } from './Tile';

import CONFIG = require('../config.json');

export class Board implements Printable{
  public board: Tile[][] = [];

  constructor(xSize: number, ySize: number) {
    this._createBoard(xSize, ySize);
  }

  private _createBoard(xSize: number, ySize: number): void {
    // TODO: Better generator will be provided one day...
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
    const castedRays = Raycaster.castRays();

    for (let i = Math.max(Player.Instance.yCord - yPossibleKeys, 0); i < Math.min(Player.Instance.yCord + yPossibleKeys, CONFIG.GAME.BOARD_SIZE_Y); i++) {
      for (let j = Math.max(Player.Instance.xCord - xPossibleKeys, 0); j < Math.min(Player.Instance.xCord + xPossibleKeys, CONFIG.GAME.BOARD_SIZE_X); j++) {
        if (!(i === Player.Instance.yCord && j === Player.Instance.xCord)) {

          const tile = this.board[j][i];
          const distance = euclidean(Player.Position, tile.content.position)
          setColor(Canvas.Context, castedRays.includes(tile) ? shadeColor('#ffffff', -distance / 5) : '#333');
          tile.draw();
        }
      }
    }
  }
}
