import * as React from 'react';

import Canvas from './Canvas';
import ShaderLoader from './ShaderLoader';

const App = () => (
  <div id="app">
    <Canvas>
      <ShaderLoader />
    </Canvas>
  </div>
);

export default App;
