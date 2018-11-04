import * as React from 'react';

import { init as initGl, createShader, linkProgram, setupShadedFullScreenTriangle } from '../lib/gl';
import { GlContextInterface } from '../contexts/GlContext';
import withGlContext from './withGlContext';
import commonVs from '../shaders/common.vs.glsl';
import testFs from '../shaders/test.fs.glsl';

console.log(commonVs);

export interface ShaderLoaderProps extends GlContextInterface {
}

class ShaderLoader extends React.Component<ShaderLoaderProps, any> {
  state = {
    vertexShader: null,
  };

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
    linkProgram(gl, program);
    setupShadedFullScreenTriangle(gl, program);
  }

  render() {
    return null;
  }
}

export default withGlContext(ShaderLoader);
