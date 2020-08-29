import { Printable } from '../core/printable';
import { Tile } from './Tile';

export class Board implements Printable{
  public board: Tile[][] = [];

  constructor(xSize: number, ySize: number) {
    this._createBoard(xSize, ySize);
  }

  private _createBoard(xSize: number, ySize: number): void {
    for (let i = 0; i < xSize; i++) {
      const boardRow: Tile[] = [];
      for (let j = 0; j < ySize; j++) {
        boardRow.push(Tile.getTile('GRASS', i, j));
      }
      this.board.push(boardRow);
    }
  }

  public draw(): void {
    this.board.forEach((elements: Tile[]) =>
      elements.forEach((element: Tile) => element.draw())
    );
  }
}
