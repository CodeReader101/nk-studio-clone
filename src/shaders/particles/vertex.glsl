uniform float uTime, uSize;
varying float vAlpha;

void main() {
    
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    gl_Position = projectionMatrix * mv;
    gl_PointSize = uSize * (300.0 / -mv.z);

    vAlpha = 1.0;
}