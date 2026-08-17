"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshTransmissionMaterial } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

function Sculpture() {
  const group = useRef();
  useFrame((state, delta) => {
    const scroll = window.scrollY / Math.max(1, document.body.scrollHeight - window.innerHeight);
    group.current.rotation.y += delta * 0.065;
    group.current.rotation.x = THREE.MathUtils.damp(group.current.rotation.x, -0.2 + scroll * 0.55, 2, delta);
    group.current.position.y = THREE.MathUtils.damp(group.current.position.y, 0.25 - scroll * 1.2, 2, delta);
    group.current.scale.setScalar(THREE.MathUtils.damp(group.current.scale.x, 1 + scroll * 0.35, 2, delta));
  });
  return <group ref={group} rotation={[0.2, 0.25, 0]}><Float speed={1.1} rotationIntensity={0.18} floatIntensity={0.42}><mesh scale={[1.35, 1.65, 1.05]}><icosahedronGeometry args={[1, 5]} /><MeshTransmissionMaterial transmission={1} thickness={1.3} roughness={0.06} ior={1.25} chromaticAberration={0.035} anisotropy={0.18} color="#c6d7f0" /></mesh></Float><mesh position={[0.45, -0.25, -0.42]} rotation={[0.7, 0, 0.5]} scale={[0.52, 1.15, 0.34]}><octahedronGeometry args={[1, 2]} /><meshPhysicalMaterial color="#6b82a0" transparent opacity={0.25} roughness={0.05} metalness={0.2} /></mesh></group>;
}
function Lights() { return <><ambientLight intensity={0.25} /><pointLight position={[-3, 2, 3]} intensity={5} color="#9cc1ff" /><pointLight position={[3, -1, 2]} intensity={3} color="#e8edff" /><pointLight position={[0, 3, -3]} intensity={2} color="#809abb" /></>; }
export default function Scene() { return <Canvas dpr={[1, 1.5]} camera={{ position: [0, 0, 5.6], fov: 42 }} gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}><Lights /><Sculpture /></Canvas>; }
