import * as React from 'react';

import Canvas from './Canvas';
import ShaderLoader from './ShaderLoader';
import Renderer from './Renderer';

const App = () => (
  <div id="app">
    <Canvas>
      <ShaderLoader />
      <Renderer />
    </Canvas>
  </div>
);

export default App;
