import * as React from 'react';

import {
  init as initGl,
  createShader,
  linkProgram,
  setupShadedFullScreenTriangle,
  RenderingContext,
} from '../lib/gl';
import { GlContextInterface } from '../contexts/GlContext';
import withGlContext from './withGlContext';
import commonVs from '../shaders/common.vs.glsl';
import testFs from '../shaders/test.fs.glsl';

export interface RendererProps extends GlContextInterface {
};

interface RendererState {
  gl: RenderingContext | null,
  vertexShader: WebGLShader | null,
  loopId: number | null,
  timeULoc: WebGLUniformLocation | null,
  program: WebGLProgram | null,
};

class Renderer extends React.Component<RendererProps, RendererState> {
  constructor(props: any) {
    super(props);

    this.state = {
      gl: null,
      vertexShader: null,
      loopId: null,
      timeULoc: null,
      program: null,
    };
  }

  componentDidMount() {
    const { getWebGlContext } = this.props;

    const gl = getWebGlContext();
    if (gl === null) {
      throw new Error('WebGL unavailable');
    }
    initGl(gl);

    const vertexShader = createShader(gl, gl.VERTEX_SHADER, commonVs);
    const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, testFs);
    let program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    program = linkProgram(gl, program);
    setupShadedFullScreenTriangle(gl, program);

    this.updateGlCache();
  }

  componentWillUnmount() {
    const { loopId } = this.state;

    if (loopId) {
      cancelAnimationFrame(loopId);
    }
  }

  updateGlCache() {
    const { getWebGlContext } = this.props;

    const gl = getWebGlContext();

    if (!gl) {
      return;
    }

    const program = gl.getParameter(gl.CURRENT_PROGRAM);
    console.log(program);
    const timeULoc = gl.getUniformLocation(program, 'u_time');
    console.log(timeULoc);

    const loopId = requestAnimationFrame(this.step);

    this.setState({
      gl,
      loopId,
      timeULoc,
      program,
    });
  }

  step = (t: number) => {
    const { gl, timeULoc, program } = this.state;

    if (!(gl && program && timeULoc)) {
      requestAnimationFrame(this.step);
      return;
    }

    gl.uniform1f(timeULoc, t/1000);
    gl.drawArrays(gl.TRIANGLES, 0, 3);

    requestAnimationFrame(this.step);
  }

  render() {
    return null;
  }
}

export default withGlContext(Renderer);
