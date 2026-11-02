import Logo from "@/components/Logo";

export default function Join() {
  return (
    <section className="page" id="join" data-h="937.44" aria-label="Join">
      <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden="true" focusable="false">
        <filter id="scroll-ripple" x="-5%" y="-5%" width="110%" height="110%" colorInterpolationFilters="sRGB">
          <feTurbulence data-r="noise" type="fractalNoise" baseFrequency="0.004 0.011" numOctaves="2" seed="7" result="n" />
          <feDisplacementMap data-r="disp" in="SourceGraphic" in2="n" scale="0" xChannelSelector="R" yChannelSelector="G" result="d" />
          <feGaussianBlur data-r="blur" in="d" stdDeviation="0" />
        </filter>
      </svg>
      <div className="stage">
        <div className="c-bg" data-ripple>
          <img src="/assets/img-17.webp" alt="" />
        </div>
        <div className="glass rv" />
        <div className="c-text">
          <h2 className="rv" style={{ "--d": 200 }}>
            JOIN<br />CRAFT Lab.
          </h2>
          <p className="rv" style={{ "--d": 320 }}>
            Explore opportunities across art, craft and technology.<br />Bring your curiosity, experience and ideas to the lab.
          </p>
        </div>
        <form className="form rv" style={{ "--d": 300 }} noValidate>
          <input
            className="field name"
            name="name"
            placeholder="Name*"
            required
            aria-label="Name"
            autoComplete="name"
          />
          <input
            className="field email"
            name="email"
            type="email"
            placeholder="Email*"
            required
            aria-label="Email"
            autoComplete="email"
          />
          <textarea className="field msg" name="message" placeholder="Message" aria-label="Message" />
          <p className="form-note" role="status" aria-live="polite" />
          <button className="submit" type="submit">
            Submit
          </button>
        </form>

        <footer className="footer">
          <Logo />
          <span className="vline vline-a" />
          <span className="vline vline-b" />
          <nav className="f-nav" aria-label="Footer">
            <p className="h">Explore</p>
            <a href="#research" data-axis="0">Arts · CR[a]</a>
            <a href="#research" data-axis="1">Fabrication · CR[f]</a>
            <a href="#research" data-axis="2">Technology · CR[t]</a>
            <a href="#join">Careers</a>
            <span className="sp" />
            <p className="h">Lab</p>
            <a href="#about">Behaviour</a>
            <a href="#work">Selected Work</a>
            <a href="#join">Join</a>
            <span className="sp" />
            <p className="h">Connect</p>
            <a href="mailto:hello@craftlab.kr">↗ hello@craftlab.kr</a>
            <span>↗ Seoul, Korea</span>
          </nav>
          <div className="f-legal">
            <a href="#">Terms & Conditions</a>
            <a href="#">Privacy Policy</a>
          </div>
          <p className="f-big">
            <span>
              <i style={{ "--d": 200 }}>Robot as</i>
            </span>
            <span>
              <i style={{ "--d": 320 }}>Cultural Medium</i>
            </span>
          </p>
        </footer>
      </div>
    </section>
  );
}
