'use client';

import { useMemo, useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

/**
 * Fundo WebGL do hero (Opção A — shader noise editorial).
 *
 * Plano fullscreen desenhado direto em clip-space (sem câmera/geometria pesada):
 * um FBM de simplex noise modula tons de paper + uma brisa de lime quase
 * imperceptível no canto superior direito. Calmo, coerente com a espinha
 * editorial — o "acento cinematográfico" sem ruído visual.
 *
 * Code-split via next/dynamic e montado SÓ em desktop com WebGL (ver HeroBackground).
 */

const vertexShader = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`;

const fragmentShader = /* glsl */ `
  precision highp float;
  varying vec2 vUv;
  uniform float uTime;
  uniform float uAspect;

  // Simplex noise 2D (Ashima / Stefan Gustavson)
  vec3 permute(vec3 x) { return mod(((x * 34.0) + 1.0) * x, 289.0); }
  float snoise(vec2 v) {
    const vec4 C = vec4(0.211324865405187, 0.366025403784439,
                       -0.577350269189626, 0.024390243902439);
    vec2 i  = floor(v + dot(v, C.yy));
    vec2 x0 = v - i + dot(i, C.xx);
    vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod(i, 289.0);
    vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
    vec3 m = max(0.5 - vec3(dot(x0, x0), dot(x12.xy, x12.xy), dot(x12.zw, x12.zw)), 0.0);
    m = m * m; m = m * m;
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

  float fbm(vec2 p) {
    float s = 0.0;
    float a = 0.5;
    for (int i = 0; i < 4; i++) {
      s += a * snoise(p);
      p *= 2.0;
      a *= 0.5;
    }
    return s;
  }

  void main() {
    vec2 uv = vUv;
    uv.x *= uAspect;
    float t = uTime * 0.04;

    float n = fbm(uv * 1.6 + vec2(t, t * 0.6));
    n = n * 0.5 + 0.5;

    vec3 paper = vec3(0.976, 0.976, 0.976); // #f9f9f9
    vec3 shade = vec3(0.945, 0.945, 0.937); // leve sombra warm
    vec3 base = mix(paper, shade, smoothstep(0.35, 0.75, n) * 0.6);

    // brisa de lime quase imperceptível, drifting no canto sup. direito
    vec2 c = vUv - vec2(0.82, 0.12);
    float blob = fbm(uv * 2.0 + vec2(-t * 0.5, t));
    float lime = smoothstep(0.55, 0.0, length(c * vec2(1.0, 1.4))) * (0.5 + 0.5 * blob);
    vec3 limeCol = vec3(0.839, 0.929, 0.412); // #d6ed69
    base = mix(base, limeCol, clamp(lime, 0.0, 1.0) * 0.07);

    gl_FragColor = vec4(base, 1.0);
  }
`;

function Field() {
  const matRef = useRef<THREE.ShaderMaterial>(null);
  const { size } = useThree();

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uAspect: { value: 1 },
    }),
    [],
  );

  useFrame((_, delta) => {
    const mat = matRef.current;
    if (!mat) return;
    mat.uniforms.uTime.value += delta;
    mat.uniforms.uAspect.value = size.width / Math.max(size.height, 1);
  });

  return (
    <mesh>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        ref={matRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        depthWrite={false}
      />
    </mesh>
  );
}

export function ShaderField() {
  return (
    <Canvas
      style={{ position: 'absolute', inset: 0 }}
      gl={{ antialias: false, alpha: false, powerPreference: 'low-power' }}
      dpr={[1, 1.5]}
      onCreated={({ gl }) => gl.setClearColor('#f9f9f9', 1)}
    >
      <Field />
    </Canvas>
  );
}
