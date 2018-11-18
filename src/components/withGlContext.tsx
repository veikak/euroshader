import * as React from 'react';

import GlContext, { GlContextInterface } from '../contexts/GlContext';

const getRenderChildren = (
  Component: React.ComponentType<any>,
  props: any,
) => (getters: GlContextInterface) => (
  <Component
    {...props}
    getWebGlContext={getters.getWebGlContext}
    getWebGl2Context={getters.getWebGl2Context}
  />
);

const withGlContext = (Component: React.ComponentType<any>) => (
  (props: any) => (
    <GlContext.Consumer>
      {getRenderChildren(Component, props)}
    </GlContext.Consumer>
  )
);

export default withGlContext;
