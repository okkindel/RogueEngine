import { Printable } from '../core/printable';
import { Point, Text } from '../entity';
import { Player } from './Player';

import CONFIG = require('../config.json');

export class Tile implements Printable {
  public isAccessible: boolean;
  public heightLevel: number;
  public xCord: number;
  public yCord: number;
  public content: Text;

  constructor(
    char: Text,
    xCord: number,
    yCord: number,
    isAccessible: boolean,
    heightLevel: number
  ) {
    this.isAccessible = isAccessible;
    this.heightLevel = heightLevel;
    this.content = char;
    this.xCord = xCord;
    this.yCord = yCord;
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
      this.content.position.x - Player.Position.x + window.innerWidth / 2,
      this.content.position.y - Player.Position.y + window.innerHeight / 2
    );

    new Text(this.content.text, viewPort, CONFIG.GAME.TILE_SIZE).draw();
  }
}
