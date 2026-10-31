function Axis({
  open = false,
  delay,
  badge,
  code,
  title,
  description,
  tags,
  cardTags,
  image,
  alt,
}) {
  return (
    <article
      className={open ? "ax rv open" : "ax rv"}
      style={{ "--d": delay }}
      tabIndex={0}
      aria-expanded={open}
    >
      <div className="r-row" aria-hidden={open}>
        <div className="badge">{badge}</div>
        <div className="r-text">
          <p className="k">{code}</p>
          <h3>{title}</h3>
          <p className="d">{description}</p>
          <p className="t">{tags}</p>
        </div>
      </div>
      <div className="r-card">
        <div className="r-card__c">
          <div className="r-card__top">
            <div className="badge">{badge}</div>
            <div>
              <p className="k">{code}</p>
              <h3>{title}</h3>
            </div>
          </div>
          <div className="r-card__b">
            <p className="d">{description}</p>
            <p className="t" dangerouslySetInnerHTML={{ __html: cardTags }} />
          </div>
        </div>
        <div className="r-card__img">
          <img src={image} alt={alt} />
        </div>
      </div>
    </article>
  );
}

export default function Research() {
  return (
    <section className="page" id="research" data-h="1266.78" aria-label="Research">
      <div className="stage">
        <div className="research">
          <div className="r-intro">
            <h2 className="rv">
              <span>Three axes,</span>
              <span>one workbench.</span>
            </h2>
            <p className="rv" style={{ "--d": 120 }}>
              The brackets in our name denote a matrix. With CR as the constant,<br />a · f · t combine differently in every project.
            </p>
          </div>
          <div className="r-div top">
            <i />
          </div>

          <div className="axes">
            <Axis
              delay={200}
              badge="01"
              code="CR[a]"
              title="Arts"
              description="Where performing arts meet robotics. We translate choreography, directing, and stagecraft into a language of robotic expression."
              tags="Dance & Theatre · Choreographic Archives · Stage Direction · Motion Capture"
              cardTags="Dance &amp; Theatre · Choreographic Archives<br>Stage Direction · Motion Capture"
              image="/assets/img-09.webp"
              alt="Dancers performing with robot arms"
            />
            <Axis
              open
              delay={320}
              badge="02"
              code="CR[f]"
              title="Fabrication"
              description="Fabrication and craft. We explore the character of materials between the precision of robotic fabrication and the traces of the human hand."
              tags="Robotic Fabrication · Additive Manufacturing · Craft Collaborations · Large-Scale Installations"
              cardTags="Robotic Fabrication · Additive Manufacturing · <br>Craft Collaborations · Large-Scale Installations"
              image="/assets/img-10.webp"
              alt="Robotic fabrication surface study"
            />
            <Axis
              delay={440}
              badge="03"
              code="CR[t]"
              title="Technology"
              description="Sensing and interfaces. We design interfaces that interpret human intent and communicate the state of machines."
              tags="HRI · Real-Time Sensing · Control Interfaces · Data Visualization"
              cardTags="HRI · Real-Time Sensing<br>Control Interfaces · Data Visualization"
              image="/assets/img-11.webp"
              alt="Robot arm in a research lab"
            />
          </div>
          <div className="r-div bot">
            <i />
          </div>
        </div>
      </div>
    </section>
  );
}
