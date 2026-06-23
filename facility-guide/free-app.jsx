/* FREE listing version of the NZICC facility page.
   Truncated content + locked premium teasers + owner upsell. Loaded as Babel JSX. */
(function () {
  const DS = window.BusinessDeskDesignSystem_eb7d20 || {};
  const { Masthead, SectionNav, Footer, Button, Icon } = DS;
  const {
    Hero, StatBand, EnquiryCTA, SponsorStrip, Kicker, Slot, SectionHead, MrecBand,
  } = window;
  const {
    useTweaks, TweaksPanel, TweakSection, TweakSlider, TweakRadio, TweakColor,
  } = window;
  const D = window.NZICC;

  const PREMIUM_HREF = "Conference Facility Guide — NZICC.html";

  function Breadcrumb() {
    return (
      <nav className="fac-crumb" aria-label="Breadcrumb">
        <a href="Conference Guide — Home.html">The Life</a>
        <span className="fac-crumb-sep">›</span>
        <a href="Conference Guide — Search.html">Conference Venue Guide</a>
        <span className="fac-crumb-sep">›</span>
        <span aria-current="page">{D.shortName}</span>
      </nav>
    );
  }

  function LockIcon(props) {
    const s = props.size || 22;
    return (
      <svg width={s} height={s} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <rect x="4.5" y="10.5" width="15" height="10" rx="1.5" stroke="currentColor" strokeWidth="1.6" />
        <path d="M8 10.5V7.5a4 4 0 0 1 8 0v3" stroke="currentColor" strokeWidth="1.6" />
        <circle cx="12" cy="15.2" r="1.4" fill="currentColor" />
      </svg>
    );
  }

  /* Truncated intro — single paragraph, cut short with a fade + upgrade nudge */
  function TruncIntro() {
    const text = (D.intro[0] || "").slice(0, 230).trim() + "…";
    return (
      <div className="fac-intro free-intro">
        <p>{text}</p>
        <p className="free-trunc-note">
          <a className="fac-link" href={PREMIUM_HREF}>Read the full venue description ›</a>
        </p>
      </div>
    );
  }

  /* Limited "at a glance" — first three facts only */
  function GlanceLite() {
    const rows = D.glance.slice(0, 3);
    return (
      <div className="fac-glance">
        <Kicker>At a glance</Kicker>
        <dl className="fac-glance-list">
          {rows.map((row, i) => (
            <div className="fac-glance-row" key={i}><dt>{row[0]}</dt><dd>{row[1]}</dd></div>
          ))}
        </dl>
      </div>
    );
  }

  /* Locked premium teaser card */
  function LockedTeaser(props) {
    return (
      <a className="free-locked" href={PREMIUM_HREF} data-screen-label={"Locked: " + props.title}>
        <div className="free-locked-icon"><LockIcon /></div>
        <h3 className="free-locked-title">{props.title}</h3>
        <p className="free-locked-desc">{props.desc}</p>
        <span className="free-locked-tag">Premium listing</span>
      </a>
    );
  }

  function LockedSection() {
    return (
      <section>
        <SectionHead kicker="More about this venue" title="Available with a Premium listing"
          lead="This venue has a free listing. Photo galleries, video tours, full facility details and pricing are unlocked when the operator upgrades to Premium." />
        <div className="free-locked-grid">
          <LockedTeaser title="Photo gallery" desc="A full gallery of theatre, exhibition, banquet and meeting spaces." />
          <LockedTeaser title="Video tour" desc="Walk through the venue with an embedded video tour." />
          <LockedTeaser title="Facilities & services" desc="Catering, accommodation, AV, accessibility and sustainability detail." />
          <LockedTeaser title="Capacities & pricing" desc="Full room-by-room capacity matrix and package pricing." />
        </div>
      </section>
    );
  }

  /* Basic contact — no direct phone/email on free; enquiry button only */
  function ContactLite() {
    return (
      <section className="fac-contact">
        <Kicker>Contact</Kicker>
        <dl className="fac-glance-list">
          <div className="fac-glance-row"><dt>Location</dt><dd>{D.contact.address}</dd></div>
          <div className="fac-glance-row"><dt>From airport</dt><dd>Approx. 40 minutes by road</dd></div>
        </dl>
        <p className="free-contact-note">Direct phone, email and website links are shown on Premium listings.</p>
        <div style={{ marginTop: "16px" }}><EnquiryCTA /></div>
      </section>
    );
  }

  /* Owner-facing upsell banner */
  function OwnerUpgrade() {
    const perks = [
      "Photo gallery & video tour",
      "Full facility & capacity details",
      "Your own advertising — drive clicks to your site",
      "Direct contact & enquiry links",
      "Priority placement in search",
    ];
    return (
      <aside className="free-owner">
        <div className="free-owner-inner">
          <div className="free-owner-copy">
            <Kicker style={{ color: "var(--accent)" }}>Own or manage this venue?</Kicker>
            <h2 className="fac-h2">Upgrade to a Premium listing</h2>
            <p className="free-owner-lead">Tell your venue's full story and turn the page into a marketing channel — richer content plus advertising that points delegates straight to your own website.</p>
            <ul className="free-owner-perks">
              {perks.map((p, i) => (
                <li key={i}>{Icon ? <Icon name="circle-check" size={18} className="free-perk-ic" /> : null}<span>{p}</span></li>
              ))}
            </ul>
            <div className="free-owner-actions">
              <Button variant="red" size="lg" className="fac-accent-btn"
                iconRight={Icon ? <Icon name="arrow-right" size={18} /> : null}>Upgrade this listing</Button>
              <a className="free-owner-preview" href={PREMIUM_HREF}>See a Premium example ›</a>
            </div>
          </div>
          <div className="free-owner-card">
            <span className="free-owner-card-tag">Premium</span>
            <div className="free-owner-card-rows">
              <div><strong>Rich</strong><span>content</span></div>
              <div><strong>Own</strong><span>advertising</span></div>
              <div><strong>Top</strong><span>placement</span></div>
            </div>
          </div>
        </div>
      </aside>
    );
  }

  function FreeApp(props) {
    const t = props.t;
    return (
      <div className="fac-layout is-editorial is-free" data-screen-label="Free listing">
        <div className="fac-shell">
          <Breadcrumb />
          <div className="free-flag"><span className="free-flag-tag">Free listing</span>
            <span className="free-flag-note">Basic details only — <a className="fac-link" href={PREMIUM_HREF}>see what Premium adds ›</a></span>
          </div>
        </div>
        <Hero treatment="split" />
        <article className="fac-col">
          <TruncIntro />
          <GlanceLite />
          <StatBand />
          <MrecBand id="free-ad-1" />
          <LockedSection />
          <MrecBand id="free-ad-2" />
          <ContactLite />
        </article>
        <OwnerUpgrade />
      </div>
    );
  }

  const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
    "sponsor": "branded",
    "accent": "#D20000",
    "typeScale": 1
  }/*EDITMODE-END*/;

  function App() {
    const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
    const rootStyle = { "--accent": t.accent, "--type-scale": String(t.typeScale) };
    return (
      <div className="fac-root" style={rootStyle}>
        <Masthead onMenu={() => {}} onSearch={() => {}} />
        <SectionNav
          sections={["Home", "Markets", "Companies", "Property", "Technology", "Opinion", "The Life"]}
          active="The Life" onSelect={() => {}} />
        <SponsorStrip intensity={t.sponsor} />
        <FreeApp t={t} />
        <Footer tagline="Premium business journalism for New Zealand." />
        <TweaksPanel title="Tweaks">
          <TweakSection label="Sponsorship" />
          <TweakRadio label="Tourism Fiji branding" value={t.sponsor}
            options={[{ value: "subtle", label: "Subtle" }, { value: "branded", label: "Branded strip" }]}
            onChange={(v) => setTweak("sponsor", v)} />
          <TweakSection label="Style" />
          <TweakColor label="Accent" value={t.accent} options={["#D20000", "#11B1BB", "#058BD7", "#52AA34"]}
            onChange={(v) => setTweak("accent", v)} />
          <TweakSlider label="Type scale" value={t.typeScale} min={0.9} max={1.2} step={0.05}
            onChange={(v) => setTweak("typeScale", v)} />
        </TweaksPanel>
      </div>
    );
  }

  ReactDOM.createRoot(document.getElementById("root")).render(<App />);
})();
