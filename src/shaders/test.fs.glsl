precision mediump float;

#define M_PI 3.1415926535897932384626433832795

uniform vec2 u_resolution;
uniform float u_time;

void main() {
  const float f = 1.5;
  vec2 norm_coord = gl_FragCoord.xy/u_resolution;

  float i1 = (cos(2.*M_PI*f*u_time + M_PI) + cos(2.*2.*M_PI*f*u_time + M_PI) + 2.)/3.;
  float i2 = (cos(2.*M_PI*f*(u_time + M_PI) + M_PI) + cos(2.*2.*M_PI*f*(u_time + M_PI) + M_PI) + 2.)/3.;

  gl_FragColor = vec4(i1*norm_coord.x, 0., i2*norm_coord.y, 1.);

}
