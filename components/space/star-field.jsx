"use client";

import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

const vertexShader = `attribute float aSize; attribute float aPhase; attribute vec3 aColor; uniform float uTime; varying vec3 vColor; void main() { vColor = aColor; vec4 mvPosition = modelViewMatrix * vec4(position, 1.0); float flicker = 0.88 + sin(uTime * 0.42 + aPhase) * 0.12; gl_PointSize = aSize * flicker * (24.0 / -mvPosition.z); gl_Position = projectionMatrix * mvPosition; }`;
const fragmentShader = `uniform float uOpacity; varying vec3 vColor; void main() { float d = length(gl_PointCoord - 0.5); float core = smoothstep(0.19, 0.0, d); float halo = smoothstep(0.5, 0.08, d) * 0.5; gl_FragColor = vec4(vColor, (core + halo) * uOpacity); }`;

function mulberry32(seed) { return () => { let value = (seed += 0x6d2b79f5); value = Math.imul(value ^ (value >>> 15), value | 1); value ^= value + Math.imul(value ^ (value >>> 7), value | 61); return ((value ^ (value >>> 14)) >>> 0) / 4294967296; }; }

export function StarField({ count, spread, depth, size, opacity, seed, clustered = false, near = false }) {
  const material = useRef();
  const geometry = useMemo(() => {
    const random = mulberry32(seed), positions = new Float32Array(count * 3), sizes = new Float32Array(count), phases = new Float32Array(count), colors = new Float32Array(count * 3);
    for (let i = 0; i < count; i += 1) {
      const radius = (clustered ? Math.pow(random(), 1.9) : Math.sqrt(random())) * spread, angle = random() * Math.PI * 2;
      positions[i * 3] = Math.cos(angle) * radius + (clustered ? Math.sin(i * 0.19) * 5 : 0);
      positions[i * 3 + 1] = Math.sin(angle) * radius * 0.62 + (clustered ? Math.cos(i * 0.13) * 3 : 0);
      positions[i * 3 + 2] = -random() * depth - (near ? 1.5 : 5); sizes[i] = size * (0.38 + random() * 0.82); phases[i] = random() * Math.PI * 2;
      const warmth = random(); const color = warmth > 0.87 ? [1, 0.82, 0.64] : warmth > 0.55 ? [0.8, 0.88, 1] : [0.66, 0.79, 0.94]; colors.set(color, i * 3);
    }
    const result = new THREE.BufferGeometry(); result.setAttribute("position", new THREE.BufferAttribute(positions, 3)); result.setAttribute("aSize", new THREE.BufferAttribute(sizes, 1)); result.setAttribute("aPhase", new THREE.BufferAttribute(phases, 1)); result.setAttribute("aColor", new THREE.BufferAttribute(colors, 3)); return result;
  }, [clustered, count, depth, near, seed, size, spread]);
  useFrame((state) => { if (material.current) material.current.uniforms.uTime.value = state.clock.elapsedTime; });
  return <points geometry={geometry} rotation={[0.08, 0, 0]}><shaderMaterial ref={material} transparent depthWrite={false} blending={THREE.NormalBlending} uniforms={{ uTime: { value: 0 }, uOpacity: { value: opacity } }} vertexShader={vertexShader} fragmentShader={fragmentShader} /></points>;
}
