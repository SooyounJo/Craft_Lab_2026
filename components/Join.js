import Logo from "@/components/Logo";

const LOGO = [
  "/assets/img-18.svg",
  "/assets/img-19.svg",
  "/assets/img-20.svg",
  "/assets/img-21.svg",
  "/assets/img-22.svg",
];

export default function Join() {
  return (
    <section className="page" id="join" data-h="1028.44" aria-label="Join">
      <div className="stage">
        <div className="c-bg">
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
          <Logo parts={LOGO} />
          <span className="vline" style={{ left: 212.88 }} />
          <span className="vline" style={{ left: 681.88 }} />
          <nav className="f-nav" aria-label="Footer">
            <p className="h">Explore</p>
            <a href="#research">Arts · CR[a]</a>
            <a href="#research">Fabrication · CR[f]</a>
            <a href="#research">Technology · CR[t]</a>
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
