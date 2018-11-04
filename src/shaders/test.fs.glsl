precision mediump float;

#define M_PI 3.1415926535897932384626433832795

uniform vec2 u_resolution;
uniform float u_time;

void main() {
  const float f = 2.;
  float i = cos(2.*M_PI*f*u_time);
  gl_FragColor = vec4(i*gl_FragCoord.xy/u_resolution, 0., 1.);
}
