import { Mat4 } from "ts-gl-matrix";

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
    this.init();

    this.draw();
  }

  //#region shader init

  //
  // Initialize a shader program, so WebGL knows how to draw our data
  //
  initShaderProgram() {
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

  init() {}

  draw() {
    if (this.gl == null) {
      alert(
        "Unable to initialize WebGL. Your browser or machine may not support it."
      );
      return;
    }

    // Set clear color to black, fully opaque
    this.gl.clearColor(0.0, 0.0, 0.0, 1.0);
    // Clear the color buffer with specified clear color
    this.gl.clear(this.gl.COLOR_BUFFER_BIT);

    // Initialize a shader program; this is where all the lighting
    // for the vertices and so forth is established.

    // Collect all the info needed to use the shader program.
    // Look up which attribute our shader program is using
    // for aVertexPosition and look up uniform locations.
    const programInfo: ProgramInfo = {
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

    // Here's where we call the routine that builds all the
    // objects we'll be drawing.
    const buffers = this.initBuffers(this.gl);

    // Draw the scene
    this.drawScene(this.gl, programInfo, buffers);
  }

  initBuffers(gl: WebGL2RenderingContext) {
    const positionBuffer = this.initPositionBuffer(gl)!;
    const colorBuffer = this.initColorBuffer(gl)!;
    const indexBuffer = this.initIndexBuffer(gl)!;

    return {
      position: positionBuffer,
      color: colorBuffer,
      indices: indexBuffer,
    };
  }

  initPositionBuffer(gl: WebGL2RenderingContext) {
    // Create a buffer for the square's positions.
    const positionBuffer = gl.createBuffer();

    // Select the positionBuffer as the one to apply buffer
    // operations to from here out.
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

    // Now create an array of positions for the square.
    // const positions = [1.0, 1.0, -1.0, 1.0, 1.0, -1.0, -1.0, -1.0];
    const positions = [
      1.0,
      1.0,
      0.0,
      
      -1.0,
      1.0,
      0.0,
      
      -1.0,
      -1.0,
      0.0,
      
      1.0,
      -1.0,
      0.0,
      
      0.5 + 2,
      0.5,
      1.0,
      
      -0.5 + 2,
      0.5,
      1.0,
      
      -0.5 + 2,
      -0.5,
      1.0,
      
      0.5 + 2,
      -0.5,
      1.0,
    ];

    // Now pass the list of positions into WebGL to build the
    // shape. We do this by creating a Float32Array from the
    // JavaScript array, then use it to fill the current buffer.
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

    return positionBuffer;
  }

  initColorBuffer(gl: WebGL2RenderingContext) {
    // Create a buffer for the square's positions.
    const colorBuffer = gl.createBuffer();

    // Select the positionBuffer as the one to apply buffer
    // operations to from here out.
    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);

    // Now create an array of positions for the square.
    // const positions = [1.0, 1.0, -1.0, 1.0, 1.0, -1.0, -1.0, -1.0];
    const colors = [
        1.0, 0.0, 1.0, 1.0,
        1.0, 1.0, 0.0, 1.0,
        0.0, 1.0, 1.0, 1.0,
        1.0, 1.0, 1.0, 1.0,
        
        1.0, 0.0, 1.0, 1.0,
        1.0, 1.0, 0.0, 1.0,
        0.0, 1.0, 1.0, 1.0,
        1.0, 1.0, 1.0, 1.0,
    ];

    // Now pass the list of positions into WebGL to build the
    // shape. We do this by creating a Float32Array from the
    // JavaScript array, then use it to fill the current buffer.
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);

    return colorBuffer;
  }

  initIndexBuffer(gl: WebGL2RenderingContext) {
    const indexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);

    // This array defines each face as two triangles, using the
    // indices into the vertex array to specify each triangle's
    // position.

    const indices = [0, 1, 1, 2, 2, 3, 3, 0, 4, 5, 5, 6, 6, 7, 7, 4];

    // Now send the element array to GL

    gl.bufferData(
      gl.ELEMENT_ARRAY_BUFFER,
      new Uint16Array(indices),
      gl.STATIC_DRAW
    );

    return indexBuffer;
  }

  drawScene(
    gl: WebGL2RenderingContext,
    programInfo: ProgramInfo,
    buffers: { position: WebGLBuffer; color: WebGLBuffer; indices: WebGLBuffer }
  ) {
    gl.clearColor(0.0, 0.0, 0.0, 1.0); // Clear to black, fully opaque
    gl.clearDepth(1.0); // Clear everything
    gl.enable(gl.DEPTH_TEST); // Enable depth testing
    gl.depthFunc(gl.LEQUAL); // Near things obscure far things

    // Clear the canvas before we start drawing on it.

    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    // Create a perspective matrix, a special matrix that is
    // used to simulate the distortion of perspective in a camera.
    // Our field of view is 45 degrees, with a width/height
    // ratio that matches the display size of the canvas
    // and we only want to see objects between 0.1 units
    // and 100 units away from the camera.

    const fieldOfView = (45 * Math.PI) / 180; // in radians
    const aspect = gl.canvas.width / gl.canvas.height;
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

    //取り出しかたの指定。
    // Tell WebGL how to pull out the positions from the position
    // buffer into the vertexPosition attribute.
    this.setPositionAttribute(gl, buffers, programInfo);
    this.setColorAttribute(gl, buffers, programInfo);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffers.indices);
    // Tell WebGL to use our program when drawing
    gl.useProgram(programInfo.program);

    // Set the shader uniforms
    gl.uniformMatrix4fv(
      programInfo.uniformLocations.projectionMatrix,
      false,
      this.projectionMatrix
    );
    gl.uniformMatrix4fv(
      programInfo.uniformLocations.modelViewMatrix,
      false,
      this.modelViewMatrix
    );

    {
      const vertexCount = 16;
      const type = gl.UNSIGNED_SHORT;
      const offset = 0;
      gl.drawElements(gl.LINES, vertexCount, type, offset);
    }
  }

  // 変更不要
  // Tell WebGL how to pull out the positions from the position
  // buffer into the vertexPosition attribute.
  setPositionAttribute(
    gl: WebGL2RenderingContext,
    buffers: { position: WebGLBuffer },
    programInfo: ProgramInfo
  ) {
    const numComponents = 3; // pull out 2 values per iteration // 2dであること
    const type = gl.FLOAT; // the data in the buffer is 32bit floats
    const normalize = false; // don't normalize
    const stride = 0; // how many bytes to get from one set of values to the next
    // 0 = use type and numComponents above
    const offset = 0; // how many bytes inside the buffer to start from
    gl.bindBuffer(gl.ARRAY_BUFFER, buffers.position);
    gl.vertexAttribPointer(
      programInfo.attribLocations.vertexPosition,
      numComponents,
      type,
      normalize,
      stride,
      offset
    );
    gl.enableVertexAttribArray(programInfo.attribLocations.vertexPosition);
  }
  // Tell WebGL how to pull out the colors from the color buffer
  // into the vertexColor attribute.
  setColorAttribute(
    gl: WebGL2RenderingContext,
    buffers: { position: WebGLBuffer; color: WebGLBuffer },
    programInfo: ProgramInfo
  ) {
    const numComponents = 4;
    const type = gl.FLOAT;
    const normalize = false;
    const stride = 0;
    const offset = 0;
    gl.bindBuffer(gl.ARRAY_BUFFER, buffers.color);
    gl.vertexAttribPointer(
      programInfo.attribLocations.vertexColor,
      numComponents,
      type,
      normalize,
      stride,
      offset
    );
    gl.enableVertexAttribArray(programInfo.attribLocations.vertexColor);
  }
}
