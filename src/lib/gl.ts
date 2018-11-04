export type RenderingContext = WebGLRenderingContext | WebGL2RenderingContext;

export const init = (gl: RenderingContext) => {
  gl.clearColor(0, 0, 0, 1);
  gl.clear(gl.COLOR_BUFFER_BIT);
}

export const createShader = (
  gl: RenderingContext,
  shaderType: number,
  source: string,
) : WebGLShader => {
  const shader = gl.createShader(shaderType);
  gl.shaderSource(shader, source);
  gl.compileShader(shader);

  const success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
  if (success && shader) {
    return shader;
  }

  const error = gl.getShaderInfoLog(shader);
  gl.deleteShader(shader);
  if (error) {
    throw new Error(error);
  } else {
    throw new Error('Unknown shader compilation error');
  }
}

export const linkProgram = (
  gl: RenderingContext,
  program: WebGLProgram | null,
) : WebGLProgram => {
  gl.linkProgram(program);
  const success = gl.getProgramParameter(program, gl.LINK_STATUS);
  if (success && program) {
    return program;
  }

  const error = gl.getProgramInfoLog(program);
  gl.deleteProgram(program);
  if (error) {
    throw new Error(error);
  } else {
    throw new Error('Unknown shader linking error');
  }
}

export const setupShadedFullScreenTriangle = (
  gl: RenderingContext,
  program: WebGLProgram,
) : void => {
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

    const positionALoc = gl.getAttribLocation(program, "a_position");
    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    const triangle = [
      -1, -1,
      3, -1,
      -1, 3,
    ];
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(triangle), gl.STATIC_DRAW);

    gl.useProgram(program);
    gl.enableVertexAttribArray(positionALoc);
    gl.vertexAttribPointer(positionALoc, 2, gl.FLOAT, false, 0, 0);

    const resolutionULoc = gl.getUniformLocation(program, "u_resolution");
    gl.uniform2f(resolutionULoc, gl.canvas.width, gl.canvas.height);

    gl.drawArrays(gl.TRIANGLES, 0, 3);
}
