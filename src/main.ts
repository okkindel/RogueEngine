import { Engine } from "./core/engine";
import { Canvas } from "./core/canvas";
import "./styles/main.scss";

window.onload = () => {
  Canvas.setInstance(document.getElementById("canvas") as HTMLCanvasElement);
  Engine.createLoop();
};
