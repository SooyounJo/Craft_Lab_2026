import Logo from "@/components/Logo";

export default function Hero() {
  return (
    <section className="page" id="hero" data-h="1290" aria-label="CRAFT Lab">
      <div className="stage hero-stage">
        <div className="wave">
          <div className="wave__in">
            <img src="/assets/img-01.webp" alt="" />
          </div>
          <video
            className="about-vid"
            src="/assets/vid/add.mp4"
            muted
            playsInline
            preload="none"
          />
        </div>
        <div className="hero-img" aria-hidden="true">
          <div style={{ background: "#0d0d0d" }} />
          <div className="hero-vidwrap">
            <video
              className="hero-vid"
              src="/assets/vid/hero-loop.mp4"
              muted
              loop
              playsInline
              preload="none"
            />
          </div>
          <div className="g1" />
          <div className="g2" />
        </div>

        <header className="nav">
          <div className="nav__brand">
            <Logo />
            <div className="nav__links">
              <a href="#research">
                Cultural Robotics,<br />
                Arts, Fabrication<br />
                &amp; Technology
              </a>
            </div>
          </div>
          <div className="nav__links nav__lang" role="group" aria-label="Language">
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
