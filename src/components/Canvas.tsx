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

  getGlContext = () => {
    const canvas = this.state.canvas.current;

    if (!canvas) {
      return null;
    }

    return canvas.getContext('webgl');
  }

  render() {
    const { children } = this.props;
    const { canvas } = this.state;

    console.log('canvas', canvas)

    return (
      <>
        <canvas ref={canvas} id="glCanvas" width="640" height="480" />
        <GlContext.Provider value={this.getGlContext}>
          {children}
        </GlContext.Provider>
      </>
    );
  }
}
