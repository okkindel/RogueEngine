import { Text, Point } from '../entity';
import { Tile } from './Tile';

import CONFIG = require('../config.json');
import { Board } from './Board';

export class Player extends Tile {
  private static _instance: Player;
  private _board: Board;

  public static get Position(): Point {
    return new Point(
      this._instance.xCord * CONFIG.GAME.TILE_SIZE,
      this._instance.yCord * CONFIG.GAME.TILE_SIZE
    );
  }

  public static get Instance(): Player {
    return this._instance;
  }

  private constructor(board: Board) {
    super(
      new Text(
        CONFIG.TILES.CHARACTER.CHAR,
        new Point(
          CONFIG.GAME.PLAYER_X * CONFIG.GAME.TILE_SIZE,
          CONFIG.GAME.PLAYER_Y * CONFIG.GAME.TILE_SIZE
        ),
        CONFIG.GAME.TILE_SIZE
      ),
      CONFIG.GAME.PLAYER_X,
      CONFIG.GAME.PLAYER_Y,
      false,
      1
    );

    this._board = board;
    this._setKeyListener();
  }

  public static setInstance(board: Board) {
    this._instance = new Player(board);
  }

  public static draw(): void {
    this._instance.draw();
  }

  private _setKeyListener(): void {
    window.addEventListener('keydown', (event) => {
      switch (event.key) {
        case 'ArrowLeft':
          this._moveLeft();
          break;
        case 'ArrowRight':
          this._moveRight();
          break;
        case 'ArrowUp':
          this._moveUp();
          break;
        case 'ArrowDown':
          this._moveDown();
          break;
      }
    });
  }

  private _moveUp(): void {
    const tile: Tile = this._board.board[this.xCord][this.yCord + 1];
    if (tile.isAccessible) { this.yCord += 1; }
    this._updatePosition();
  }

  private _moveDown(): void {
    const tile: Tile = this._board.board[this.xCord][this.yCord - 1];
    if (tile.isAccessible) { this.yCord -= 1; }
    this._updatePosition();
  }

  private _moveLeft(): void {
    const tile: Tile = this._board.board[this.xCord - 1][this.yCord];
    if (tile.isAccessible) { this.xCord -= 1; }
    this._updatePosition();
  }

  private _moveRight(): void {
    const tile: Tile = this._board.board[this.xCord + 1][this.yCord];
    if (tile.isAccessible) { this.xCord += 1; }
    this._updatePosition();
  }

  private _updatePosition(): void {
    this.char.position = new Point(
      this.xCord * CONFIG.GAME.TILE_SIZE,
      this.yCord * CONFIG.GAME.TILE_SIZE
    );
  }
}
