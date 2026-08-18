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
    const drawLine = (x, y, strength, index) => {
      context.beginPath(); context.moveTo(mouse.x, mouse.y); context.quadraticCurveTo((mouse.x + x) / 2 + (y - mouse.y) * (0.14 + index * 0.025), (mouse.y + y) / 2 + (mouse.x - x) * 0.07, x, y);
      context.strokeStyle = `rgba(109, 220, 255, ${strength * (0.5 - index * 0.09)})`; context.lineWidth = 0.7 + strength * 0.85; context.stroke();
    };
    const render = () => {
      mouse.x += (mouse.tx - mouse.x) * 0.38; mouse.y += (mouse.ty - mouse.y) * 0.38;
      trail.forEach((point, index) => { const lead = index ? trail[index - 1] : mouse; point.x += (lead.x - point.x) * (0.33 - index * 0.035); point.y += (lead.y - point.y) * (0.33 - index * 0.035); });
      context.clearRect(0, 0, window.innerWidth, window.innerHeight);
      if ((tick += 1) % 2 === 0) { nearby = []; for (const target of targets) { const rect = target.getBoundingClientRect(); const x = rect.left + rect.width / 2; const y = rect.top + rect.height / 2; const distance = Math.hypot(mouse.x - x, mouse.y - y); if (distance < 235 && rect.bottom > 0 && rect.top < window.innerHeight) nearby.push({ x, y, distance }); } nearby.sort((a, b) => a.distance - b.distance); }
      nearby.slice(0, 3).forEach(({ x, y, distance }, index) => { const strength = 1 - distance / 235; drawLine(x, y, strength, index); context.beginPath(); context.arc(x, y, 1.8 + strength * 3.2, 0, Math.PI * 2); context.fillStyle = `rgba(205, 245, 255, ${strength * .92})`; context.fill(); });
      trail.forEach((point, index) => { context.beginPath(); context.arc(point.x, point.y, Math.max(.7, 2.2 - index * .3), 0, Math.PI * 2); context.fillStyle = `rgba(154, 230, 255, ${.5 - index * .07})`; context.fill(); });
      frame = requestAnimationFrame(render);
    };
    resize(); refreshTargets(); window.addEventListener("resize", resize); window.addEventListener("load", refreshTargets); window.addEventListener("pointermove", move, { passive: true }); frame = requestAnimationFrame(render);
    return () => { cancelAnimationFrame(frame); window.removeEventListener("resize", resize); window.removeEventListener("load", refreshTargets); window.removeEventListener("pointermove", move); };
  }, []);
  return <canvas ref={canvas} className="mouse-tethers" aria-hidden="true" />;
}
