export const shadeColor = (color: string, percent: number): string => {
  let r = parseInt(color.substring(1, 3), 16);
  let g = parseInt(color.substring(3, 5), 16);
  let b = parseInt(color.substring(5, 7), 16);

  r = ((r * (100 + percent)) / 100) >> 0;
  g = ((g * (100 + percent)) / 100) >> 0;
  b = ((b * (100 + percent)) / 100) >> 0;

  r = r < 255 ? r : 255;
  g = g < 255 ? g : 255;
  b = b < 255 ? b : 255;

  r = r > 0 ? r : 0;
  g = g > 0 ? g : 0;
  b = b > 0 ? b : 0;

  let rr = r.toString(16).length == 1 ? '0' + r.toString(16) : r.toString(16);
  let gg = g.toString(16).length == 1 ? '0' + g.toString(16) : g.toString(16);
  let bb = b.toString(16).length == 1 ? '0' + b.toString(16) : b.toString(16);

  return '#' + rr + gg + bb;
};
