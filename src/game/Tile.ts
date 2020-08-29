import { Printable, setColor } from '../core/printable';
import { euclidean, shadeColor } from '../utils';
import { Point, Text } from '../entity';
import { Canvas } from '../core/canvas';
import { Player } from './Player';

import CONFIG = require('../config.json');

export class Tile implements Printable {
  public centerPosition: Point;
  public isAccessible: boolean;
  public heightLevel: number;
  public basicColor: string;
  public xCord: number;
  public yCord: number;
  public content: Text;

  constructor(
    char: Text,
    xCord: number,
    yCord: number,
    isAccessible: boolean,
    heightLevel: number,
    basicColor: string
  ) {
    this.centerPosition = char.position;
    this.isAccessible = isAccessible;
    this.heightLevel = heightLevel;
    this.basicColor = basicColor;
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
      CONFIG.TILES[tile].HEIGHT_LEVEL,
      CONFIG.TILES[tile].BASIC_COLOR
    );
  }

  public draw(): void {
    const distance = euclidean(Player.Position, this.content.position);


    // if (distance < 50 && distance > 20) {
    //   setColor(Canvas.Context, '#ddd');
    // } else if (distance < 100) {
    //   setColor(Canvas.Context, '#ddd');
    // } else if (distance < 200) {
    //   setColor(Canvas.Context, '#aaa');
    // } else if (distance < 300) {
    //   setColor(Canvas.Context, '#888');
    // } else {
    //   setColor(Canvas.Context, '#666');
    // }

    // console.log(approximateColor(this.basicColor, "#000000", 10))

    setColor(Canvas.Context, shadeColor(this.basicColor, -(distance / 7.5)));

    // console.log(shadeColor(this.basicColor, 10))


    const viewPort = new Point(
      this.content.position.x - Player.Position.x + window.innerWidth / 2,
      this.content.position.y - Player.Position.y + window.innerHeight / 2
    );
    // if (!this.isAccessible) {
    //   new Section(Player.Position, viewPort).draw();
    // }
    new Text(this.content.text, viewPort, CONFIG.GAME.TILE_SIZE).draw();
  }
}
