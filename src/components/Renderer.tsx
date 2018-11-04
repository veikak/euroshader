import * as React from 'react';

import { RenderingContext } from '../lib/gl';
import { GlContextInterface } from '../contexts/GlContext';
import withGlContext from './withGlContext';
import commonVs from '../shaders/common.vs.glsl';
import testFs from '../shaders/test.fs.glsl';

interface RendererState {
  gl: RenderingContext | null,
  loopId: number | null,
  timeULoc: number | null,
  program: WebGLProgram | null,
};

class Renderer extends React.Component<any, RendererState> {
  constructor(props: any) {
    super(props);

    this.state = {
      gl: null,
      loopId: null,
      timeULoc: null,
      program: null,
    };
  }

  componentDidMount() {
    this.updateGlContext();
  }

  componentWillUnmount() {
    const { loopId } = this.state;

    if (loopId) {
      cancelAnimationFrame(loopId);
    }
  }

  updateGlContext() {
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
