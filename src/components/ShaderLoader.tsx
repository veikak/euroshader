import * as React from 'react';

import { init as initGl } from '../lib/gl';
import { GlContextInterface } from '../contexts/GlContext';
import withGlContext from './withGlContext';

export interface ShaderLoaderProps {
  gl: GlContextInterface,
}

class ShaderLoader extends React.Component<ShaderLoaderProps, any> {
  componentDidMount() {
    const { gl } = this.props;

    console.log('gl2', gl)

    const glContext = gl();

    initGl(glContext);
  }

  render() {
    return null;
  }
}

export default withGlContext(ShaderLoader);
