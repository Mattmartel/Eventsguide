/* Search page — functional filtering over the venue dataset.
   Layouts: sidebar filters / top filter bar. Loaded as Babel JSX. */
(function () {
  const DS = window.BusinessDeskDesignSystem_eb7d20 || {};
  const { Button } = DS;
  const { Chrome, GuideFooter, VenueCard, SearchBar, Kick, HeroGrid, MrecAd } = window;
  const { useTweaks, TweaksPanel, TweakSection, TweakRadio, TweakColor, TweakSlider } = window;
  const G = window.GUIDE;
  const venues = G.venues;

  const initialQ = (function () {
    try { return new URLSearchParams(window.location.search).get("q") || ""; } catch (e) { return ""; }
  })();

  const CAP_STEPS = [0, 500, 1000, 2000, 4000];
  const regionCount = (r) => venues.filter((v) => v.region === r).length;
  const typeCount = (t) => venues.filter((v) => v.type === t).length;

  function matches(v, s) {
    if (s.q) {
      const hay = (v.name + " " + v.location + " " + v.region + " " + v.type).toLowerCase();
      if (!hay.includes(s.q.toLowerCase())) return false;
    }
    if (s.regions.length && s.regions.indexOf(v.region) < 0) return false;
    if (s.types.length && s.types.indexOf(v.type) < 0) return false;
    if (v.capacity < s.minCap) return false;
    if (v.rooms < s.minRooms) return false;
    for (const f of Object.keys(s.facets)) { if (s.facets[f] && !v.facets[f]) return false; }
    return true;
  }

  /* ---- filter controls --------------------------------------------------- */
  function SidebarFilters(props) {
    const s = props.s, set = props.set;
    const toggleArr = (key, val) => {
      const arr = s[key].slice();
      const i = arr.indexOf(val);
      if (i < 0) arr.push(val); else arr.splice(i, 1);
      set(key, arr);
    };
    return (
      <div className="sr-filters is-rail">
        <div className="sr-filters-head"><Kick>Filters</Kick><button className="sr-clear" onClick={props.clear}>Clear all</button></div>

        <div className="sr-facet">
          <p className="sr-facet-label">Region</p>
          {G.regions.map((r) => (
            <label className="sr-opt" key={r}>
              <input type="checkbox" checked={s.regions.indexOf(r) >= 0} onChange={() => toggleArr("regions", r)} />
              <span>{r}</span><span className="ct">{regionCount(r)}</span>
            </label>
          ))}
        </div>

        <div className="sr-facet">
          <p className="sr-facet-label">Venue type</p>
          {G.types.map((t) => (
            <label className="sr-opt" key={t}>
              <input type="checkbox" checked={s.types.indexOf(t) >= 0} onChange={() => toggleArr("types", t)} />
              <span>{t}</span><span className="ct">{typeCount(t)}</span>
            </label>
          ))}
        </div>

        <div className="sr-facet">
          <p className="sr-facet-label">Capacity</p>
          <div className="sr-range-val">{s.minCap ? "From " + G.fmt(s.minCap) + " delegates" : "Any capacity"}</div>
          <input className="sr-range" type="range" min="0" max="4500" step="100" value={s.minCap}
            onChange={(e) => set("minCap", Number(e.target.value))} />
        </div>

        <div className="sr-facet">
          <p className="sr-facet-label">Meeting rooms</p>
          <div className="sr-range-val">{s.minRooms ? "From " + s.minRooms + " rooms" : "Any"}</div>
          <input className="sr-range" type="range" min="0" max="33" step="1" value={s.minRooms}
            onChange={(e) => set("minRooms", Number(e.target.value))} />
        </div>

        <div className="sr-facet">
          <p className="sr-facet-label">Features</p>
          {Object.keys(G.facetLabels).map((f) => (
            <label className="sr-opt" key={f}>
              <input type="checkbox" checked={!!s.facets[f]} onChange={() => set("facets", Object.assign({}, s.facets, { [f]: !s.facets[f] }))} />
              <span>{G.facetLabels[f]}</span>
            </label>
          ))}
        </div>
      </div>
    );
  }

  function TopbarFilters(props) {
    const s = props.s, set = props.set;
    return (
      <div className="sr-topbar">
        <select className="sr-chip-select" value={s.regions[0] || ""} onChange={(e) => set("regions", e.target.value ? [e.target.value] : [])}>
          <option value="">All regions</option>
          {G.regions.map((r) => <option key={r} value={r}>{r}</option>)}
        </select>
        <select className="sr-chip-select" value={s.types[0] || ""} onChange={(e) => set("types", e.target.value ? [e.target.value] : [])}>
          <option value="">All venue types</option>
          {G.types.map((t) => <option key={t} value={t}>{t}</option>)}
        </select>
        <select className="sr-chip-select" value={s.minCap} onChange={(e) => set("minCap", Number(e.target.value))}>
          {CAP_STEPS.map((c) => <option key={c} value={c}>{c ? G.fmt(c) + "+ delegates" : "Any capacity"}</option>)}
        </select>
        {Object.keys(G.facetLabels).map((f) => (
          <button key={f} className={"sr-toggle-chip " + (s.facets[f] ? "on" : "")}
            onClick={() => set("facets", Object.assign({}, s.facets, { [f]: !s.facets[f] }))}>
            {G.facetLabels[f]}
          </button>
        ))}
      </div>
    );
  }

  function ActiveChips(props) {
    const s = props.s, set = props.set;
    const chips = [];
    if (s.q) chips.push({ k: "q", label: '“' + s.q + '”', clear: () => set("q", "") });
    s.regions.forEach((r) => chips.push({ k: "r" + r, label: r, clear: () => set("regions", s.regions.filter((x) => x !== r)) }));
    s.types.forEach((t) => chips.push({ k: "t" + t, label: t, clear: () => set("types", s.types.filter((x) => x !== t)) }));
    if (s.minCap) chips.push({ k: "cap", label: G.fmt(s.minCap) + "+ delegates", clear: () => set("minCap", 0) });
    if (s.minRooms) chips.push({ k: "rm", label: s.minRooms + "+ rooms", clear: () => set("minRooms", 0) });
    Object.keys(s.facets).forEach((f) => { if (s.facets[f]) chips.push({ k: f, label: G.facetLabels[f], clear: () => set("facets", Object.assign({}, s.facets, { [f]: false })) }); });
    if (!chips.length) return null;
    return (
      <div className="sr-active">
        {chips.map((c) => <span className="sr-active-chip" key={c.k}>{c.label}<button onClick={c.clear} aria-label="Remove">×</button></span>)}
      </div>
    );
  }

  /* ---- app --------------------------------------------------------------- */
  const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
    "layout": "sidebar",
    "cardStyle": "photo",
    "sponsor": "branded",
    "accent": "#D20000",
    "typeScale": 1
  }/*EDITMODE-END*/;

  function App() {
    const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
    const [s, setS] = React.useState({
      q: initialQ, regions: [], types: [], minCap: 0, minRooms: 0,
      facets: { accommodation: false, catering: false, av: false, accessibility: false, sustainability: false },
    });
    const set = (k, v) => setS((prev) => Object.assign({}, prev, { [k]: v }));
    const clear = () => setS({ q: "", regions: [], types: [], minCap: 0, minRooms: 0,
      facets: { accommodation: false, catering: false, av: false, accessibility: false, sustainability: false } });

    const results = venues.filter((v) => matches(v, s));
    const rootStyle = { "--accent": t.accent, "--type-scale": String(t.typeScale) };
    const sidebar = t.layout === "sidebar";
    const resultCols = t.cardStyle === "data" ? (sidebar ? 1 : 2) : 3;

    return (
      <div className="fac-root" style={rootStyle}>
        <Chrome sponsor={t.sponsor} />

        <div className="sr-head">
          <Kick>Conference Venue Guide</Kick>
          <h1 className="sr-title">Find a venue</h1>
        </div>
        <div className="sr-bar">
          <SearchBar value={s.q} placeholder="Search by name, city or capacity…" onSubmit={(q) => set("q", q)} />
        </div>

        <div className={"sr-layout " + (sidebar ? "is-sidebar" : "is-topbar")}>
          {sidebar ? <SidebarFilters s={s} set={set} clear={clear} /> : null}
          <div className="sr-results">
            {!sidebar ? <TopbarFilters s={s} set={set} /> : null}
            <div className="sr-toolbar">
              {(s.regions.length || s.types.length || s.minCap || s.minRooms || s.q || Object.values(s.facets).some(Boolean)) ? (
                <span className="sr-count"><b>{results.length}</b> {results.length === 1 ? "venue matches" : "venues match"} your search{s.q ? " for “" + s.q + "”" : ""}</span>
              ) : (
                <span className="sr-count">Browse <b>100+</b> conference &amp; event venues for hire across New Zealand &amp; Fiji — compare capacity, meeting rooms, catering and accommodation.</span>
              )}
              {(s.regions.length || s.types.length || s.minCap || s.minRooms || Object.values(s.facets).some(Boolean)) ?
                <button className="sr-clear" onClick={clear}>Clear filters</button> : null}
            </div>
            <ActiveChips s={s} set={set} />
            {results.length ? (
              <div className={"gd-grid cols-" + resultCols}>
                {results.map((v, i) => {
                  const adAfter = resultCols * 2; // between results row 2 and 3
                  const cells = [<VenueCard key={v.id} venue={v} cardStyle={t.cardStyle} standfirst={t.cardStyle === "photo"} />];
                  if (i + 1 === adAfter && results.length > adAfter) {
                    cells.push(
                      <div className="sr-adrow" key="sr-ad">
                        <span className="gd-ad-label">Advertisement</span>
                        {React.createElement("image-slot", { id: "ad-mrec-search", placeholder: "MREC · 300 × 250", shape: "rect",
                          style: { display: "block", width: "300px", height: "250px", maxWidth: "100%" } })}
                      </div>
                    );
                  }
                  return cells;
                })}
              </div>
            ) : (
              <div className="sr-empty">No venues match these filters. <button className="sr-clear" onClick={clear}>Reset</button></div>
            )}
          </div>
        </div>

        <GuideFooter />

        <TweaksPanel title="Tweaks">
          <TweakSection label="Layout" />
          <TweakRadio label="Filters" value={t.layout}
            options={[{ value: "sidebar", label: "Sidebar" }, { value: "topbar", label: "Top bar" }]}
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
