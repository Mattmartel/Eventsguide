/* Three layout variations + App shell + tweaks wiring for the NZICC page.
   Loaded as Babel JSX. */
(function () {
  const DS = window.BusinessDeskDesignSystem_eb7d20 || {};
  const { Masthead, SectionNav, Footer, Button, Icon } = DS;
  const {
    SectionHead, Hero, StatBand, AtAGlance, SpecTable, SpacesList,
    DetailGrid, Gallery, VideoBlock, PricingBlock, EnquiryCTA, ContactBlock,
    Quote, SponsorStrip, Kicker, MrecBand,
  } = window;
  const {
    useTweaks, TweaksPanel, TweakSection, TweakSlider, TweakRadio, TweakColor,
  } = window;
  const D = window.NZICC;

  function Breadcrumb() {
    return (
      <nav className="fac-crumb" aria-label="Breadcrumb">
        <a href="#">The Life</a>
        <span className="fac-crumb-sep">›</span>
        <a href="#">Conference Venue Guide</a>
        <span className="fac-crumb-sep">›</span>
        <span aria-current="page">{D.shortName}</span>
      </nav>
    );
  }

  function Intro(props) {
    return (
      <div className={"fac-intro " + (props.large ? "is-large" : "")}>
        {D.intro.map((p, i) => <p key={i}>{p}</p>)}
      </div>
    );
  }

  /* ============================ EDITORIAL =============================== */
  function EditorialLayout(props) {
    const t = props.t;
    return (
      <div className="fac-layout is-editorial" data-screen-label="Editorial layout">
        <div className="fac-shell"><Breadcrumb /></div>
        <Hero treatment={t.hero} />
        <article className="fac-col">
          <Intro />
          <AtAGlance />
          <Quote />
          <SectionHead kicker="The spaces" title="Spaces & capacities" />
          <SpecTable />
          <MrecBand id="fac-ad-mrec-1" />
          <Gallery variant="strip" />
          <VideoBlock />
          <SectionHead kicker="Facilities" title="Facilities & services" />
          <DetailGrid cols={1} />
          <MrecBand id="fac-ad-mrec-2" />
          <PricingBlock />
          <div className="fac-block-gap"><EnquiryCTA card /></div>
          <ContactBlock />
        </article>
      </div>
    );
  }

  /* ============================ SPEC SHEET ============================== */
  function SpecSheetLayout(props) {
    const t = props.t;
    return (
      <div className="fac-layout is-spec" data-screen-label="Spec sheet layout">
        <div className="fac-shell"><Breadcrumb /></div>
        <Hero treatment={t.hero === "overlay" ? "split" : t.hero} />
        <div className="fac-shell"><StatBand /></div>
        <div className="fac-shell fac-grid-main">
          <main className="fac-main">
            <Intro />
            <SectionHead kicker="The spaces" title="Spaces & capacities"
              lead="Thirty-three configurable spaces across four levels — divide, combine and reconfigure to suit any format." />
            <SpecTable />
            <SpacesList />
            <SectionHead kicker="Facilities" title="Facilities & services" />
            <DetailGrid cols={2} card />
            <PricingBlock />
            <SectionHead kicker="Gallery" title="Inside the venue" />
            <Gallery variant="grid" />
            <VideoBlock />
          </main>
          <aside className="fac-aside">
            <div className="fac-sticky">
              <AtAGlance />
              <EnquiryCTA card />
              <ContactBlock />
            </div>
          </aside>
        </div>
      </div>
    );
  }

  /* ============================ SHOWCASE ================================ */
  function ShowcaseLayout(props) {
    const t = props.t;
    return (
      <div className="fac-layout is-showcase" data-screen-label="Showcase layout">
        <Hero treatment={t.hero} tall />
        <StatBand dark />
        <div className="fac-shell-wide">
          <div className="fac-show-lead">
            <Intro large />
            <Quote />
          </div>
          <VideoBlock />
          <SectionHead kicker="Gallery" title="Inside the venue" />
          <Gallery variant="mosaic" />
          <SectionHead kicker="The spaces" title="Spaces & capacities"
            lead="From the country's largest seated theatre to intimate breakout rooms." />
          <SpacesList />
          <SpecTable />
          <SectionHead kicker="Facilities" title="Facilities & services" />
          <DetailGrid cols={2} />
          <div className="fac-show-foot">
            <PricingBlock />
            <EnquiryCTA card />
          </div>
          <ContactBlock />
        </div>
      </div>
    );
  }

  const LAYOUTS = {
    editorial: EditorialLayout,
    spec: SpecSheetLayout,
    showcase: ShowcaseLayout,
  };

  /* ============================ APP ===================================== */
  const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
    "layout": "editorial",
    "hero": "overlay",
    "sponsor": "branded",
    "accent": "#D20000",
    "typeScale": 1
  }/*EDITMODE-END*/;

  function App() {
    const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
    const Layout = LAYOUTS[t.layout] || EditorialLayout;

    const rootStyle = {
      "--accent": t.accent,
      "--type-scale": String(t.typeScale),
    };

    return (
      <div className="fac-root" style={rootStyle}>
        <Masthead onMenu={() => {}} onSearch={() => {}} />
        <SectionNav
          sections={["Home", "Markets", "Companies", "Property", "Technology", "Opinion", "The Life"]}
          active="The Life"
          onSelect={() => {}}
        />

        <SponsorStrip intensity={t.layout === "showcase" && t.sponsor === "subtle" ? "branded" : t.sponsor} />

        <Layout t={t} />

        <Footer tagline="Premium business journalism for New Zealand." />

        <TweaksPanel title="Tweaks">
          <TweakSection label="Layout" />
          <TweakRadio label="Page layout" value={t.layout}
            options={[
              { value: "editorial", label: "Editorial" },
              { value: "spec", label: "Spec sheet" },
              { value: "showcase", label: "Showcase" },
            ]}
            onChange={(v) => setTweak("layout", v)} />
          <TweakRadio label="Hero" value={t.hero}
            options={[
              { value: "overlay", label: "Image overlay" },
              { value: "split", label: "Split" },
            ]}
            onChange={(v) => setTweak("hero", v)} />

          <TweakSection label="Sponsorship" />
          <TweakRadio label="Tourism Fiji branding" value={t.sponsor}
            options={[
              { value: "subtle", label: "Subtle" },
              { value: "branded", label: "Branded strip" },
            ]}
            onChange={(v) => setTweak("sponsor", v)} />

          <TweakSection label="Style" />
          <TweakColor label="Accent" value={t.accent}
            options={["#D20000", "#11B1BB", "#058BD7", "#52AA34"]}
            onChange={(v) => setTweak("accent", v)} />
          <TweakSlider label="Type scale" value={t.typeScale} min={0.9} max={1.2} step={0.05}
            onChange={(v) => setTweak("typeScale", v)} />
        </TweaksPanel>
      </div>
    );
  }

  const root = ReactDOM.createRoot(document.getElementById("root"));
  root.render(<App />);
})();
