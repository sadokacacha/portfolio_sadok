"use client";

import { useEffect, useRef } from "react";

export default function MouseTethers() {
  const canvas = useRef();
  useEffect(() => {
    if (window.matchMedia("(pointer: coarse), (prefers-reduced-motion: reduce)").matches) return undefined;
    const context = canvas.current.getContext("2d");
    const mouse = { x: -500, y: -500, tx: -500, ty: -500 };
    const trail = Array.from({ length: 5 }, () => ({ x: -500, y: -500 }));
    let targets = []; let nearby = []; let frame; let tick = 0;
    const refreshTargets = () => { targets = [...document.querySelectorAll("a, button, h1, h2, h3, .project-description")]; };
    const resize = () => {
      const ratio = Math.min(window.devicePixelRatio, 1.5); canvas.current.width = window.innerWidth * ratio; canvas.current.height = window.innerHeight * ratio; canvas.current.style.width = `${window.innerWidth}px`; canvas.current.style.height = `${window.innerHeight}px`; context.setTransform(ratio, 0, 0, ratio, 0, 0);
    };
    const move = (event) => { mouse.tx = event.clientX; mouse.ty = event.clientY; };
    const drawLine = (x, y, strength, index, isWorkTarget) => {
      const curve = 0.14 + index * 0.025;
      const reach = isWorkTarget ? 1.12 : 1;
      context.beginPath(); context.moveTo(mouse.x, mouse.y); context.quadraticCurveTo((mouse.x + x) / 2 + (y - mouse.y) * curve, (mouse.y + y) / 2 + (mouse.x - x) * 0.07, x, y);
      context.strokeStyle = `rgba(1, 15, 24, ${strength * (.58 - index * .08)})`; context.lineWidth = (1.9 + strength * 2.1) * reach; context.stroke();
      context.beginPath(); context.moveTo(mouse.x, mouse.y); context.quadraticCurveTo((mouse.x + x) / 2 + (y - mouse.y) * curve, (mouse.y + y) / 2 + (mouse.x - x) * 0.07, x, y);
      context.strokeStyle = `rgba(119, 232, 255, ${strength * (.92 - index * .1)})`; context.lineWidth = (.72 + strength * 1.05) * reach; context.stroke();
    };
    const render = () => {
      mouse.x += (mouse.tx - mouse.x) * 0.38; mouse.y += (mouse.ty - mouse.y) * 0.38;
      trail.forEach((point, index) => { const lead = index ? trail[index - 1] : mouse; point.x += (lead.x - point.x) * (0.33 - index * 0.035); point.y += (lead.y - point.y) * (0.33 - index * 0.035); });
      context.clearRect(0, 0, window.innerWidth, window.innerHeight);
      if ((tick += 1) % 2 === 0) { nearby = []; for (const target of targets) { const rect = target.getBoundingClientRect(); const x = rect.left + rect.width / 2; const y = rect.top + rect.height / 2; const isWorkTarget = Boolean(target.closest(".project-card")); const radius = isWorkTarget ? 360 : 275; const distance = Math.hypot(mouse.x - x, mouse.y - y); if (distance < radius && rect.bottom > 0 && rect.top < window.innerHeight) nearby.push({ x, y, distance, radius, isWorkTarget }); } nearby.sort((a, b) => a.distance - b.distance); }
      nearby.slice(0, 3).forEach(({ x, y, distance, radius, isWorkTarget }, index) => { const strength = 1 - distance / radius; drawLine(x, y, strength, index, isWorkTarget); context.beginPath(); context.arc(x, y, (2.5 + strength * 4.2) * (isWorkTarget ? 1.12 : 1), 0, Math.PI * 2); context.fillStyle = `rgba(205, 248, 255, ${Math.min(1, strength * 1.08)})`; context.fill(); });
      trail.forEach((point, index) => { context.beginPath(); context.arc(point.x, point.y, Math.max(.9, 2.8 - index * .34), 0, Math.PI * 2); context.fillStyle = `rgba(181, 239, 255, ${.68 - index * .08})`; context.fill(); });
      frame = requestAnimationFrame(render);
    };
    resize(); refreshTargets(); window.addEventListener("resize", resize); window.addEventListener("load", refreshTargets); window.addEventListener("pointermove", move, { passive: true }); frame = requestAnimationFrame(render);
    return () => { cancelAnimationFrame(frame); window.removeEventListener("resize", resize); window.removeEventListener("load", refreshTargets); window.removeEventListener("pointermove", move); };
  }, []);
  return <canvas ref={canvas} className="mouse-tethers" aria-hidden="true" />;
}
