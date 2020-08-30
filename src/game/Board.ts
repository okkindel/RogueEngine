import { Printable, setColor } from '../core/printable';
import { shadeColor, euclidean } from '../utils';
import { Canvas } from '../core/canvas';
import { Player } from './Player';
import { Tile } from './Tile';
import { Room } from './Room';

import CONFIG = require('../config.json');

export class Board implements Printable {
  public corridors: Room[] = [];
  public board: Tile[][] = [];
  public rooms: Room[] = [];

  constructor(xSize: number, ySize: number) {
    this._createBoard(xSize, ySize);
  }

  private _createBoard(xSize: number, ySize: number): void {
    for (let i = 0; i < xSize; i++) {
      const boardRow: Tile[] = [];
      for (let j = 0; j < ySize; j++) {
        boardRow.push(Tile.getTile('SPACE', i, j));
      }
      this.board.push(boardRow);
    }

    const map = Room.createRoomsWithCorridors();
    this.corridors = map.corridors;
    this.rooms = map.rooms;

    this.corridors.forEach((room) => {
      this._drawRoom(room, 'PANEL');
    });
    this.rooms.forEach((room) => {
      this._drawRoom(room, 'GRASS');
    });
  }

  private _drawRoom(room: Room, tile: string): void {
    for (let i = room.x1; i < room.x2; i++) {
      for (let j = room.y1; j < room.y2; j++) {
        this.board[i][j] = Tile.getTile(tile, i, j);
      }
    }
  }

  public draw(): void {
    const xPossibleKeys = (window.innerWidth / CONFIG.GAME.TILE_SIZE / 2 + 5) >> 0;
    const yPossibleKeys = (window.innerHeight / CONFIG.GAME.TILE_SIZE / 2 + 5) >> 0;
    const maxBoardX = CONFIG.GAME.BOARD_SIZE_X;
    const maxBoardY = CONFIG.GAME.BOARD_SIZE_Y;
    const xCord = Player.Instance.xCord;
    const yCord = Player.Instance.yCord;
    for (let i = Math.max(yCord - yPossibleKeys, 0); i < Math.min(yCord + yPossibleKeys, maxBoardY); i++) {
      for (let j = Math.max(xCord - xPossibleKeys, 0); j < Math.min(xCord + xPossibleKeys, maxBoardX); j++) {
        if (!(i === yCord && j === xCord)) {
          const tile = this.board[j][i];
          const distance = euclidean(Player.Position, tile.content.position)
          setColor(Canvas.Context, Player.Instance.availableTiles.includes(tile)
            ? shadeColor('#ffffff', -distance / 5)
            : '#333');
          tile.draw();
        }
      }
    }
  }
}
