import { Printable } from '../core/printable';
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

  public at(x: number, y: number): Tile {
    if (this.board[x] && this.board[x][y]) {
      return this.board[x][y];
    }
    return null;
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
          this.board[j][i].draw();
        }
      }
    }
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
    this._createOffset([...map.corridors, ...map.rooms]);

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

  private _createOffset(rooms: Room[]): void {
    const makeOffset = (i: number, j: number, tile: string): void => {
      const cell = this.at(i, j);
      if (cell) this.board[i][j] = Tile.getTile(tile, i, j);
    }

    rooms.forEach(room => {
      for (let i = room.x1; i < room.x2; i++) {
        for (let j = room.y1 - 1; j <= room.y1; j++) {
          makeOffset(i, j, 'WALL_VERTICAL');
        }
        for (let j = room.y2 - 1; j <= room.y2; j++) {
          makeOffset(i, j, 'WALL_VERTICAL');
        }
      }
      for (let i = room.y1; i < room.y2; i++) {
        for (let j = room.x1 - 1; j <= room.x1; j++) {
          makeOffset(j, i, 'WALL_HORIZONTAL');
        }
        for (let j = room.x2 - 1; j <= room.x2; j++) {
          makeOffset(j, i, 'WALL_HORIZONTAL');
        }
      }
      makeOffset(room.x1 - 1, room.y1 - 1, 'BLOCK');
      makeOffset(room.x1 - 1, room.y2, 'BLOCK');
      makeOffset(room.x2, room.y1 - 1, 'BLOCK');
      makeOffset(room.x2, room.y2, 'BLOCK');
    });
  }
}
