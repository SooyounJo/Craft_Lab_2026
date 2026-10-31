export default function Work() {
  return (
    <section className="page" id="work" data-h="761" aria-label="Selected work">
      <div className="stage">
        <div className="panel">
          <div className="intro">
            <h2 className="rv">
              Every Work<br />Becomes Material.
            </h2>
            <p className="rv" style={{ "--d": 150 }}>
              Performance, exhibition, research and education are not separate. Whatever form it takes, each work is a record of people and machines responding to each other.
            </p>
          </div>
          <div className="track" tabIndex={0} aria-label="Selected work — drag or scroll sideways">
            <div className="track__row">
              <div className="tile" style={{ marginTop: 124.45, "--d": 150 }}>
                <img src="/assets/img-14.webp" alt="" />
                <b>Movement Archive</b>
                <span>An archive robots can read.</span>
              </div>
              <div className="tile" style={{ marginTop: 178.45, marginLeft: 24, "--d": 260 }}>
                <img src="/assets/img-15.webp" alt="" />
                <b>Material Studies</b>
                <span>Where precision meets the hand.</span>
              </div>
              <div className="tile" style={{ marginTop: 124.45, marginLeft: 24, "--d": 370 }}>
                <img src="/assets/img-16.webp" alt="" />
                <b>Listening Interface</b>
                <span>Sound, motion, space — together.</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
