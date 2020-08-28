export interface Printable {
  draw(): void;
}

export const setColor = (
  ctx: CanvasRenderingContext2D,
  color: string
): void => {
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
};

export const setWidth = (
  ctx: CanvasRenderingContext2D,
  weight: number
): void => {
  ctx.lineWidth = weight;
};
