import { Raycaster } from './Raycaster';
import { Text, Point } from '../entity';
import { Board } from './Board';
import { Tile } from './Tile';

import CONFIG = require('../config.json');
import { head } from 'ramda';

export class Player extends Tile {
  private static _instance: Player;

  public availableTiles: Tile[] = [];
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
          head(board.rooms).center.x * CONFIG.GAME.TILE_SIZE,
          head(board.rooms).center.y * CONFIG.GAME.TILE_SIZE
        ),
        CONFIG.GAME.TILE_SIZE
      ),
      head(board.rooms).center.x,
      head(board.rooms).center.y,
      false,
      CONFIG.TILES.CHARACTER.HEIGHT_LEVEL
    );
  }

  public static setInstance(board: Board) {
    this._instance = new Player(board);
    this._instance._board = board;
    this._instance._setKeyListener();
    this._instance._updatePosition();
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
    const tile: Tile = this._board.board[this.xCord][this.yCord - 1];
    if (tile && tile.isAccessible) { this.yCord -= 1; }
    this._updatePosition();
  }

  private _moveDown(): void {
    const tile: Tile = this._board.board[this.xCord][this.yCord + 1];
    if (tile && tile.isAccessible) { this.yCord += 1; }
    this._updatePosition();
  }

  private _moveLeft(): void {
    const tile: Tile = this._board.board[this.xCord - 1] && this._board.board[this.xCord - 1][this.yCord];
    if (tile && tile.isAccessible) { this.xCord -= 1; }
    this._updatePosition();
  }

  private _moveRight(): void {
    const tile: Tile = this._board.board[this.xCord + 1] && this._board.board[this.xCord + 1][this.yCord];
    if (tile && tile.isAccessible) { this.xCord += 1; }
    this._updatePosition();
  }

  private _updatePosition(): void {
    this.content.position = Player.Position;
    this.availableTiles = Raycaster.castRays(Player.Position.x, Player.Position.y);
  }
}
