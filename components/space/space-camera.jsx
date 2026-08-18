"use client";

import { useFrame, useThree } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

export function SpaceCamera({ compact }) {
  const { camera, pointer } = useThree(); const scroll = useRef(0);
  useFrame((_, delta) => {
    const maximum = Math.max(1, document.documentElement.scrollHeight - window.innerHeight); scroll.current = THREE.MathUtils.damp(scroll.current, window.scrollY / maximum, 1.7, delta);
    const travel = compact ? 8 : 24;
    camera.position.x = THREE.MathUtils.damp(camera.position.x, pointer.x * 0.42 + Math.sin(scroll.current * Math.PI * 3) * 1.4, 1.45, delta); camera.position.y = THREE.MathUtils.damp(camera.position.y, pointer.y * 0.28 - scroll.current * 1.2 + Math.cos(scroll.current * Math.PI * 2) * 0.45, 1.45, delta); camera.position.z = THREE.MathUtils.damp(camera.position.z, 8 - scroll.current * travel, 1.15, delta); camera.rotation.x = THREE.MathUtils.damp(camera.rotation.x, -pointer.y * 0.03 + Math.sin(scroll.current * Math.PI * 2) * 0.035, 1.4, delta); camera.rotation.y = THREE.MathUtils.damp(camera.rotation.y, -pointer.x * 0.045 + Math.sin(scroll.current * Math.PI * 4) * 0.07, 1.4, delta);
  }); return null;
}
