import { Color } from "./drawing.color";
import {
  Buffers,
  DrawableObjectContext,
  DrawElement,
} from "./drawing.drawable-object";
import { Handle, HandleHolder, HandleProvider } from "./drawing.handle";
import { Point } from "./drawing.point";

export interface Line extends DrawElement, HandleProvider {
  points: [Point, Point];
  colors: [Color, Color];
}

export class LinesObject extends DrawableObjectContext implements HandleHolder {
  // 永久保持データ
  lines: Line[] = [];

  handleList: Handle[] = [];
  jointList: [Joint, Joint]; //

  checkHandle(handleProvider: HandleProvider): void {
    throw new Error("Method not implemented.");
  }

  init(gl: WebGL2RenderingContext): void {
    this.lines.push({
      points: [
        { x: 0, y: 0, z: 0 },
        { x: 0.2, y: 0.5, z: 0 },
      ],
      colors: [
        { r: 1, g: 1, b: 1, a: 1 },
        { r: 1, g: 1, b: 1, a: 1 },
      ],
    });
    this.lines.push({
      points: [
        { x: 1, y: 0, z: 0 },
        { x: 0.7, y: 2, z: 0 },
      ],
      colors: [
        { r: 1, g: 1, b: 1, a: 1 },
        { r: 1, g: 1, b: 1, a: 1 },
      ],
    });
    this.lines.push({
      points: [
        { x: 2, y: 0, z: 0 },
        { x: 2, y: 0.5, z: 0 },
      ],
      colors: [
        { r: 1, g: 1, b: 1, a: 1 },
        { r: 1, g: 1, b: 1, a: 1 },
      ],
    });
    this.lines.push({
      points: [
        { x: 2, y: 0, z: 0 },
        { x: 3, y: 0, z: 0 },
      ],
      colors: [
        { r: 1, g: 1, b: 1, a: 1 },
        { r: 1, g: 1, b: 1, a: 1 },
      ],
    });
    this.lines.push({
      points: [
        { x: 3, y: 0, z: 0 },
        { x: 2.7, y: 2, z: 0 },
      ],
      colors: [
        { r: 1, g: 1, b: 1, a: 1 },
        { r: 1, g: 1, b: 1, a: 1 },
      ],
    });

    this.createBuffer(gl);
    this.initLine(gl);

    this.updateBuffer(gl);
  }

  initLine(gl: WebGL2RenderingContext) {
    this.deleteBuffers(gl); //bufferがいれば削除
    this.pointList = [];
    this.colorList = [];
    this.indexList = [];
    this.indexList.push(0); //最初だけいれる
    this.lines.forEach((line) => {
      this.pointList.push(...line.points);
      this.colorList.push(...line.colors);
      this.indexList.push(this.indexList.length);
      this.indexList.push(this.indexList.length);
    });
  }

  // 頂点の編集など。
  update(gl: WebGL2RenderingContext): void {
    this.updateBuffer(gl);
  }

  draw(
    gl: WebGL2RenderingContext,
    drawMethod: (
      buffers: Buffers,
      mode: GLenum,
      drawTarget: DrawableObjectContext
    ) => void
  ): void {
    drawMethod(this.buffers, gl.LINES, this);
  }

  toJson(): Object {
    return this.lines;
  }
  fromJson(json: Object): void {
    this.lines = json as Line[];
  }
}
