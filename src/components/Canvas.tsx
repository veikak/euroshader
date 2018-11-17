import * as React from 'react';

import './Canvas.less';
import GlContext from '../contexts/GlContext';

export interface CanvasProps {
  aspectRatio: [number, number]
  onWebGlContextAvailable?(gl: WebGLRenderingContext | null): void,
  onWebGl2ContextAvailable?(gl: WebGL2RenderingContext | null): void,
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

  getContextGetters() {
    return {
      getWebGlContext: this.getWebGlContext,
      getWebGl2Context: this.getWebGl2Context,
    };
  }

  componentDidMount() {
    const { onWebGlContextAvailable, onWebGl2ContextAvailable } = this.props;
    const context = this.getContextGetters();

    if (onWebGlContextAvailable) {
      onWebGlContextAvailable(context.getWebGlContext());
    }
    if (onWebGl2ContextAvailable) {
      onWebGl2ContextAvailable(context.getWebGl2Context());
    }
  }

  render() {
    const { children, aspectRatio: [aspectH, aspectV] } = this.props;
    const { canvas } = this.state;

    return (
      <div className="canvas">
        <canvas className="canvas__canvas" ref={canvas} width={aspectH} height={aspectV} />
        <GlContext.Provider value={this.getContextGetters()}>
          {children}
        </GlContext.Provider>
      </div>
    );
  }
}
