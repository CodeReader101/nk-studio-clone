uniform vec3  uColor;
uniform float uGlow; 
varying float vAlpha;
void main() {
  
    vec2 uv = gl_PointCoord * 2.0 - 1.0;
    float r = length(uv);
    if (r > 1.0) discard;
    float soft = smoothstep(1.0, 0.0, r);
    vec3 col = uColor * uGlow;
    gl_FragColor = vec4(col, soft * vAlpha);
}