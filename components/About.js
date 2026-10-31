export default function About() {
  return (
    <section className="page" id="about" data-h="710" aria-label="About">
      <div className="stage">
        <div className="about-bg" aria-hidden="true">
          <div className="wave">
            <div className="wave__in">
              <img src="/assets/img-01.webp" alt="" />
            </div>
          </div>
        </div>
        <div className="about">
          <div className="divider" />
          <div className="about__row">
            <div className="about__text">
              <p className="rv" style={{ "--d": 250 }}>
                At CRAFT Lab, robotics goes beyond engineering. On stage, alongside audiences, and through materials, robots meet art to create new possibilities.
              </p>
              <p className="rv" style={{ "--d": 450 }}>
                Across Arts, Fabrication, and Technology, choreographers, engineers, craftspeople, and researchers share one workbench to develop new ways of working.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
