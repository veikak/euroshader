import * as React from 'react';
import init from '../stream/init';

import Canvas from './Canvas';

const App = () => (
  <div id="app">
    <Canvas onWebGlContextAvailable={init} aspectRatio={[16, 9]} />
  </div>
);

export default App;
