import { Buffers, DrawableObject } from "./drawing.drawable-object";

export class LinesObject extends DrawableObject {
  draw(
    gl: WebGL2RenderingContext,
    drawMethod: (
      buffers: Buffers,
      mode: GLenum,
      drawTarget: DrawableObject
    ) => void
  ): void {
    drawMethod(this.buffers, gl.LINES, this);
  }

  update(gl: WebGL2RenderingContext): void {}

  init(gl: WebGL2RenderingContext): void {
    this.createBuffer(gl);

    this.pointList.push(
      { x: 1.0, y: 1.0, z: 0.0 },
      { x: -1.0, y: 1.0, z: 0.0 },
      { x: -1.0, y: -1.0, z: 0.0 },
      { x: 1.0, y: -1.0, z: 0.0 },
      { x: 0.5 + 2, y: 0.5, z: 1.0 },
      { x: -0.5 + 2, y: 0.5, z: 1.0 },
      { x: -0.5 + 2, y: -0.5, z: 1.0 },
      { x: 0.5 + 2, y: -0.5, z: 1.0 }
    );
    this.colorList.push(
      { r: 1.0, g: 1.0, b: 1.0, a: 1.0 },
      { r: 1.0, g: 1.0, b: 1.0, a: 1.0 },
      { r: 1.0, g: 1.0, b: 1.0, a: 1.0 },
      { r: 1.0, g: 1.0, b: 1.0, a: 1.0 },
      { r: 1.0, g: 1.0, b: 1.0, a: 1.0 },
      { r: 1.0, g: 1.0, b: 1.0, a: 1.0 },
      { r: 1.0, g: 1.0, b: 1.0, a: 1.0 },
      { r: 1.0, g: 1.0, b: 1.0, a: 1.0 }
    );
    this.indexList.push(0, 1, 1, 2, 2, 3, 3, 0, 4, 5, 5, 6, 6, 7, 7, 4);

    this.updateBuffer(gl);
  }
}
