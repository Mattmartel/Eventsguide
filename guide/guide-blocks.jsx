/* Shared components for the guide homepage + search.
   Loaded as Babel JSX. Exports onto window. */
(function () {
  const DS = window.BusinessDeskDesignSystem_eb7d20 || {};
  const { Masthead, SectionNav, Footer, Button, Badge, Icon, Tag, Byline } = DS;
  const G = window.GUIDE;

  const HOME_HREF = "Conference Guide — Home.html";
  const SEARCH_HREF = "Conference Guide — Search.html";

  function Kick(props) {
    return <span className="fac-kicker" style={props.style}>{props.children}</span>;
  }

  function Slot(props) {
    return React.createElement("image-slot", {
      id: props.id,
      placeholder: props.placeholder || "Drop photo",
      shape: "rect",
      style: Object.assign({ display: "block", width: "100%", height: "100%" }, props.style),
    });
  }

  /* ---- sponsor banner (top) --------------------------------------------- */
  function SponsorBanner(props) {
    if (props.intensity === "branded") {
      return (
        <aside className="fac-sponsor-strip is-branded">
          <div className="fac-sponsor-strip-inner">
            <div className="fac-sponsor-strip-logo"><Slot id="sponsor-logo-strip" placeholder="Tourism Fiji logo" /></div>
            <div className="fac-sponsor-strip-copy">
              <Kick>Brought to you by Tourism Fiji</Kick>
              <p>Where business meets the South Pacific. Discover conference and incentive venues across Fiji.</p>
            </div>
            <Button variant="invert" size="md" iconRight={Icon ? <Icon name="arrow-right" size={16} /> : null}>Explore Fiji</Button>
          </div>
        </aside>
      );
    }
    return (
      <aside className="fac-sponsor-strip">
        <span className="fac-sponsor-label">This guide is sponsored by</span>
        <span className="fac-sponsor-logo sm"><Slot id="sponsor-logo-foot" placeholder="Tourism Fiji" /></span>
      </aside>
    );
  }

  /* ---- chrome ----------------------------------------------------------- */
  function Chrome(props) {
    return (
      <React.Fragment>
        <Masthead onMenu={() => {}} onSearch={() => { window.location.href = SEARCH_HREF; }} />
        <SectionNav
          sections={["Home", "Markets", "Companies", "Property", "Technology", "Opinion", "The Life"]}
          active="The Life" onSelect={() => {}} />
        <SponsorBanner intensity={props.sponsor} />
      </React.Fragment>
    );
  }

  function GuideFooter() {
    return <Footer tagline="Premium business journalism for New Zealand." />;
  }

  /* ---- venue meta helpers ----------------------------------------------- */
  function capLabel(v) { return "Up to " + G.fmt(v.capacity); }

  function MetaRow(props) {
    const v = props.venue;
    return (
      <div className="gd-meta">
        <span className="gd-meta-item"><b>{G.fmt(v.capacity)}</b> delegates</span>
        <span className="gd-meta-dot" />
        <span className="gd-meta-item"><b>{v.rooms}</b> rooms</span>
        <span className="gd-meta-dot" />
        <span className="gd-meta-item">{v.type}</span>
      </div>
    );
  }

  function VenueBadge(props) {
    if (!props.badge) return null;
    if (props.badge === "fiji") return <span className="gd-badge-pos"><span className="gd-badge-fiji">Tourism Fiji</span></span>;
    return <span className="gd-badge-pos"><Badge tone={props.badge}>{props.badge === "premium" ? "Premium" : "Sponsored"}</Badge></span>;
  }

  /* ---- venue card ------------------------------------------------------- */
  function VenueCard(props) {
    const v = props.venue;
    const style = props.cardStyle || "photo";
    const showStandfirst = props.standfirst !== false;

    if (style === "data") {
      return (
        <a className="gd-card is-data" href={v.href} data-screen-label={"Card: " + v.name}>
          <div className="gd-card-thumb"><Slot id={v.slot} placeholder={v.region} /><VenueBadge badge={v.badge} /></div>
          <div className="gd-card-body">
            <Kick>{v.type} · {v.region}</Kick>
            <h3 className="gd-card-title">{v.name}</h3>
            <MetaRow venue={v} />
          </div>
        </a>
      );
    }

    return (
      <a className={"gd-card is-photo " + (props.size === "lg" ? "is-lg" : "")} href={v.href} data-screen-label={"Card: " + v.name}>
        <div className="gd-card-media"><Slot id={v.slot} placeholder={v.region} /><VenueBadge badge={v.badge} /></div>
        <div className="gd-card-body">
          <Kick>{v.type} · {v.region}</Kick>
          <h3 className="gd-card-title">{v.name}</h3>
          {showStandfirst ? <p className="gd-card-standfirst">{v.standfirst}</p> : null}
          <MetaRow venue={v} />
        </div>
      </a>
    );
  }

  /* ---- headline-only card (editor's picks) ------------------------------ */
  function PickCard(props) {
    const v = props.venue;
    return (
      <a className="gd-pick" href={v.href}>
        <Kick>{v.type} · {v.region}</Kick>
        <h4 className="gd-pick-title">{v.name}</h4>
        <span className="gd-pick-meta">Up to {G.fmt(v.capacity)} delegates</span>
      </a>
    );
  }

  /* ---- featured hero ---------------------------------------------------- */
  function FeaturedHero(props) {
    const v = props.venue;
    return (
      <section className="gd-featured" data-screen-label="Featured venue">
        <div className="fac-hero-bg"><Slot id={"feat-" + v.slot} placeholder="Drop featured venue photo" /></div>
        <div className="fac-hero-scrim" />
        <div className="gd-featured-content">
          <Kick style={{ color: "#fff" }}>Featured venue · {v.region}</Kick>
          <h1 className="fac-h1 on-dark">{v.name}</h1>
          <p className="fac-standfirst on-dark">{v.standfirst}</p>
          <div className="gd-featured-chips">
            <span className="gd-chip">{G.fmt(v.capacity)} delegates</span>
            <span className="gd-chip">{v.rooms} meeting rooms</span>
            <span className="gd-chip">{v.type}</span>
          </div>
          <div className="gd-featured-cta">
            <Button variant="red" size="lg" className="fac-accent-btn"
              iconRight={Icon ? <Icon name="arrow-right" size={18} /> : null}
              onClick={() => { window.location.href = v.href; }}>
              View venue guide
            </Button>
          </div>
        </div>
      </section>
    );
  }

  /* ---- rail ------------------------------------------------------------- */
  function Rail(props) {
    return (
      <section className="gd-rail">
        <header className="gd-rail-head">
          <div>
            <Kick>{props.kicker}</Kick>
            <h2 className="fac-h2">{props.title}</h2>
          </div>
          {props.action ? <a className="gd-rail-link" href={props.action.href}>{props.action.label} ›</a> : null}
        </header>
        <div className={"gd-grid cols-" + (props.cols || 3)}>
          {props.venues.map((v) => <VenueCard key={v.id} venue={v} cardStyle={props.cardStyle} standfirst={props.standfirst} />)}
        </div>
      </section>
    );
  }

  /* ---- search bar (home hero module + search page top) ------------------ */
  function SearchBar(props) {
    const [q, setQ] = React.useState(props.value || "");
    const go = (e) => {
      if (e) e.preventDefault();
      const url = SEARCH_HREF + (q ? "?q=" + encodeURIComponent(q) : "");
      if (props.onSubmit) props.onSubmit(q); else window.location.href = url;
    };
    return (
      <form className={"gd-search " + (props.variant || "")} onSubmit={go} role="search">
        <div className="gd-search-field">
          {Icon ? <Icon name="external-link" size={18} className="gd-search-ic" /> : null}
          <input className="gd-search-input" type="search" value={q} placeholder={props.placeholder || "Search venues, cities, capacity…"}
            onChange={(e) => setQ(e.target.value)} aria-label="Search venues" />
        </div>
        <Button variant="red" size={props.size || "lg"} className="fac-accent-btn" type="submit">Search venues</Button>
      </form>
    );
  }

  /* ---- hero grid: repeating 2x2 feature tiles for upsell --------------- */
  function HeroGrid(props) {
    const vs = props.venues || [];
    const every = props.every || 17;
    return (
      <div className="gd-hgrid">
        {vs.map((v, i) => {
          const hero = i % every === 0;
          return (
            <a key={v.id} className={"gd-tile " + (hero ? "is-hero" : "")} href={v.href} data-screen-label={"Card: " + v.name}>
              <div className="gd-tile-media"><Slot id={v.slot} placeholder={v.region} /><VenueBadge badge={v.badge} /></div>
              <div className="gd-tile-body">
                <Kick>{hero ? "Featured venue · " + v.region : v.type + " · " + v.region}</Kick>
                <h3 className="gd-tile-title">{v.name}</h3>
                {hero ? <p className="gd-tile-standfirst">{v.standfirst}</p> : null}
                <MetaRow venue={v} />
              </div>
            </a>
          );
        })}
      </div>
    );
  }

  /* ---- editorial articles ---------------------------------------------- */
  function CompactByline(props) {
    return (
      <div className="gd-byl"><b>{props.author}</b><span className="t">{props.time}</span></div>
    );
  }

  function EdHeroLead(props) {
    const a = props.article;
    return (
      <a className="gd-herolead" href={a.href} data-screen-label={"Article: " + a.title}>
        <div className="gd-herolead-text">
          <Tag category={a.category}>{a.kicker}</Tag>
          <h2 className="gd-herolead-title">{a.title}</h2>
          <p className="gd-herolead-standfirst">{a.standfirst}</p>
          <CompactByline author={a.author} time={a.date} />
        </div>
        <div className="gd-herolead-media"><Slot id={a.slot} placeholder="Lead article image" /></div>
      </a>
    );
  }

  function EdLead(props) {
    const a = props.article;
    return (
      <a className="gd-lead" href={a.href} data-screen-label={"Article: " + a.title}>
        <div className="gd-lead-media"><Slot id={a.slot} placeholder="Article image" /></div>
        <div className="gd-lead-body">
          <Tag category={a.category}>{a.kicker}</Tag>
          <h2 className="gd-lead-title">{a.title}</h2>
          <p className="gd-lead-standfirst">{a.standfirst}</p>
          <CompactByline author={a.author} time={a.date} />
        </div>
      </a>
    );
  }

  function EdArticle(props) {
    const a = props.article;
    return (
      <a className="gd-art" href={a.href} data-screen-label={"Article: " + a.title}>
        <div className="gd-art-media"><Slot id={a.slot} placeholder="Article image" /></div>
        <Tag category={a.category}>{a.kicker}</Tag>
        <h3 className="gd-art-title">{a.title}</h3>
        <p className="gd-art-standfirst">{a.standfirst}</p>
        <CompactByline author={a.author} time={a.date} />
      </a>
    );
  }

  function EdText(props) {
    const a = props.article;
    return (
      <a className="gd-text" href={a.href} data-screen-label={"Article: " + a.title}>
        <Tag category={a.category}>{a.kicker}</Tag>
        <h3 className="gd-text-title">{a.title}</h3>
        <p className="gd-art-standfirst">{a.standfirst}</p>
        <CompactByline author={a.author} time={a.date} />
      </a>
    );
  }

  function HighlightVenue(props) {
    const v = props.venue;
    return (
      <a className="gd-hl" href={v.href} data-screen-label={"Highlight: " + v.name}>
        <div className="gd-hl-thumb"><Slot id={"hl-" + v.slot} placeholder={v.region} /><VenueBadge badge={v.badge} /></div>
        <div className="gd-hl-body">
          <Kick>{v.region}</Kick>
          <h4 className="gd-hl-title">{v.name}</h4>
          <span className="gd-hl-meta">Up to {G.fmt(v.capacity)} delegates</span>
        </div>
      </a>
    );
  }

  function AdSlot(props) {
    return (
      <div className="gd-ad">
        <span className="gd-ad-label">Advertisement</span>
        {React.createElement("image-slot", {
          id: props.id || "ad-mpu",
          placeholder: "Tourism Fiji · 300 × 250",
          shape: "rect",
          style: { display: "block", width: "300px", height: "250px", maxWidth: "100%" },
        })}
      </div>
    );
  }

  /* MREC (300x250) — floats between content where there's no billboard slot */
  function MrecAd(props) {
    return (
      <div className={"gd-mrec " + (props.inline ? "is-inline" : "")}>
        <span className="gd-ad-label">Advertisement</span>
        {React.createElement("image-slot", {
          id: props.id || "ad-mrec",
          placeholder: "MREC · 300 × 250",
          shape: "rect",
          style: { display: "block", width: "300px", height: "250px", maxWidth: "100%" },
        })}
      </div>
    );
  }

  Object.assign(window, {
    Kick, Slot, SponsorBanner, Chrome, GuideFooter, VenueCard, PickCard,
    FeaturedHero, Rail, HeroGrid, SearchBar, MetaRow, capLabel,
    EdLead, EdHeroLead, EdArticle, EdText, HighlightVenue, AdSlot, MrecAd,
    HOME_HREF, SEARCH_HREF,
  });
})();
