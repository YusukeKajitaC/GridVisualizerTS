import { Color } from "./drawing.color";
import { Point } from "./drawing.point";

export interface Buffers {
  position: WebGLBuffer | null;
  color: WebGLBuffer | null;
  indices: WebGLBuffer | null;
}

export abstract class DrawableObject {
  isVisible;

  colorList: Color[];
  pointList: Point[];
  indexList: number[];

  buffers: Buffers;

  constructor(isVisible = true) {
    this.colorList = [];
    this.pointList = [];
    this.indexList = [];
    this.isVisible = isVisible;
    this.buffers = { position: null, color: null, indices: null };
  }

  createBuffer(gl: WebGL2RenderingContext) {
    this.buffers.position = gl.createBuffer();
    this.buffers.color = gl.createBuffer();
    this.buffers.indices = gl.createBuffer();
  }

  //形や色が変わった場合
  updateBuffer(gl: WebGL2RenderingContext) {
    const pointArray = new Float32Array(
      this.pointList
        .map((point) => {
          return [point.x, point.y,point.z];
        })
        .flat()
    );
    const colorArray = new Float32Array(
      this.colorList
        .map((color) => {
          return [color.r, color.g, color.b, color.a];
        })
        .flat()
    );
    const indexArray = new Uint16Array(this.indexList);

    this.setupBufferToGlRender(gl,pointArray,colorArray,indexArray);
  }
  setupBufferToGlRender(gl: WebGL2RenderingContext, pointArray: Float32Array, colorArray: Float32Array, indexArray: Uint16Array) {
    
    gl.bindBuffer(gl.ARRAY_BUFFER, this.buffers.position);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(pointArray), gl.STATIC_DRAW);
    gl.bindBuffer(gl.ARRAY_BUFFER, this.buffers.color);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colorArray), gl.STATIC_DRAW);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.buffers.indices);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indexArray), gl.STATIC_DRAW);
  }

  abstract init(gl: WebGL2RenderingContext): void;
  abstract update(gl: WebGL2RenderingContext): void;
  abstract draw(gl: WebGL2RenderingContext, drawMethod: (buffers: Buffers, mode: GLenum, drawTarget: DrawableObject) => void, ): void;
}
