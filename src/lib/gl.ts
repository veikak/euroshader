export const init = (gl: WebGLRenderingContext | null) => {
  if (gl === null) {
    throw new Error('WebGL unavailable');
  }

  gl.clearColor(0, 0, 0, 1);
  gl.clear(gl.COLOR_BUFFER_BIT);
}
