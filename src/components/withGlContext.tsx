import * as React from 'react';

import GlContext from '../contexts/GlContext';

const withGlContext = (Component: React.ComponentType<any>) => (
  (props: any) => (
    <GlContext.Consumer>
      {({getWebGlContext, getWebGl2Context}) => (
        <Component
          {...props}
          getWebGlContext={getWebGlContext}
          getWebGl2Context={getWebGl2Context}
        />
      )}
    </GlContext.Consumer>
  )
);

export default withGlContext;
