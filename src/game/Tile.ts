import { Printable, setColor } from '../core/printable';
import { euclidean, shadeColor } from '../utils';
import { Point, Text } from '../entity';
import { Canvas } from '../core/canvas';
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

  public draw(predefinedColor: boolean = false): void {
    const viewPort = new Point(
      this.content.position.x - Player.Position.x + window.innerWidth / 2,
      this.content.position.y - Player.Position.y + window.innerHeight / 2
    );

    const distance = euclidean(Player.Position, this.content.position)
    if (!predefinedColor) {
      setColor(Canvas.Context, Player.Instance.availableTiles.includes(this)
      ? shadeColor('#ffffff', -(distance / 5))
      : '#333');
    }
      
    new Text(this.content.text, viewPort, CONFIG.GAME.TILE_SIZE).draw();
  }
}
