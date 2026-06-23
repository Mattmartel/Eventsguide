/* Homepage — editorial hub for the conference facilities guide.
   Layouts: editorial (featured + rails) / grid / index. Loaded as Babel JSX. */
(function () {
  const { Chrome, GuideFooter, FeaturedHero, Rail, VenueCard, PickCard, SearchBar, Kick, HeroGrid, EdLead, EdHeroLead, EdArticle, EdText, HighlightVenue, AdSlot, MrecAd } = window;
  const { useTweaks, TweaksPanel, TweakSection, TweakRadio, TweakColor, TweakSlider } = window;
  const G = window.GUIDE;

  const venues = G.venues;
  const featured = venues.find((v) => v.featured) || venues[0];
  const conv = venues.filter((v) => v.type === "Convention centre" && !v.featured);
  const resortsHotels = venues.filter((v) => v.type === "Resort" || v.type === "Hotel");
  const picks = [venues.find((v) => v.id === "sheraton"), venues.find((v) => v.id === "te-pae"), venues.find((v) => v.id === "claudelands")].filter(Boolean);
  const articles = G.articles || [];
  const byId = (id) => venues.find((v) => v.id === id);
  const highlights = ["sofitel", "sheraton", "nzicc", "te-pae"].map(byId).filter(Boolean);
  const holiday = ["sofitel", "sheraton", "ic-fiji", "millbrook", "hilton-qt", "crowne-qt"].map(byId).filter(Boolean);

  function SearchModule() {
    return (
      <div className="gd-home-search">
        <div className="gd-home-search-inner">
          <div className="gd-home-search-copy">
            <Kick>Find a venue</Kick>
            <h2>Search 150 conference venues to find your best event options</h2>
          </div>
          <SearchBar variant="hero" placeholder="Search by name, city or capacity…" />
        </div>
      </div>
    );
  }

  function EditorialLayout(props) {
    const lead = articles[0];
    const imageStories = articles.slice(1, 3);
    const textStories = articles.slice(3);
    const railVenues = ["sofitel", "sheraton", "nzicc"].map(byId).filter(Boolean);
    return (
      <div data-screen-label="Home — editorial">
        <SearchModule />
        <div className="gd-home-body">
          <section className="gd-edgrid">
            <div className="gd-ed-main">
              {lead ? <EdHeroLead article={lead} /> : null}
              <div className="gd-ed-cols">
                <div className="gd-edcol">
                  {imageStories.map((a) => <EdArticle key={a.id} article={a} />)}
                </div>
                <div className="gd-edcol">
                  {textStories.map((a) => <EdText key={a.id} article={a} />)}
                </div>
              </div>
            </div>
            <aside className="gd-ed-rail">
              <AdSlot />
              <div className="gd-hl-block">
                <header className="gd-rail-head"><div><Kick>Highlighted venues</Kick></div></header>
                <div className="gd-rail-cards">
                  {railVenues.map((v) => <VenueCard key={v.id} venue={v} cardStyle="photo" />)}
                </div>
              </div>
            </aside>
          </section>
          <MrecAd id="ad-mrec-1" />
          <section>
            <header className="gd-rail-head">
              <div><Kick>Extend your stay</Kick><h2 className="fac-h2">Venues for a holiday after the convention</h2></div>
              <a className="gd-rail-link" href={window.SEARCH_HREF}>Browse all ›</a>
            </header>
            <div className="gd-grid cols-3">
              {holiday.map((v) => <VenueCard key={v.id} venue={v} cardStyle="photo" />)}
            </div>
          </section>
        </div>
      </div>
    );
  }

  function GridLayout(props) {
    const cs = props.t.cardStyle;
    return (
      <div data-screen-label="Home — grid">
        <SearchModule />
        <div className="gd-home-body">
          <section className="gd-home-picks">
            <header className="gd-rail-head">
              <div><Kick>All venues</Kick><h2 className="fac-h2">Browse every venue</h2></div>
              <a className="gd-rail-link" href={window.SEARCH_HREF}>Open search ›</a>
            </header>
            <div className="gd-grid cols-3">
              {venues.map((v) => <VenueCard key={v.id} venue={v} cardStyle={cs} standfirst={cs === "photo"} />)}
            </div>
          </section>
        </div>
      </div>
    );
  }

  function IndexLayout() {
    return (
      <div data-screen-label="Home — index">
        <SearchModule />
        <div className="gd-home-body">
          <Rail kicker="A–Z" title="All venues" venues={venues} cols={1} cardStyle="data" />
        </div>
      </div>
    );
  }

  const LAYOUTS = { editorial: EditorialLayout, grid: GridLayout, index: IndexLayout };

  const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
    "layout": "editorial",
    "cardStyle": "photo",
    "sponsor": "branded",
    "accent": "#D20000",
    "typeScale": 1
  }/*EDITMODE-END*/;

  function App() {
    const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
    const Layout = LAYOUTS[t.layout] || EditorialLayout;
    const rootStyle = { "--accent": t.accent, "--type-scale": String(t.typeScale) };
    return (
      <div className="fac-root" style={rootStyle}>
        <Chrome sponsor={t.sponsor} />
        <Layout t={t} />
        <GuideFooter />
        <TweaksPanel title="Tweaks">
          <TweakSection label="Layout" />
          <TweakRadio label="Homepage" value={t.layout}
            options={[{ value: "editorial", label: "Editorial" }, { value: "grid", label: "Grid" }, { value: "index", label: "Index" }]}
            onChange={(v) => setTweak("layout", v)} />
          <TweakRadio label="Card style" value={t.cardStyle}
            options={[{ value: "photo", label: "Photo-led" }, { value: "data", label: "Data-led" }]}
            onChange={(v) => setTweak("cardStyle", v)} />
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
