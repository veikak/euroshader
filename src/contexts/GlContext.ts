import * as React from 'react';

export interface GlContextInterface {
  getWebGlContext(): WebGLRenderingContext | null;
  getWebGl2Context(): WebGL2RenderingContext | null;
}

const defaultValue = {
  getWebGlContext: () => null,
  getWebGl2Context: () => null,
};

const GlContext = React.createContext<GlContextInterface>(defaultValue);

export default GlContext;
