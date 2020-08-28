import { Point, Text } from '../entity';

export class Tile {
  public isAccessible: boolean;
  public centerPosition: Point;
  public xCord: number;
  public yCord: number;
  public char: Text;

  constructor() {}
}
