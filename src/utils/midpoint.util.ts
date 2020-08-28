import { Point } from '../entity';

export const midpoint = (p1: Point, p2: Point): Point => {
  // https://en.wikipedia.org/wiki/Midpoint
  return new Point((p2.x - p1.x) / 2 + p1.x, (p2.y - p1.y) / 2 + p1.y);
};
