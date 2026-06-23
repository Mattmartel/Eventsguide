# BusinessDesk Design System

A design system for **BusinessDesk**, the premium business-news masthead owned by
**NZME** (New Zealand Media and Entertainment) — the same stable as the *NZ Herald*
and the regional mastheads (Bay of Plenty Times, Waikato Herald, Rotorua Daily Post,
Northern Advocate, Whanganui Chronicle, The Country, Hawke's Bay Today, etc.).

BusinessDesk is a **subscriber-funded, premium business journalism** product: markets
coverage (NZX / ASX), companies, investments, property, energy, finance, technology,
opinion and "The Life". The interface is a serious, editorial news website — dense,
text-led, fast-scanning — wrapped in a confident black-and-red masthead.

> Source of truth: the Figma file **"BusinessDesk Standalone Website.fig"** (mounted
> read-only during authoring). Pages covered: Homepage, Article (standard / opinion /
> sponsored / advertorial), Markets (NZX / ASX), Company Profile, Announcements (NZX),
> Authors, Video, Search, Navigation, Subscription & Registration, Customer Management
> Portal. The file carries a 392-variable Figma Variable collection with a **BusinessDesk**
> theme mode and an **NZH** mode; this system materializes the BusinessDesk theme as default.

---

## CONTENT FUNDAMENTALS — how BusinessDesk writes

**Voice.** Authoritative, plain-spoken business journalism for a professional NZ audience.
Headlines state the news directly, often with a dollar figure or a named company, and lean
on a colon or a quoted phrase:

- *"'Meth' ministry moves: staffing data sought for four-way merger"*
- *"Migration slump deepens as record numbers of Kiwis head overseas"*
- *"Fletcher Building targets further \$100m savings in big cuts"*
- *"'Positioned for growth': Precinct seeks \$310m to expand property portfolio"*
- *"Zespri targets 'world's healthiest fruit brand'"*

**Conventions.**
- **Third person, no "you".** Reportage, not marketing. The newsroom never addresses the
  reader as "you" in editorial copy. (Product/subscription UI *does* — "Personalise your news".)
- **NZ English & NZ idiom** — "Kiwis", "Govt", local place names; figures in NZ\$.
- **Sentence case** for headlines and standfirsts (not title case). UI labels are sentence
  case too ("See full details", "Personalise your news").
- **Kickers / categories in UPPERCASE** small caps with tracking ("OPINION", "MARKETS",
  "LIVE", "PREMIUM").
- **Standfirst / deck** — one short sentence under the headline, muted, summarising the story.
- **Bylines** — "By [Author Name]", with timestamp ("08 Apr 07:07 AM") and read-time.
- **No emoji, ever**, in editorial or UI. Tone is sober and trustworthy.
- **Premium signalling** — gold "Premium" pill on subscriber-only stories; gold star rating
  glyphs appear on some cards. "Live" = red pill for live coverage. "Sponsored by …" /
  "Sponsored" for commercial content, always clearly labelled.
- **Numbers & markets** — indices like "S&P/NZX 50", "S&P/ASX 200"; deltas coloured
  green (up) / red (down) with sign and percentage: "+1.75 (0.01%)".

---

## VISUAL FOUNDATIONS

**Palette.** Monochrome editorial core + a single hot brand red.
- **BusinessDesk red `#D20000`** — the brand accent: top masthead stripe, links, live tags,
  category=Opinion, chart primary, market-down. Hover `#B80101`, press `#9C0000`.
- **Black `#000` / charcoal `#151515` / `#1E1E1E`** — header, footer, text, hard borders.
- **White `#FFF`** — page and card surfaces. Cool grey `#F3F6F8` and `#F5F5F5` for section bands.
- **Premium gold `#F7B238`** (text `#E08F00`) — the subscriber/premium accent + star ratings.
- **Market up green `#029022` / down red `#D20000`.** Opinion blue `#3AA8DD`.
- **Category colours** — each section owns a hue: Companies indigo `#445DD4`, Energy orange
  `#EC7016`, Finance green `#079C54`, Investments amber `#EC9C01`, Markets pink `#EF496F`,
  Property green `#52AA34`, Technology violet `#794BDA`, World blue `#058BD7`, The Life teal
  `#11B1BB`, Primary Industries `#B6744F`, Public Sector slate `#636F7B`.

**Type.** A serif/sans split that signals "newspaper".
- **Headlines & article body = serif.** Production uses Klim's **Feature Text App** (display
  headlines) and **Tiempos Text** (long-form body). Substituted here with **Newsreader**
  (headlines) and **Source Serif 4** (body) from Google — *see Caveats; swap for licensed
  faces in production.*
- **UI, labels, metadata, nav = Inter** (sans). Kickers/eyebrows are Inter, uppercase, tracked.
- **Scale** (tight leading on heads): 32 / 28 / 26 / 24 / 20 / 18 / 16 / 14. Body 24→12.
  Bold weight is **650**, not 700.

