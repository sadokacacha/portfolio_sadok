"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { StarField } from "@/components/space/star-field";
import { NetworkField } from "@/components/space/network-field";
import { SpaceCamera } from "@/components/space/space-camera";

function SpaceEnvironment({ compact }) {
  const universe = useRef();
  useFrame((state, delta) => {
    if (!universe.current) return;
    universe.current.rotation.y += delta * 0.003;
    universe.current.rotation.x = THREE.MathUtils.damp(universe.current.rotation.x, state.pointer.y * 0.012, 1.5, delta);
  });
  return <group ref={universe}>
    <StarField count={compact ? 300 : 850} spread={58} depth={42} size={2.1} opacity={0.62} seed={11} />
    <StarField count={compact ? 160 : 420} spread={34} depth={25} size={3.2} opacity={0.78} seed={29} clustered />
    <StarField count={compact ? 45 : 105} spread={19} depth={12} size={5.1} opacity={0.9} seed={47} near />
    {!compact && <NetworkField />}
    <fog attach="fog" args={["#010409", 13, 52]} />
  </group>;
}

function SpaceCanvas() {
  const [compact, setCompact] = useState(false);
  useEffect(() => {
    const query = window.matchMedia("(max-width: 700px), (pointer: coarse)");
    const update = () => setCompact(query.matches);
    update(); query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);
  return <Canvas dpr={compact ? [1, 1.15] : [1, 1.4]} camera={{ position: [0, 0, 8], fov: compact ? 54 : 48 }} gl={{ alpha: true, antialias: !compact, powerPreference: "high-performance" }} onCreated={({ gl }) => gl.setClearColor("#010409", 1)}>
    <SpaceCamera compact={compact} /><SpaceEnvironment compact={compact} />
  </Canvas>;
}

export default function Scene() { return <SpaceCanvas />; }
