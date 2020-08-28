export class Point {
  public x: number;
  public y: number;

  public static polarToCartesian(
    point: Point,
    radius: number,
    slope: number
  ): Point {
    return new Point(
      point.x + radius * Math.cos(slope),
      point.y + radius * Math.sin(slope)
    );
  }

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
}