**Layout.** Wide editorial grid (desktop ~1280–1536). Multi-column homepage: hero lead +
secondary column + "News in Brief" rail. Generous whitespace between cards; hairline rules
divide stories. Fixed black header (red 4px stripe on top) + a horizontal section nav that
sticks. Market ticker band sits directly under the header.

**Cards.** Overwhelmingly **square corners** (radius 0–2px) and **hairline borders / rules**
rather than drop shadows — this reads as print, not app. Card archetypes from the file:
*Image-text-below*, *Headline-only*, *Headline + square image left*, *Hero text-below*,
*Hero portrait*. Pills (badges, chips, some buttons) are the exception and use full rounding.

**Borders & shadows.** Hairlines everywhere: `rgba(0,0,0,.1)` soft, `rgba(0,0,0,.15)` medium,
`#000` hard. Shadows are rare and shallow when used (popovers/menus). Cards prefer a 1px rule.

**Buttons.** Pill-shaped. Outline (1px hard border, transparent fill) is the workhorse on
white; filled-dark and filled-red for primary actions; an inverted set for dark surfaces.
Sizes sm / md / lg. Hover = subtle shade overlay (`rgba(0,0,0,.05–.15)`); press = deeper
shade; disabled = `rgba(0,0,0,.1)`. Focus = teal focus ring `rgba(19,166,186,.5)`.

**Imagery.** Real editorial photography — news, portraits (author headshots), property,
markets. Full-colour, documentary, no filters or duotones. Hero images often carry a
gradient scrim with the headline overlaid in white. Author avatars are circular.

**Motion.** Minimal and functional — short fades and simple expand/collapse on menus,
accordions and the personalise tray. No bounce, no decorative loops. Respect reduced-motion.

**Interaction colour states** (token-backed): hover/press use translucent black shades on
light surfaces and translucent white tints on dark surfaces; focus uses the teal accent ring.

---

## ICONOGRAPHY

- **Custom line-icon set**, two styles — **outline** (default, ~1.5px stroke) and **filled** —
  each in **sm** and **lg** sizes. Materialized to `assets/icons/icon-data.js` and rendered via
  `assets/icons/Icon.jsx` (`<Icon name="…" size={20} />`). Icons paint with `currentColor`.
- Coverage in this system: chevrons (up/down/left/right), arrows, check / circle-check,
  bookmark (+ add / remove), camera, clock, comment / comment-counter, email, external-link,
  flag, bell-with-notification, audio (headphones / speaker / speaker-off / closed-captions),
  card-payment, and brand glyphs (Facebook, Bluesky, Apple). See `assets/icons/Icon.d.ts`
  for the exact name list.
- **No emoji.** No reliance on unicode dingbats. Star ratings use a gold star glyph; the
  "Live" indicator is a red pill, not an icon.
- **Logos** (`assets/logos/`): `businessdesk-wordmark.svg` (the serif "BusinessDesk."
  wordmark, `currentColor` so it inverts black↔white) and `nzh-masthead.svg` (NZ Herald
  masthead, present because BusinessDesk sits within the NZME network). The BusinessDesk red
  square + monogram appears as the favicon/app mark.

---

## INDEX — what's in this folder

**Foundations**
- `styles.css` — global entry (import this). Imports everything below.
- `tokens/fig-tokens.css` — raw Figma Variables (495 tokens, BusinessDesk theme).
- `tokens/colors.css` — friendly brand colour aliases (`--bd-red`, `--surface-*`, `--text-*`…).
- `tokens/typography.css` — type scale + `.bd-headline / .bd-body / .bd-kicker / .bd-meta`.
- `tokens/fonts.css` — webfont @imports + family aliases.

**Assets**
- `assets/logos/` — BusinessDesk wordmark, NZH masthead.
- `assets/icons/` — `Icon.jsx`, `icon-data.js`, `Icon.d.ts`.

**Components** (`components/<group>/`) — see each `.prompt.md`:
- `components/core/` — Button, Badge, Tag, Pill, Avatar, Divider, StarRating.
- `components/forms/` — Input, Checkbox, Radio, Switch, Select.
- `components/feedback/` — Alert, Toast.
- `components/navigation/` — Masthead, SectionNav, MarketTicker, Footer.
- `components/content/` — ArticleCard, Kicker, Byline, CommentBlock.

**UI kit**
- `ui_kits/businessdesk-website/` — interactive recreation of the BusinessDesk site
  (homepage, article, markets, subscription).

**Specimen cards** — small `.html` files tagged `@dsCard` populate the Design System tab.

See `SKILL.md` for using this system as a downloadable Agent Skill.

---

## CAVEATS
- **Fonts substituted.** Production uses licensed Klim faces (Feature Text App, Tiempos
  Text, Söhne, Circular Std). This system ships Google substitutes (Newsreader, Source
  Serif 4, Inter). Provide the licensed font files to make it pixel-exact.
- Per-character styles, deep nested instance swaps and some variable aliases are
  approximations from the Figma reconstruction; precise values were taken from tokens where
  available.
