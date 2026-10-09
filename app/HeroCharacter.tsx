"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { projectRow } from "./character-motion";

export default function HeroCharacter({ paused }: { paused: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const pauseRef = useRef(paused);
  useEffect(() => { pauseRef.current = paused; }, [paused]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrapper = wrapperRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !wrapper || !ctx) return;
    const portrait = new window.Image();
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    let elapsed = 0;
    let previous = 0;
    let visible = true;
    let loaded = false;
    let disposed = false;
    const width = 640;
    const height = 960;
    canvas.width = width;
    canvas.height = height;

    const draw = (seconds: number) => {
      ctx.clearRect(0, 0, width, height);
      // Subpixel strips form one continuous surface, rather than separate poses.
      const strips = 320;
      for (let row = 0; row < strips; row++) {
        const a = projectRow(row / strips, seconds);
        const b = projectRow((row + 1) / strips, seconds);
        const destinationWidth = width * a.width;
        ctx.drawImage(portrait, 0, row * portrait.height / strips,
          portrait.width, portrait.height / strips,
          a.x * width + (width - destinationWidth) / 2, a.y * height,
          destinationWidth, Math.max(.1, (b.y - a.y) * height) + .35);
      }
    };
    const animate = (now: number) => {
      if (disposed) return;
      const active = visible && !document.hidden && !pauseRef.current && !reduced.matches;
      if (loaded && active) {
        if (previous) elapsed += Math.min((now - previous) / 1000, .05);
        draw(elapsed);
      }
      previous = active ? now : 0;
      frame = requestAnimationFrame(animate);
    };
    const onPreference = () => { if (loaded && reduced.matches) draw(0); };
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; });
    observer.observe(wrapper);
    reduced.addEventListener("change", onPreference);
    portrait.onload = () => {
      if (disposed) return;
      loaded = true;
      draw(0);
      wrapper.dataset.rendered = "true";
      frame = requestAnimationFrame(animate);
    };
    portrait.src = "/generated/arun-character-cartoon.png";
    return () => {
      disposed = true;
      cancelAnimationFrame(frame);
      observer.disconnect();
      reduced.removeEventListener("change", onPreference);
    };
  }, []);

  return <div ref={wrapperRef} className="agent-visual hero-character" role="img" aria-label="Arun's cartoon character bowing to welcome you">
    <Image className="character-fallback" src="/generated/arun-character-cartoon.png" alt="" width={1024} height={1536} priority/>
    <canvas ref={canvasRef} className="character-canvas" aria-hidden="true"/>
  </div>;
}
