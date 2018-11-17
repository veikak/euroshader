import * as K from 'kefir';

import {
  init as initGl,
  createProgram,
  getUniformLocations,
  createShader,
  linkProgram,
  setupShadedFullScreenTriangle,
  RenderingContext,
} from '../lib/glUtils';
import { ShaderSourceBundle, RenderTime, createTimeStream, createShaderStream } from './render';
import renderStep from '../lib/renderStep';

export default function init(gl: WebGLRenderingContext) {
  initGl(gl);

  const shaders = createShaderStream();
  const programs = shaders.map((x: ShaderSourceBundle) => (
    createProgram(gl, x.vertexSource, x.fragmentSource)
  ));
  const uniformLocs = programs.map(x => getUniformLocations(gl, x));
  const time = createTimeStream();

  const renderData = K.combine([time], [uniformLocs], (t: RenderTime, u: any) => (
    [t, u]
  ));

  renderData.onValue(([time, uniformLocs]: [RenderTime, any]) => (
    renderStep(gl, time.t, time.dt, uniformLocs)
  ));
}
