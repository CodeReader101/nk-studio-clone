
void main() {
    gl_FragColor= vec4(0.2);
}

// #define TAU 6.2831853071
// varying vec2 vUv;


// uniform vec3  uRes;   // vec3(width,height,1)
// uniform float uTime;         // seconds
// uniform sampler2D uTexture1; // textures you used on ShaderToy
// uniform sampler2D uTexture2;

// void main() {
//   // ShaderToy's fragCoord is pixel coords; emulate from UV
//   vec2 fragCoord = vUv * uRes.xy;
//   vec2 uv = fragCoord / uRes.xy;

//   float o = texture2D(uTexture2, uv * 0.25 + vec2(0.0, uTime * 0.025)).r;
//   float d = (texture2D(uTexture1, uv * 0.25 - vec2(0.0, uTime * 0.02 + o * 0.02)).r * 2.0 - 1.0);

//   float v = uv.y + d * 0.1;
//   v = 1.0 - abs(v * 2.0 - 1.0);
//   v = pow(v, 2.0 + sin((uTime * 0.2 + d * 0.25) * TAU) * 0.5);

//   vec3 color = vec3(0.0);

//   float x = (1.0 - uv.x * 0.75);
//   float y = 1.0 - abs(uv.y * 2.0 - 1.0);
//   color += vec3(x * 0.5, y, x) * v;

//   vec2 seed = fragCoord.xy;
//   vec2 r;
//   r.x = fract(sin((seed.x * 12.9898) + (seed.y * 78.2330)) * 43758.5453);
//   r.y = fract(sin((seed.x * 53.7842) + (seed.y * 47.5134)) * 43758.5453);

//   float s = mix(r.x, (sin((uTime * 2.5 + 60.0) * r.y) * 0.5 + 0.5) * ((r.y * r.y) * (r.y * r.y)), 0.04);
//   color += pow(s, 70.0) * (1.0 - v);

//   gl_FragColor = vec4(color, 1.0);
// }
