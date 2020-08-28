import { setColor } from "../core/printable";
import { Circle, Section, Point, Text } from "../entity";
import { Canvas } from "../core/canvas";

export class GameLoop {
    constructor() {}

    public static OnLoop(): void {
        this._drawAllEntities();
    }
    
    private static _drawAllEntities(): void {
        setColor(Canvas.Context, '#fff');

        new Section(new Point(Math.random() * 1000, Math.random() * 1000), new Point(600, 800)).draw();
        new Circle(new Point(100, 100), 200).draw();
        new Text('X', new Point(100, 400), 30).draw();
    }
}