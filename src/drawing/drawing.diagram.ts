import { Mat4 } from "ts-gl-matrix";
import { Buffers, DrawableObject } from "./drawing.drawable-object";

type ProgramInfo = {
  program: WebGLProgram;
  attribLocations: {
    vertexPosition: number;
    vertexColor: number;
  };
  uniformLocations: {
    projectionMatrix: WebGLUniformLocation | null;
    modelViewMatrix: WebGLUniformLocation | null;
  };
};

export class Diagram {
  canvas: HTMLCanvasElement;
  gl: WebGL2RenderingContext;
  vsSource: string;
  fsSource: string;
  shaderProgram: WebGLProgram;
  projectionMatrix: Mat4;
  modelViewMatrix: Mat4;

  programInfo: ProgramInfo;

  objectList: DrawableObject[];

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.gl = this.canvas.getContext("webgl2")!;
    // Vertex shader program
    this.vsSource = `
    attribute vec4 aVertexPosition;
    attribute vec4 aVertexColor;

    uniform mat4 uModelViewMatrix;
    uniform mat4 uProjectionMatrix;

    varying lowp vec4 vColor;

    void main(void) {
      gl_Position = uProjectionMatrix * uModelViewMatrix * aVertexPosition;
      vColor = aVertexColor;
    }
  `;

