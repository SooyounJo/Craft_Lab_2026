import { useEffect, useRef } from "react";

export default function Logo({ href = "#hero" }) {
  const vid = useRef(null);
  const canvas = useRef(null);

  useEffect(() => {
    const v = vid.current;
    const c = canvas.current;
    if (!v || !c) return;
    const ctx = c.getContext("2d", { willReadFrequently: true });
    let raf = 0;
    let running = true;
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;

    const paint = () => {
      raf = 0;
      if (!running || !onScreen || document.hidden) return;
      if (v.readyState >= 2) {
        const scale = Math.min(c.width / v.videoWidth, c.height / v.videoHeight);
        const dw = v.videoWidth * scale;
        const dh = v.videoHeight * scale;
        const dx = (c.width - dw) / 2;
        const dy = (c.height - dh) / 2;
        ctx.clearRect(0, 0, c.width, c.height);
        ctx.drawImage(v, dx, dy, dw, dh);
        const img = ctx.getImageData(0, 0, c.width, c.height);
        const d = img.data;
        for (let i = 0; i < d.length; i += 4) {
          const a = Math.max(d[i], d[i + 1], d[i + 2]);
          d[i] = 255;
          d[i + 1] = 255;
          d[i + 2] = 255;
          d[i + 3] = a;
        }
        ctx.putImageData(img, 0, 0);
      }
      if (!reduce && onScreen) raf = requestAnimationFrame(paint);
    };

    let onScreen = false;
    const sync = () => {
      if (!onScreen || document.hidden || !running) {
        v.pause();
        cancelAnimationFrame(raf);
        raf = 0;
        return;
      }
      if (!reduce) {
        v.play()?.then(() => {
          if (!onScreen || document.hidden || !running) v.pause();
        }).catch(() => {});
      }
      if (!raf) paint();
    };
    const watch = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        onScreen = entry.isIntersecting;
        sync();
      });
    }, { threshold: 0.2 });
    watch.observe(c);

    const start = () => {
      if (reduce) {
        v.pause();
        try {
          v.currentTime = 0;
        } catch (e) {}
      }
      if (onScreen && !raf) paint();
    };

    v.addEventListener("loadeddata", start);
    document.addEventListener("visibilitychange", sync);
    if (v.readyState >= 2) start();
    return () => {
      running = false;
      cancelAnimationFrame(raf);
      watch.disconnect();
      v.pause();
      document.removeEventListener("visibilitychange", sync);
      v.removeEventListener("loadeddata", start);
    };
  }, []);

  return (
    <a className="logo" href={href} aria-label="CRAFT Lab home">
      <video ref={vid} src="/assets/vid/craft-logo.mp4" muted loop playsInline preload="auto" />
      <canvas ref={canvas} width={400} height={164} />
    </a>
  );
}
