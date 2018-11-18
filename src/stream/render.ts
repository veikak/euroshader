import * as K from 'kefir';

/* tslint:disable:import-name */
import commonVs from '../shaders/common.vs.glsl';
import testFs from '../shaders/test.fs.glsl';
/* tslint:enable:import-name */

export interface RenderTime {
  t: number;
  dt: number;
}

export interface ShaderSourceBundle {
  vertexSource: string;
  fragmentSource: string;
}

export function createTimeStream(): K.Stream<RenderTime, never> {
  const tOnly: K.Stream<number, never> = K.stream((emitter) => {
    function emitTime(time: number) {
      emitter.value(time / 1000);
      requestAnimationFrame(emitTime);
    }

    const requestId = requestAnimationFrame(emitTime);

    return () => cancelAnimationFrame(requestId);
  });
  return tOnly.scan(
    (prev, nextT) => {
      const value: RenderTime = { t: nextT, dt: nextT - prev.t };
      return value;
    },
    { t: 0, dt: 0 },
  );
}

export function createShaderStream(): K.Stream<ShaderSourceBundle, never> {
  return K.stream((emitter) => {
    const value: ShaderSourceBundle = { vertexSource: commonVs, fragmentSource: testFs };
    emitter.value(value);
  });
}