    this.fsSource = `
    varying lowp vec4 vColor;

    void main(void) {
      gl_FragColor = vColor;
    }
  `;
    this.shaderProgram = this.initShaderProgram()!;
    this.modelViewMatrix = Mat4.create();
    this.projectionMatrix = Mat4.create();
    this.programInfo = {
      program: this.shaderProgram,
      attribLocations: {
        vertexPosition: this.gl.getAttribLocation(
          this.shaderProgram,
          "aVertexPosition"
        ),
        vertexColor: this.gl.getAttribLocation(
          this.shaderProgram,
          "aVertexColor"
        ),
      },
      uniformLocations: {
        projectionMatrix: this.gl.getUniformLocation(
          this.shaderProgram,
          "uProjectionMatrix"
        ),
        modelViewMatrix: this.gl.getUniformLocation(
          this.shaderProgram,
          "uModelViewMatrix"
        ),
      },
    };
    this.objectList = [];
  }


  init() {
    this.objectList.forEach((obj) => {
      obj.init(this.gl);
    })
  }

  draw() {
    if (this.gl == null) {
      alert(
        "Unable to initialize WebGL. Your browser or machine may not support it."
      );
      return;
    }

    this.drawInit();

    this.objectList.forEach((obj) => {
      obj.draw(this.gl, this.drawObject.bind(this));
    });
    // Draw the scene
    // this.drawScene(this.buffers!);
  }
  private drawInit() {
    this.gl.clearColor(0.0, 0.0, 0.0, 1.0); // Clear to black, fully opaque
    this.gl.clearDepth(1.0); // Clear everything
    this.gl.enable(this.gl.DEPTH_TEST); // Enable depth testing
    this.gl.depthFunc(this.gl.LEQUAL); // Near things obscure far things

    // Clear the canvas before we start drawing on it.

    this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);

    // Create a perspective matrix, a special matrix that is
    // used to simulate the distortion of perspective in a camera.
    // Our field of view is 45 degrees, with a width/height
    // ratio that matches the display size of the canvas
    // and we only want to see objects between 0.1 units
    // and 100 units away from the camera.

    const fieldOfView = (45 * Math.PI) / 180; // in radians
    const aspect = this.gl.canvas.width / this.gl.canvas.height;
    const zNear = 0.1;
    const zFar = 100.0;

    // note: glmatrix.js always has the first argument
    // as the destination to receive the result.
    Mat4.perspectiveNO(this.projectionMatrix, fieldOfView, aspect, zNear, zFar);
    //   Mat4.rotateY(this.projectionMatrix, this.projectionMatrix,(15 * Math.PI) / 180)
    Mat4.translate(this.projectionMatrix, this.projectionMatrix, [0, 0, -10]);
    //   Mat4.rotateY(this.projectionMatrix, this.projectionMatrix,(15 * Math.PI) / 180)

    // Now move the drawing position a bit to where we want to
    // start drawing the square.
    Mat4.translate(
      this.modelViewMatrix, // destination matrix
      this.modelViewMatrix, // matrix to translate
      [-0.0, 0.0, -5.0]
    ); // amount to translate
  }


  drawObject(buffers: Buffers, mode: GLenum, obj: DrawableObject) {
    //取り出しかたの指定。
    // Tell WebGL how to pull out the positions from the position
    // buffer into the vertexPosition attribute.
    this.setPositionAttribute(buffers);
    this.setColorAttribute(buffers);
    // Tell WebGL to use our program when drawing
    this.gl.useProgram(this.programInfo.program);
    // Set the shader uniforms
    this.gl.uniformMatrix4fv(
      this.programInfo.uniformLocations.projectionMatrix,
      false,
      this.projectionMatrix
    );
    this.gl.uniformMatrix4fv(
      this.programInfo.uniformLocations.modelViewMatrix,
      false,
      this.modelViewMatrix
    );

    this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, buffers.indices);
    {
      const vertexCount = obj.indexList.length;
      const type = this.gl.UNSIGNED_SHORT;
      const offset = 0; //これはバッファのバイトサイズ
      this.gl.drawElements(mode, vertexCount, type, offset);
    }
  }

  // 変更不要
  // Tell WebGL how to pull out the positions from the position
  // buffer into the vertexPosition attribute.
  setPositionAttribute(buffers: Buffers) {
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, buffers.position);
    const numComponents = 3; // pull out 2 values per iteration // 2dであること
    const type = this.gl.FLOAT; // the data in the buffer is 32bit floats
    const normalize = false; // don't normalize
    const stride = 0; // how many bytes to get from one set of values to the next
    // 0 = use type and numComponents above
    const offset = 0; // how many bytes inside the buffer to start from
    this.gl.vertexAttribPointer(
      this.programInfo.attribLocations.vertexPosition,
      numComponents,
      type,
      normalize,
      stride,
      offset
    );
    this.gl.enableVertexAttribArray(
      this.programInfo.attribLocations.vertexPosition
    );
  }
  // Tell WebGL how to pull out the colors from the color buffer
  // into the vertexColor attribute.
  setColorAttribute(buffers: Buffers) {
    const numComponents = 4;
    const type = this.gl.FLOAT;
    const normalize = false;
    const stride = 0;
    const offset = 0;
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, buffers.color);
    this.gl.vertexAttribPointer(
      this.programInfo.attribLocations.vertexColor,
      numComponents,
      type,
      normalize,
      stride,
      offset
    );
    this.gl.enableVertexAttribArray(
      this.programInfo.attribLocations.vertexColor
    );
  }

  
  //#region shader init

  //
  // Initialize a shader program, so WebGL knows how to draw our data
  //
  private initShaderProgram() {
    // 頂点シェーダ
    const vertexShader = this.loadShader(this.gl.VERTEX_SHADER, this.vsSource)!;
    // フラグメントシェーダ
    const fragmentShader = this.loadShader(
      this.gl.FRAGMENT_SHADER,
      this.fsSource
    )!;

    // Create the shader program

    const shaderProgram = this.gl.createProgram()!;
    this.gl.attachShader(shaderProgram, vertexShader);
    this.gl.attachShader(shaderProgram, fragmentShader);
    this.gl.linkProgram(shaderProgram);

    // If creating the shader program failed, alert

    if (!this.gl.getProgramParameter(shaderProgram, this.gl.LINK_STATUS)) {
      alert(
        `Unable to initialize the shader program: ${this.gl.getProgramInfoLog(
          shaderProgram
        )}`
      );
      return null;
    }

    return shaderProgram;
  }

  // creates a shader of the given type, uploads the source and
  // compiles it.
  //
  private loadShader(type: GLenum, source: string) {
    const shader = this.gl.createShader(type);
    if (!shader) return null;
    this.gl.shaderSource(shader, source);
    this.gl.compileShader(shader);

    // See if it compiled successfully

    if (!this.gl.getShaderParameter(shader, this.gl.COMPILE_STATUS)) {
      alert(
        `An error occurred compiling the shaders: ${this.gl.getShaderInfoLog(
          shader
        )}`
      );
      this.gl.deleteShader(shader);
      return null;
    }

    return shader;
  }

  //#endregion shader init

}
