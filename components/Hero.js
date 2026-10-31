import Logo from "@/components/Logo";

const LOGO = [
  "/assets/img-04.svg",
  "/assets/img-05.svg",
  "/assets/img-06.svg",
  "/assets/img-07.svg",
  "/assets/img-08.svg",
];

export default function Hero() {
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
          <img src="/assets/img-02.webp" alt="" />
          <div className="g1" />
          <img className="l5" src="/assets/img-03.webp" alt="" />
          <div className="g2" />
        </div>

        <header className="nav">
          <div className="nav__links">
            <a href="#research">Arts &<br />Fabrication</a>
            <a href="#work">Technology &<br />Selected Work</a>
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
