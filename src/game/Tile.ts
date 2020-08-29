import { Printable } from '../core/printable';
import { Point, Text } from '../entity';

import CONFIG = require('../config.json');
import { Player } from './Player';

export class Tile implements Printable {
  public centerPosition: Point;
  public isAccessible: boolean;
  public heightLevel: number;
  public xCord: number;
  public yCord: number;
  public char: Text;

  constructor(
    char: Text,
    xCord: number,
    yCord: number,
    isAccessible: boolean,
    heightLevel: number
  ) {
    this.centerPosition = char.position;
    this.isAccessible = isAccessible;
    this.heightLevel = heightLevel;
    this.xCord = xCord;
    this.yCord = yCord;
    this.char = char;
  }

  public static getTile(tile: string, xCord: number, yCord: number): Tile {
    const char = new Text(
      CONFIG.TILES[tile].CHAR,
      new Point(xCord * CONFIG.GAME.TILE_SIZE, yCord * CONFIG.GAME.TILE_SIZE),
      CONFIG.GAME.TILE_SIZE
    );
    return new Tile(
      char,
      xCord,
      yCord,
      CONFIG.TILES[tile].ACCESIBLE,
      CONFIG.TILES[tile].HEIGHT_LEVEL
    );
  }

  public draw(): void {
    const viewPort = new Point(
      this.char.position.x - Player.Position.x + window.innerWidth / 2,
      this.char.position.y - Player.Position.y + window.innerHeight / 2
    );
    new Text(this.char.text, viewPort, CONFIG.GAME.TILE_SIZE).draw();
  }
}
