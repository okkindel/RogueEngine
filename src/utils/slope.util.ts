import { Point } from '../entity';

export const slope = (a: Point, b: Point): number => {
  return (b.y - a.y) / (b.x - a.x);
};
