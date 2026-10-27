/**
 * Light through the canopy: a raw-WebGL fragment shader (no library). Soft
 * fern glow and gold sun flecks drift as if the sun moved behind the trees.
 * Rendered at a fraction of the canvas size — the light is soft anyway — and
 * only while visible (core/fx.tsx starts and stops it).
 */
import type { SceneFactory } from '@/core';

const VERTEX = `
attribute vec2 a_pos;
void main() { gl_Position = vec4(a_pos, 0.0, 1.0); }
`;

const FRAGMENT = `
precision mediump float;
uniform vec2 u_res;
uniform float u_time;
const vec3 GOLD = vec3(0.91, 0.72, 0.23);
const vec3 FERN = vec3(0.50, 0.63, 0.41);
float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x), mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x), u.y);
}
float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  for (int i = 0; i < 4; i++) { v += a * noise(p); p *= 2.03; a *= 0.5; }
  return v;
}
void main() {
  vec2 uv = gl_FragCoord.xy / u_res;
  vec2 p = uv * vec2(u_res.x / u_res.y, 1.0) * 2.6;
  float t = u_time * 0.03;
  float glow = smoothstep(0.4, 0.95, fbm(p + vec2(t, t * 0.6))) * 0.32;
  // Sun flecks: small, crisp-edged spots rather than broad haze.
  float flecks = smoothstep(0.68, 0.74, fbm(p * 2.4 - vec2(t * 1.5, -t)));
  float reach = smoothstep(0.95, 0.12, distance(uv, vec2(0.74, 0.84)));
  vec3 color = FERN * glow + GOLD * flecks * 0.42;
  float alpha = clamp((glow + flecks * 0.4) * reach, 0.0, 1.0);
  gl_FragColor = vec4(color * reach, alpha);
}
`;

function shader(gl: WebGLRenderingContext, type: number, source: string): WebGLShader {
  const s = gl.createShader(type);
  if (!s) throw new Error('shader');
  gl.shaderSource(s, source);
  gl.compileShader(s);
  if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(s) ?? 'shader compile');
  return s;
}

const createLight: SceneFactory = (canvas, { tier, fail }) => {
  const gl = canvas.getContext('webgl', { alpha: true, antialias: false, depth: false, powerPreference: 'low-power' });
  if (!gl) throw new Error('webgl unavailable');

  const program = gl.createProgram()!;
  const vs = shader(gl, gl.VERTEX_SHADER, VERTEX);
  const fs = shader(gl, gl.FRAGMENT_SHADER, FRAGMENT);
  gl.attachShader(program, vs);
  gl.attachShader(program, fs);
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) throw new Error('link');
  gl.useProgram(program);

  // One triangle covering the viewport.
  const buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
  const position = gl.getAttribLocation(program, 'a_pos');
  gl.enableVertexAttribArray(position);
  gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);
  const uRes = gl.getUniformLocation(program, 'u_res');
  const uTime = gl.getUniformLocation(program, 'u_time');

  const scale = tier === 'high' ? 0.6 : 0.45;
  const start = performance.now();
  let raf = 0;
  let running = false;
  let lastDraw = 0;

  const draw = (now: number) => {
    gl.uniform1f(uTime, (now - start) / 1000);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
  };

  const frame = (now: number) => {
    // ~30 fps is plenty for light that moves this slowly.
    if (now - lastDraw >= 32) {
      draw(now);
      lastDraw = now;
    }
    raf = requestAnimationFrame(frame);
  };

  const onLost = (event: Event) => {
    event.preventDefault();
    cancelAnimationFrame(raf);
    running = false;
    fail();
  };
  canvas.addEventListener('webglcontextlost', onLost);

  return {
    start() {
      if (running) return;
      running = true;
      raf = requestAnimationFrame(frame);
    },
    stop() {
      running = false;
      cancelAnimationFrame(raf);
    },
    resize(width, height, dpr) {
      canvas.width = Math.max(1, Math.round(width * dpr * scale));
      canvas.height = Math.max(1, Math.round(height * dpr * scale));
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.uniform2f(uRes, canvas.width, canvas.height);
      draw(performance.now());
    },
    dispose() {
      cancelAnimationFrame(raf);
      canvas.removeEventListener('webglcontextlost', onLost);
      gl.deleteBuffer(buffer);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
      gl.deleteProgram(program);
      gl.getExtension('WEBGL_lose_context')?.loseContext();
    },
  };
};

export default createLight;
