import { perpLine } from './perpendicular-line.util';
import { midpoint } from './midpoint.util';
import { Line, Point } from '../entity';
import { slope } from './slope.util';

export const bisector = (p: Point, q: Point): Line => {
  const a = perpLine(slope(p, q));
  const mid = midpoint(p, q);
  return Line.fromPointSlope(mid, a);
};
