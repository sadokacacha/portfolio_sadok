"use client";
import { useEffect } from "react";
import Lenis from "lenis";
export default function SmoothScroll({ children }) { useEffect(() => { if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return; const lenis = new Lenis({ duration: 1.15, easing: (t) => 1 - Math.pow(1 - t, 4) }); let frame; const raf = (time) => { lenis.raf(time); frame = requestAnimationFrame(raf); }; frame = requestAnimationFrame(raf); return () => { cancelAnimationFrame(frame); lenis.destroy(); }; }, []); return children; }
