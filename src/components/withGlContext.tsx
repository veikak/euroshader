import * as React from 'react';

import GlContext from '../contexts/GlContext';

const withGlContext = (Component: React.ComponentType<any>) => (
  (props: any) => (
    <GlContext.Consumer>
      {value => <Component {...props} gl={value} />}
    </GlContext.Consumer>
  )
);

export default withGlContext;
