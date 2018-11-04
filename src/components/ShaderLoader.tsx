import * as React from 'react';

import { init as initGl } from '../lib/gl';
import { GlContextInterface } from '../contexts/GlContext';
import withGlContext from './withGlContext';

export interface ShaderLoaderProps {
  gl: GlContextInterface,
}

class ShaderLoader extends React.Component<ShaderLoaderProps, any> {
  componentDidMount() {
    const { getWebGlContext } = this.props;

    const glContext = getWebGlContext();

    initGl(glContext);
  }

  render() {
    return null;
  }
}

export default withGlContext(ShaderLoader);
