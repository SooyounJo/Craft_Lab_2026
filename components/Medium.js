export default function Medium() {
  return (
    <section className="page" id="medium" data-h="740" aria-label="Robot as Cultural Medium">
      <div className="stage">
        <div className="slide">
          <div className="slide__bg">
            <video
              className="slide__vid"
              src="/assets/vid/ex.mp4"
              muted
              loop
              playsInline
              preload="auto"
              aria-hidden="true"
            />
          </div>
          <div className="intro">
            <h2 className="rv" style={{ "--d": 300 }}>
              Robot as<br />Cultural Medium.
            </h2>
            <p className="rv" style={{ "--d": 450 }}>
              Performance, exhibition, research and education are not separate. Whatever form it takes, each work is a record of people and machines responding to each other.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
