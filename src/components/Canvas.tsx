import * as React from 'react';

import GlContext from '../contexts/GlContext';

export interface CanvasProps {
  children?: React.ReactNode,
};

interface CanvasState {
  canvas: React.RefObject<HTMLCanvasElement>,
}

export default class Canvas extends React.Component<CanvasProps, CanvasState> {
  constructor(props: CanvasProps) {
    super(props);

    this.state = {
      canvas: React.createRef()
    };
  }

  getWebGlContext = (): WebGLRenderingContext | null => {
    const canvas = this.state.canvas.current;

    if (!canvas) {
      return null;
    }

    return canvas.getContext('webgl');
  }

  getWebGl2Context = (): WebGL2RenderingContext | null => {
    const canvas = this.state.canvas.current;

    if (!canvas) {
      return null;
    }

    return canvas.getContext('webgl2');
  }

  render() {
    const { children } = this.props;
    const { canvas } = this.state;

    const context = {
      getWebGlContext: this.getWebGlContext,
      getWebGl2Context: this.getWebGl2Context,
    };

    return (
      <>
        <canvas ref={canvas} id="glCanvas" width="640" height="480" />
        <GlContext.Provider value={context}>
          {children}
        </GlContext.Provider>
      </>
    );
  }
}
