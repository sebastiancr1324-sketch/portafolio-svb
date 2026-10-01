import { useEffect, useRef } from 'react'
import { usePrefersReducedMotion } from '../lib/hooks'

const VERT = `
attribute vec2 a_position;
void main() {
  gl_Position = vec4(a_position, 0.0, 1.0);
}
`

/* Simplex noise (Ashima / Stefan Gustavson) + two brand colours blended by
   the noise field, masked by a soft vertical band so the aurora sits toward
   the top of the frame and leaves the lower half readable. */
const FRAG = `
precision highp float;

uniform vec2  u_resolution;
uniform float u_time;
uniform vec3  u_colorA;
uniform vec3  u_colorB;
uniform float u_intensity;

vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec3 permute(vec3 x) { return mod289(((x * 34.0) + 1.0) * x); }

float snoise(vec2 v) {
  const vec4 C = vec4(0.211324865405187, 0.366025403784439,
                     -0.577350269189626, 0.024390243902439);
  vec2 i  = floor(v + dot(v, C.yy));
  vec2 x0 = v - i + dot(i, C.xx);
  vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod289(i);
  vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0))
                        + i.x + vec3(0.0, i1.x, 1.0));
  vec3 m = max(0.5 - vec3(dot(x0, x0), dot(x12.xy, x12.xy), dot(x12.zw, x12.zw)), 0.0);
  m = m * m;
  m = m * m;
  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * (a0 * a0 + h * h);
  vec3 g;
  g.x  = a0.x * x0.x + h.x * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}

void main() {
  vec2 uv = (gl_FragCoord.xy * 2.0 - u_resolution) / min(u_resolution.x, u_resolution.y);
  float t = u_time * 0.16;

  float n = 0.0;
  n += snoise(uv * 1.05 + vec2(0.0, t))        * 0.55;
  n += snoise(uv * 2.10 - vec2(t * 0.7, 0.0))  * 0.28;
  n += snoise(uv * 4.30 + vec2(t * 1.3, t))    * 0.14;
  n = n * 0.5 + 0.5;

  // Brightest toward the top edge, fading out before the fold.
  float band  = smoothstep(0.0, 1.0, uv.y * 0.5 + 0.5);
  float glow  = pow(band, 1.7) * u_intensity;

  // Vignette keeps the centre calm so headline text stays legible.
  float vig = 1.0 - smoothstep(0.35, 1.25, length(uv * vec2(0.62, 0.9)));
  glow *= mix(0.55, 1.0, vig);

  float mixv    = smoothstep(0.22, 0.95, n);
  vec3  col     = mix(u_colorA, u_colorB, mixv * 0.72);
  float shimmer = smoothstep(0.58, 1.0, n) * glow;
  col += u_colorB * shimmer * 0.32;

  float alpha = glow * (0.30 + n * 0.70);
  gl_FragColor = vec4(col, clamp(alpha, 0.0, 1.0));
}
`

function compile(gl, type, source) {
  const shader = gl.createShader(type)
  gl.shaderSource(shader, source)
  gl.compileShader(shader)
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    gl.deleteShader(shader)
    return null
  }
  return shader
}

