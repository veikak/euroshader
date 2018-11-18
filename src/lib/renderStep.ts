export default function renderStep(
  gl: WebGLRenderingContext,
  t: number,
  dt: number,
  uniformLocs: any,
) {
  gl.uniform1f(uniformLocs.u_time, t);
  gl.drawArrays(gl.TRIANGLES, 0, 3);
}
