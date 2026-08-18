"use client";

import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

const NODE_COUNT = 48;
export function NetworkField() {
  const group = useRef();
  const { nodes, lines } = useMemo(() => {
    const points = Array.from({ length: NODE_COUNT }, (_, i) => new THREE.Vector3(Math.sin(i * 2.4) * (5 + (i % 7) * 0.5) + Math.cos(i * 0.7) * 4, Math.cos(i * 1.7) * 5 + Math.sin(i * 0.31) * 2, -13 - (i / NODE_COUNT) * 9 + Math.sin(i) * 1.5));
    const nodePositions = new Float32Array(NODE_COUNT * 3), segments = [];
    points.forEach((point, i) => point.toArray(nodePositions, i * 3));
    for (let i = 0; i < points.length; i += 1) for (let j = i + 1; j < points.length; j += 1) if (points[i].distanceToSquared(points[j]) < 27 && segments.length < 540) segments.push(...points[i].toArray(), ...points[j].toArray());
    const nodeGeometry = new THREE.BufferGeometry(), lineGeometry = new THREE.BufferGeometry(); nodeGeometry.setAttribute("position", new THREE.BufferAttribute(nodePositions, 3)); lineGeometry.setAttribute("position", new THREE.Float32BufferAttribute(segments, 3)); return { nodes: nodeGeometry, lines: lineGeometry };
  }, []);
  useFrame((state, delta) => { if (!group.current) return; group.current.rotation.y += delta * 0.018; group.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.08) * 0.035; });
  return <group ref={group} position={[1.5, -0.5, 0]}><lineSegments geometry={lines}><lineBasicMaterial color="#274456" transparent opacity={0.055} depthWrite={false} /></lineSegments><points geometry={nodes}><pointsMaterial color="#8badc0" size={0.045} transparent opacity={0.28} sizeAttenuation depthWrite={false} /></points></group>;
}
