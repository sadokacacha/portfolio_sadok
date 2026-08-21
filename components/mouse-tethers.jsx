"use client";

import { useEffect, useRef } from "react";

export default function MouseTethers() {
  const canvas = useRef();
  useEffect(() => {
    if (window.matchMedia("(pointer: coarse), (prefers-reduced-motion: reduce)").matches) return undefined;
    const context = canvas.current.getContext("2d");
    const mouse = { x: -500, y: -500, tx: -500, ty: -500, speed: 0 };
    const trail = Array.from({ length: 8 }, () => ({ x: -500, y: -500 }));
    let targets = []; let nearby = []; let frame; let tick = 0; let lastX = -500; let lastY = -500;
    const refreshTargets = () => {
      targets = [...document.querySelectorAll("a, button")].map((element) => ({ element, rect: element.getBoundingClientRect() }));
    };
    const resize = () => {
      const ratio = Math.min(window.devicePixelRatio, 1.5); canvas.current.width = window.innerWidth * ratio; canvas.current.height = window.innerHeight * ratio; canvas.current.style.width = `${window.innerWidth}px`; canvas.current.style.height = `${window.innerHeight}px`; context.setTransform(ratio, 0, 0, ratio, 0, 0);
      refreshTargets();
    };
    const move = (event) => {
      mouse.tx = event.clientX; mouse.ty = event.clientY;
      mouse.speed = Math.min(1, Math.hypot(event.clientX - lastX, event.clientY - lastY) / 45);
      lastX = event.clientX; lastY = event.clientY;
    };
    const drawLine = (x, y, strength, index) => {
      const bend = (y - mouse.y) * (0.11 + index * 0.018);
      const midX = (mouse.x + x) / 2 + bend;
      const midY = (mouse.y + y) / 2 + (mouse.x - x) * 0.05;
      context.beginPath(); context.moveTo(mouse.x, mouse.y); context.quadraticCurveTo(midX, midY, x, y);
      context.strokeStyle = `rgba(108, 222, 255, ${strength * (.7 - index * .12)})`; context.lineWidth = 0.65 + strength * 1.6; context.stroke();
    };
    const render = () => {
      mouse.x += (mouse.tx - mouse.x) * 0.3; mouse.y += (mouse.ty - mouse.y) * 0.3; mouse.speed *= .88;
      trail.forEach((point, index) => { const lead = index ? trail[index - 1] : mouse; point.x += (lead.x - point.x) * (0.38 - index * 0.025); point.y += (lead.y - point.y) * (0.38 - index * 0.025); });
      context.clearRect(0, 0, window.innerWidth, window.innerHeight);
      if ((tick += 1) % 8 === 0) { nearby = []; for (const target of targets) { target.rect = target.element.getBoundingClientRect(); const rect = target.rect; const x = rect.left + rect.width / 2; const y = rect.top + rect.height / 2; const radius = target.element.closest(".project-card") ? 340 : 250; const distance = Math.hypot(mouse.x - x, mouse.y - y); if (distance < radius && rect.bottom > 0 && rect.top < window.innerHeight) nearby.push({ x, y, distance, radius }); } nearby.sort((a, b) => a.distance - b.distance); }
      nearby.slice(0, 2).forEach(({ x, y, distance, radius }, index) => { const strength = 1 - distance / radius; drawLine(x, y, strength, index); context.beginPath(); context.arc(x, y, 2 + strength * 4, 0, Math.PI * 2); context.fillStyle = `rgba(205, 248, 255, ${Math.min(1, strength * 1.08)})`; context.fill(); });
      trail.forEach((point, index) => { context.beginPath(); context.arc(point.x, point.y, Math.max(.9, 2.8 - index * .34), 0, Math.PI * 2); context.fillStyle = `rgba(181, 239, 255, ${.68 - index * .08})`; context.fill(); });
      context.beginPath(); context.arc(mouse.x, mouse.y, 5 + mouse.speed * 8, 0, Math.PI * 2); context.strokeStyle = `rgba(203, 247, 255, ${.3 + mouse.speed * .35})`; context.lineWidth = 1; context.stroke();
      frame = requestAnimationFrame(render);
    };
    resize(); refreshTargets(); window.addEventListener("resize", resize); window.addEventListener("load", refreshTargets); window.addEventListener("pointermove", move, { passive: true }); frame = requestAnimationFrame(render);
    return () => { cancelAnimationFrame(frame); window.removeEventListener("resize", resize); window.removeEventListener("load", refreshTargets); window.removeEventListener("pointermove", move); };
  }, []);
  return <canvas ref={canvas} className="mouse-tethers" aria-hidden="true" />;
}
