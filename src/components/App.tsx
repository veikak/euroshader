import * as React from 'react';

import Canvas from './Canvas';
import Renderer from './Renderer';

const App = () => (
  <div id="app">
    <Canvas>
      <Renderer />
    </Canvas>
  </div>
);

export default App;
