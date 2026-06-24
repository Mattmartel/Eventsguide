/* Shared editorial blocks for the NZICC facility page.
   Loaded as Babel JSX. Exports components onto window. */
(function () {
  const DS = window.BusinessDeskDesignSystem_eb7d20 || {};
  const { Button, Badge, Divider, Icon } = DS;
  const D = window.NZICC;

  /* ---- small primitives -------------------------------------------------- */
  function Kicker(props) {
    return <span className="fac-kicker" style={props.style}>{props.children}</span>;
  }

  function SectionHead(props) {
    return (
      <header className="fac-sec-head">
        {props.kicker ? <Kicker>{props.kicker}</Kicker> : null}
        <h2 className="fac-h2">{props.title}</h2>
        {props.lead ? <p className="fac-sec-lead">{props.lead}</p> : null}
      </header>
    );
  }

  function Slot(props) {
    const id = props.id || '';
    let defaultSrc = props.src || '';
    if (!defaultSrc) {
      if (/sponsor/i.test(id)) defaultSrc = 'uploads/pasted-1782189055910-0.png';
      else if (/hero/i.test(id)) defaultSrc = 'screenshots/02-hero.png';
      else if (id === 'hero-img') defaultSrc = 'screenshots/02-hero.png';
      else if (id.indexOf('v-') === 0) defaultSrc = 'screenshots/grid3.png';
      else defaultSrc = 'screenshots/01-home1.png';
    }
    return React.createElement("image-slot", {
      id: props.id,
      src: defaultSrc,
      placeholder: props.placeholder || "Drop an image",
      shape: props.shape || "rect",
      style: Object.assign({ display: "block", width: "100%", height: "100%" }, props.style),
    });
  }

  /* ---- sponsor ----------------------------------------------------------- */
  function SponsorCredit(props) {
    // inline subtle credit: "Sponsored by  [logo]"
    return (
      <div className={"fac-sponsor-credit " + (props.invert ? "is-invert" : "")}>
        <span className="fac-sponsor-label">Sponsored by</span>
        <span className="fac-sponsor-logo">
          <Slot id="sponsor-logo" placeholder="Tourism Fiji logo" />
        </span>
      </div>
    );
  }

  function SponsorStrip(props) {
    if (props.intensity === "branded") {
      return (
        <aside className="fac-sponsor-strip is-branded">
          <div className="fac-sponsor-strip-inner">
            <div className="fac-sponsor-strip-logo">
              <Slot id="sponsor-logo-strip" placeholder="Tourism Fiji logo" />
            </div>
            <div className="fac-sponsor-strip-copy">
              <Kicker>Brought to you by Tourism Fiji</Kicker>
              <p>
                Planning your next conference? Discover where business meets the South Pacific —
                explore meeting and incentive options across Fiji.
              </p>
            </div>
            <Button variant="invert" size="md" iconRight={Icon ? <Icon name="arrow-right" size={16} /> : null}>
              Explore Fiji
            </Button>
          </div>
        </aside>
      );
    }
    return (
      <aside className="fac-sponsor-strip">
        <span className="fac-sponsor-label">This venue guide is sponsored by</span>
        <span className="fac-sponsor-logo sm">
          <Slot id="sponsor-logo-foot" placeholder="Tourism Fiji" />
        </span>
      </aside>
    );
  }

  /* ---- hero -------------------------------------------------------------- */
  function Hero(props) {
    const treatment = props.treatment || "overlay";
    const ctaBtn =
      <Button variant="red" size="lg" className="fac-accent-btn"
        iconRight={Icon ? <Icon name="arrow-right" size={18} /> : null}>
        Enquire about this venue
      </Button>;

    if (treatment === "split") {
      return (
        <section className="fac-hero is-split" data-screen-label="Hero">
          <div className="fac-hero-text">
            <Kicker>{D.kicker} · {D.region}</Kicker>
            <h1 className="fac-h1">{D.name}</h1>
            <p className="fac-standfirst">{D.standfirst}</p>
            <SponsorCredit />
            <div className="fac-hero-actions">{ctaBtn}</div>
          </div>
          <div className="fac-hero-media">
            <Slot id="hero-img" placeholder="Drop hero photo — theatre or exterior" />
          </div>
        </section>
      );
    }

    // overlay
    return (
      <section className={"fac-hero is-overlay " + (props.tall ? "is-tall" : "")} data-screen-label="Hero">
        <div className="fac-hero-bg">
          <Slot id="hero-img" placeholder="Drop hero photo — theatre or exterior" />
        </div>
        <div className="fac-hero-scrim" />
        <div className="fac-hero-overlay-content">
          <Kicker style={{ color: "#fff" }}>{D.kicker} · {D.region}</Kicker>
          <h1 className="fac-h1 on-dark">{D.name}</h1>
          <p className="fac-standfirst on-dark">{D.standfirst}</p>
          <SponsorCredit invert />
        </div>
      </section>
    );
  }

  /* ---- stat band --------------------------------------------------------- */
  function StatBand(props) {
    return (
      <div className={"fac-statband " + (props.dark ? "is-dark" : "")}>
        {D.stats.map((s, i) => (
          <div className="fac-stat" key={i}>
            <div className="fac-stat-value">{s.value}</div>
            <div className="fac-stat-label">{s.label}</div>
          </div>
        ))}
      </div>
    );
  }

  /* ---- at a glance ------------------------------------------------------- */
  function AtAGlance(props) {
    return (
      <div className="fac-glance">
        <Kicker>At a glance</Kicker>
        <dl className="fac-glance-list">
          {D.glance.map((row, i) => (
            <div className="fac-glance-row" key={i}>
              <dt>{row[0]}</dt>
              <dd>{row[1]}</dd>
            </div>
          ))}
        </dl>
      </div>
    );
  }

  /* ---- capacity / spaces ------------------------------------------------- */
  function SpecTable(props) {
    return (
      <div className="fac-table-wrap">
        <table className="fac-table">
          <thead>
            <tr>
              <th className="al">Space</th>
              <th>Area</th>
              <th>Theatre</th>
              <th>Banquet</th>
              <th>Cocktail</th>
              <th>Exhibition</th>
            </tr>
          </thead>
          <tbody>
            {D.spaces.map((s, i) => (
              <tr key={i}>
                <th className="al" scope="row">{s.name}</th>
                <td>{s.area}</td>
                <td>{s.theatre}</td>
                <td>{s.banquet}</td>
                <td>{s.cocktail}</td>
                <td>{s.exhibition}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="fac-table-note">Capacities are maximums and vary by configuration. “—” indicates not a standard configuration for that space.</p>
      </div>
    );
  }

  function SpacesList(props) {
    return (
      <div className="fac-spaces">
        {D.spaces.map((s, i) => (
          <article className="fac-space" key={i}>
            <div className="fac-space-head">
              <h3 className="fac-h3">{s.name}</h3>
              <span className="fac-space-area">{s.area}</span>
            </div>
            <p className="fac-space-blurb">{s.blurb}</p>
          </article>
        ))}
      </div>
    );
  }

  /* ---- detail blocks ----------------------------------------------------- */
  function DetailBlock(props) {
    const f = props.field;
    return (
      <section className={"fac-detail " + (props.card ? "is-card" : "")}>
        <h3 className="fac-h3">{f.title}</h3>
        <p className="fac-detail-body">{f.body}</p>
        {f.items ? (
          <ul className="fac-checklist">
            {f.items.map((it, i) => (
              <li key={i}>
                {Icon ? <Icon name="circle-check" size={18} className="fac-check-ic" /> : <span className="fac-check-dot" />}
                <span>{it}</span>
              </li>
            ))}
          </ul>
        ) : null}
      </section>
    );
  }

  function DetailGrid(props) {
    const fields = props.fields || D.fields;
    return (
      <div className={"fac-detail-grid cols-" + (props.cols || 2)}>
        {fields.map((f) => <DetailBlock key={f.key} field={f} card={props.card} />)}
      </div>
    );
  }

  /* ---- gallery ----------------------------------------------------------- */
  function Gallery(props) {
    const variant = props.variant || "grid"; // grid | mosaic | strip
    return (
      <div className={"fac-gallery is-" + variant}>
        {D.gallery.map((g, i) => (
          <div className={"fac-gallery-cell c" + (i + 1)} key={g.id}>
            <Slot id={g.id} placeholder={g.label} />
          </div>
        ))}
      </div>
    );
  }

  /* ---- video ------------------------------------------------------------- */
  function VideoBlock(props) {
    return (
      <figure className="fac-video">
        <div className="fac-video-frame">
          <video controls preload="metadata" playsInline>
            <source src={(window.__resources && window.__resources.nziccVideo) || D.video.src} type="video/mp4" />
          </video>
        </div>
        <figcaption className="fac-video-cap">{D.video.caption}</figcaption>
      </figure>
    );
  }

  /* ---- pricing ----------------------------------------------------------- */
  function PricingBlock(props) {
    return (
      <section className="fac-detail">
        <h3 className="fac-h3">Pricing & packages</h3>
        <p className="fac-detail-body">{D.pricing.note}</p>
        <dl className="fac-price-list">
          {D.pricing.rows.map((r, i) => (
            <div className="fac-price-row" key={i}>
              <dt>{r[0]}</dt>
              <dd>{r[1]}</dd>
            </div>
          ))}
        </dl>
      </section>
    );
  }

  /* ---- enquiry CTA ------------------------------------------------------- */
  function EnquiryCTA(props) {
    return (
      <div className={"fac-cta " + (props.card ? "is-card" : "")}>
        {props.card ? <Kicker>Plan your event</Kicker> : null}
        {props.card ? <h3 className="fac-h3">Make your next event extraordinary</h3> : null}
        {props.card ? <p className="fac-detail-body">Our business events team supports you from concept to completion. Tell us about your event and we’ll tailor a proposal.</p> : null}
        <Button variant="red" size={props.size || "lg"} fullWidth={!!props.card} className="fac-accent-btn"
          iconRight={Icon ? <Icon name="arrow-right" size={18} /> : null}>
          Enquire about this venue
        </Button>
        {props.card ? (
          <p className="fac-cta-alt">
            or call <a href="#" className="fac-link">{D.contact.phone}</a>
          </p>
        ) : null}
      </div>
    );
  }

  /* ---- contact ----------------------------------------------------------- */
  function ContactBlock(props) {
    const c = D.contact;
    return (
      <section className="fac-contact">
        <Kicker>Contact</Kicker>
        <dl className="fac-glance-list">
          <div className="fac-glance-row"><dt>Team</dt><dd>{c.sales}</dd></div>
          <div className="fac-glance-row"><dt>Phone</dt><dd>{c.phone}</dd></div>
          <div className="fac-glance-row"><dt>Email</dt><dd><a className="fac-link" href={"mailto:" + c.email}>{c.email}</a></dd></div>
          <div className="fac-glance-row"><dt>Web</dt><dd><a className="fac-link" href="#">{c.web}</a></dd></div>
          <div className="fac-glance-row"><dt>Address</dt><dd>{c.address}</dd></div>
        </dl>
      </section>
    );
  }

  function Quote(props) {
    return (
      <blockquote className="fac-quote">
        <p>“{D.quote.text}”</p>
        <cite>{D.quote.attribution}</cite>
      </blockquote>
    );
  }

  function MrecBand(props) {
    return (
      <div className="fac-mrec">
        <span className="fac-ad-label">Advertisement</span>
        {React.createElement("image-slot", {
          id: props.id || "fac-ad-mrec",
          placeholder: "MREC · 300 × 250",
          shape: "rect",
          style: { display: "block", width: "300px", height: "250px", maxWidth: "100%" },
        })}
      </div>
    );
  }

  Object.assign(window, {
    Kicker, SectionHead, Slot, SponsorCredit, SponsorStrip, Hero, StatBand,
    AtAGlance, SpecTable, SpacesList, DetailBlock, DetailGrid, Gallery,
    VideoBlock, PricingBlock, EnquiryCTA, ContactBlock, Quote, MrecBand,
  });
})();