/** #RRGGBB -> normalised rgb triple. */
function hexToRgb(hex) {
  const n = parseInt(hex.replace('#', ''), 16)
  return [((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255]
}

/**
 * Aurora — animated WebGL backdrop.
 *
 * Colour comes from the brand tokens; the loop pauses whenever the canvas
 * scrolls out of view or the tab is hidden, and honours reduced-motion by
 * painting a single static frame.
 */
export default function Aurora({
  colorA = '#1E3A5F',
  colorB = '#E8B4A0',
  intensity = 1,
  className = '',
}) {
  const canvasRef = useRef(null)
  const reduce = usePrefersReducedMotion()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const gl =
      canvas.getContext('webgl', { alpha: true, antialias: false, depth: false }) ||
      canvas.getContext('experimental-webgl')
    // No WebGL (or blocked): the CSS gradient underneath remains as a fallback.
    if (!gl) return

    const vert = compile(gl, gl.VERTEX_SHADER, VERT)
    const frag = compile(gl, gl.FRAGMENT_SHADER, FRAG)
    if (!vert || !frag) return

    const program = gl.createProgram()
    gl.attachShader(program, vert)
    gl.attachShader(program, frag)
    gl.linkProgram(program)
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return
    gl.useProgram(program)

    // Full-screen triangle pair.
    const buffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 3, -1, -1, 3]),
      gl.STATIC_DRAW,
    )
    const aPosition = gl.getAttribLocation(program, 'a_position')
    gl.enableVertexAttribArray(aPosition)
    gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, 0, 0)

    const uResolution = gl.getUniformLocation(program, 'u_resolution')
    const uTime = gl.getUniformLocation(program, 'u_time')
    const uColorA = gl.getUniformLocation(program, 'u_colorA')
    const uColorB = gl.getUniformLocation(program, 'u_colorB')
    const uIntensity = gl.getUniformLocation(program, 'u_intensity')

    const [ar, ag, ab] = hexToRgb(colorA)
    const [br, bg, bb] = hexToRgb(colorB)
    gl.uniform3f(uColorA, ar, ag, ab)
    gl.uniform3f(uColorB, br, bg, bb)
    gl.uniform1f(uIntensity, intensity)

    gl.enable(gl.BLEND)
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA)

    // Cap DPR: a full-bleed shader gains nothing visible past 1.5x and it is
    // the single most expensive thing on the page. On touch devices it drops
    // to 1x: the aurora is a soft blur, so the lower resolution does not show,
    // and phones share the GPU with the electric mark running beside it.
    const coarse = window.matchMedia?.('(pointer: coarse)').matches
    const dpr = Math.min(window.devicePixelRatio || 1, coarse ? 1 : 1.5)

    let raf = 0
    let width = 0
    let height = 0
    let visible = true
    let startedAt = performance.now()

    const resize = () => {
      const rect = canvas.getBoundingClientRect()
      const w = Math.max(1, Math.round(rect.width * dpr))
      const h = Math.max(1, Math.round(rect.height * dpr))
      if (w === width && h === height) return
      width = w
      height = h
      canvas.width = w
      canvas.height = h
      gl.viewport(0, 0, w, h)
      gl.uniform2f(uResolution, w, h)
    }

    const draw = (now) => {
      gl.clearColor(0, 0, 0, 0)
      gl.clear(gl.COLOR_BUFFER_BIT)
      gl.uniform1f(uTime, (now - startedAt) / 1000)
      gl.drawArrays(gl.TRIANGLES, 0, 3)
    }

    const loop = (now) => {
      draw(now)
      raf = requestAnimationFrame(loop)
    }

    const start = () => {
      if (raf || reduce) return
      raf = requestAnimationFrame(loop)
    }
    const stop = () => {
      if (!raf) return
      cancelAnimationFrame(raf)
      raf = 0
    }

    resize()
    if (reduce) {
      // One static frame is enough for reduced-motion users.
      draw(0)
    } else {
      start()
    }

    // Only burn frames while the canvas is actually on screen.
    let io
    if (typeof IntersectionObserver !== 'undefined') {
      io = new IntersectionObserver(
        ([entry]) => {
          visible = entry.isIntersecting
          if (visible && !document.hidden) start()
          else stop()
        },
        { threshold: 0 },
      )
      io.observe(canvas)
    }

    const onVisibility = () => {
      if (document.hidden) stop()
      else if (visible) start()
    }
    document.addEventListener('visibilitychange', onVisibility)

    const ro = new ResizeObserver(resize)
    ro.observe(canvas)

    return () => {
      stop()
      io?.disconnect()
      ro.disconnect()
      document.removeEventListener('visibilitychange', onVisibility)
      gl.deleteBuffer(buffer)
      gl.deleteProgram(program)
      gl.deleteShader(vert)
      gl.deleteShader(frag)
    }
  }, [colorA, colorB, intensity, reduce])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
    />
  )
}
