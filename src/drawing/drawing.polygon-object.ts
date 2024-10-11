import { Buffers, DrawableObjectContext } from "./drawing.drawable-object";

export class PolygonObject extends DrawableObjectContext {
  toJson(): string {
    throw new Error("Method not implemented.");
  }
  fromJson(json: string): void {
    throw new Error("Method not implemented.");
  }
  draw(
    gl: WebGL2RenderingContext,
    drawMethod: (
      buffers: Buffers,
      mode: GLenum,
      drawTarget: DrawableObjectContext
    ) => void
  ): void {
    throw new Error("Method not implemented.");
  }

  update(gl: WebGL2RenderingContext): void {}
  init(gl: WebGL2RenderingContext): void {}
}
