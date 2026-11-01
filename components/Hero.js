import { useEffect, useRef } from "react";
import Logo from "@/components/Logo";

const LOGO = [
  "/assets/img-04.svg",
  "/assets/img-05.svg",
  "/assets/img-06.svg",
  "/assets/img-07.svg",
  "/assets/img-08.svg",
];

export default function Hero() {
  const vid = useRef(null);

  useEffect(() => {
    const v = vid.current;
    if (!v) return;
    let raf = 0;
    const smooth = (x) => {
      const t = Math.max(0, Math.min(1, x));
      return t * t * (3 - 2 * t);
    };
    const tick = () => {
      const d = v.duration;
      if (d && Number.isFinite(d)) {
        const fade = Math.min(0.9, d * 0.18);
        const t = v.currentTime;
        let k = 1;
        if (t < fade) k = smooth(t / fade);
        else if (d - t < fade) k = smooth((d - t) / fade);
        v.style.opacity = String(k);
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <section className="page" id="hero" data-h="1290" aria-label="CRAFT Lab">
      <div className="stage hero-stage">
        <div className="wave">
          <div className="wave__in">
            <img src="/assets/img-01.webp" alt="" />
          </div>
        </div>
        <div className="hero-img" aria-hidden="true">
          <div style={{ background: "#0d0d0d" }} />
          <div className="hero-vidwrap">
            <video
              ref={vid}
              className="hero-vid"
              src="/assets/vid/first vid.mp4"
              muted
              loop
              playsInline
              autoPlay
              preload="auto"
              style={{ opacity: 0 }}
            />
            <div className="hero-vidfade" />
          </div>
          <div className="g1" />
          <div className="g2" />
        </div>

        <header className="nav">
          <div className="nav__links">
            <a href="#research">
              Cultural Robotics,<br />
              Arts, Fabrication<br />
              &amp; Technology
            </a>
          </div>
          <Logo parts={LOGO} />
          <div className="nav__links nav__lang" role="group" aria-label="Language">
            <button type="button" className="lang" data-lang="ko" aria-pressed="false">
              KR
            </button>
            <button type="button" className="lang" data-lang="en" aria-pressed="true">
              EN
            </button>
          </div>
        </header>

        <p className="tagline" aria-label="Robot as Cultural Medium">
          <span>
            <i data-split style={{ "--d": 100 }}>
              Robot as
            </i>
          </span>
          <span>
            <i data-split style={{ "--d": 220 }}>
              Cultural Medium
            </i>
          </span>
        </p>
        <h1 className="headline" data-split>
          CRAFT Lab
        </h1>
      </div>
    </section>
  );
}
