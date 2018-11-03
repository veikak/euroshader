import * as React from 'react';

export interface GlContextInterface {
  (): WebGLRenderingContext | null,
}

const GlContext = React.createContext<GlContextInterface>(() => null);

export default GlContext;
