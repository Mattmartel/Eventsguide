/* NZICC facility content — sourced from nzicc.co.nz and public listings.
   Attaches to window.NZICC. Plain JS (no JSX). */
(function () {
  window.NZICC = {
    name: "New Zealand International Convention Centre",
    shortName: "NZICC",
    kicker: "Conference Venue Guide",
    region: "Auckland, New Zealand",
    standfirst:
      "Purpose-built in the heart of Tāmaki Makaurau Auckland's CBD, NZICC brings scale, sustainability and cultural identity together across 33 flexible spaces — from a 2,852-seat theatre to the country's largest indoor exhibition hall.",
    intro: [
      "Opened in 2026, the New Zealand International Convention Centre is the country's largest conference, exhibition and entertainment venue, designed for flexibility and connection. A vertically stacked building across four levels, it transitions delegates effortlessly between plenary, exhibition, pre-function, banquet and performance spaces.",
      "Just steps from Auckland's dining, accommodation and entertainment precincts — and linked to the city by a public laneway and integrated atrium — NZICC pairs world-class facilities with the energy of a waterfront city. Glazed facades open views from the Waitematā Harbour to the Waitākere Ranges.",
    ],
    quote: {
      text:
        "NZICC's modern design and world-class facilities make it an exceptional venue for hosting international events. I believe it will significantly boost the business events industry in New Zealand.",
      attribution: "Juan José García, Chief Sales & Marketing Officer, BCO Congresos",
    },
    stats: [
      { value: "4,500", label: "Max delegates" },
      { value: "33", label: "Meeting rooms" },
      { value: "2,852", label: "Seat theatre" },
      { value: "8,000+", label: "Hotel rooms nearby" },
    ],
    glance: [
      ["Location", "Hobson & Wellesley Streets, Auckland CBD"],
      ["From airport", "Approx. 40 minutes by road"],
      ["Total spaces", "33 flexible spaces over four levels"],
      ["Largest hall", "Ariki Hall — 6,674 m² divisible"],
      ["Opened", "2026 · operated by SkyCity"],
      ["Accreditation", "Qualmark Gold · EarthCheck Silver"],
    ],
    // Capacity matrix
    spaces: [
      {
        name: "Te Paepae Theatre",
        area: "—",
        blurb:
          "New Zealand's largest seated theatre. Divides into two independent theatres of 1,235; retractable seating converts it to a flat floor for banquets and cocktail events.",
        theatre: "2,852",
        banquet: "—",
        cocktail: "—",
        exhibition: "—",
      },
      {
        name: "Ariki Hall",
        area: "6,674 m²",
        blurb:
          "Auckland's largest indoor exhibition space, divisible into three column-free halls with a 9 m central ceiling and direct truck access off Hobson Street.",
        theatre: "—",
        banquet: "3,300",
        cocktail: "4,500",
        exhibition: "400 booths",
      },
      {
        name: "Te Waha",
        area: "1,140 m²",
        blurb:
          "Iconic Level 5 setting with panoramic city and harbour views. Divisible into twin theatres or reconfigured for banquets and cocktail receptions.",
        theatre: "—",
        banquet: "840",
        cocktail: "840",
        exhibition: "—",
      },
      {
        name: "Te Wharau",
        area: "556 m²",
        blurb:
          "An elegant, light-filled gallery with its own entrance on Wellesley Street — ideal for pre-functions, mid-sized events and receptions.",
        theatre: "—",
        banquet: "445",
        cocktail: "445",
        exhibition: "—",
      },
      {
        name: "Meeting Rooms",
        area: "Various",
        blurb:
          "Thirty-three meeting and breakout spaces spread across four levels, with movable walls — suited to groups of 20 or more, from board meetings to training.",
        theatre: "20+",
        banquet: "—",
        cocktail: "—",
        exhibition: "—",
      },
    ],
    // Detail field blocks
    fields: [
      {
        key: "location",
        title: "Location & getting here",
        body:
          "In the heart of Auckland's CBD on Hobson and Wellesley Streets, surrounded by universities, research institutions and corporate hubs. Well served by public transport, with on-site parking and a vibrant laneway linking the centre to the city.",
        items: [
          "Approx. 40 minutes from Auckland Airport",
          "On-site parking, accessible from Wellesley Street",
          "Walking distance to rail, ferry and bus links",
        ],
      },
      {
        key: "rooms",
        title: "Rooms & breakout spaces",
        body:
          "A footprint of more than 30,000 m² holds 33 flexible spaces across four levels. Movable walls let larger rooms divide into modules, so the venue adapts from intimate meetings of 20 to conventions of 4,500.",
        items: [
          "Te Paepae Theatre — 2,852 seats (or 2 × 1,235)",
          "Ariki Hall — 6,674 m², up to 400 exhibition booths",
          "Te Waha — 1,140 m² with harbour views",
          "Te Wharau — 556 m² pre-function gallery",
        ],
      },
      {
        key: "catering",
        title: "Catering & dining",
        body:
          "In-house culinary teams deliver world-class cuisine with a distinctly New Zealand accent, built on seasonal produce and a commitment to the Tiaki Promise. Beyond the venue, more than 750 dining options sit within a short walk.",
        items: [
          "Full in-house banquet and conference catering",
          "Seasonal, sustainably sourced New Zealand menus",
          "750+ cafés and restaurants within walking distance",
        ],
      },
      {
        key: "accommodation",
        title: "Accommodation",
        body:
          "Over 8,000 hotel rooms sit within a short walk of the centre, from luxury towers to serviced apartments — including SkyCity's adjacent hotels — so delegates can stay minutes from the plenary floor.",
        items: [
          "8,000+ hotel rooms within walking distance",
          "Adjacent SkyCity hotel precinct",
          "Options across luxury, business and budget tiers",
        ],
      },
      {
        key: "av",
        title: "AV & technical production",
        body:
          "State-of-the-art audio-visual infrastructure is supplied and operated by in-house experts NW Group, a leading full-service technical production company working across corporate, arts and special projects.",
        items: [
          "In-house technical production by NW Group",
          "Integrated AV, staging, lighting and rigging",
          "Exceptional theatre acoustics and broadcast capability",
        ],
      },
      {
        key: "accessibility",
        title: "Accessibility",
        body:
          "Designed with accessibility at its core — from step-free entrances on Hobson and Nelson Streets to wheelchair seating in the theatre, accessible and gender-neutral bathrooms on multiple levels, and features for vision- and hearing-impaired guests.",
        items: [
          "Step-free entrances and inclusive parking",
          "Wheelchair seating throughout the theatre",
          "Intuitive wayfinding and assistive technology",
        ],
      },
      {
        key: "environment",
        title: "Environmental credentials",
        body:
          "Sustainability and cultural excellence are built in. The venue holds EarthCheck Silver and Qualmark Gold accreditation, and every event is shaped by the Tiaki Promise to care for people and place.",
        items: [
          "EarthCheck Silver 2026",
          "Qualmark Gold sustainable tourism award",
          "Guided by the Tiaki Promise",
        ],
      },
      {
        key: "nearby",
        title: "Nearby attractions",
        body:
          "Auckland's waterfront, Sky Tower, Viaduct Harbour and Wynyard Quarter are minutes away, with galleries, the Waitematā Harbour and day trips to Waiheke Island rounding out the delegate experience.",
        items: [
          "Sky Tower & Viaduct Harbour",
          "Auckland Art Gallery and waterfront precincts",
          "Ferry day trips to Waiheke Island",
        ],
      },
    ],
    pricing: {
      note:
        "Pricing is tailored to each event. Day-delegate packages, room hire and bespoke catering quotes are prepared by the events team on enquiry.",
      rows: [
        ["Meeting rooms (½ day)", "From POA"],
        ["Day-delegate package", "From POA"],
        ["Full venue / multi-day", "Custom quote"],
      ],
    },
    contact: {
      sales: "Business Events team",
      phone: "+64 9 000 0000",
      email: "events@nzicc.co.nz",
      web: "nzicc.co.nz",
      address: "Hobson Street, Auckland CBD 1010, New Zealand",
    },
    gallery: [
      { id: "gal-1", label: "Drop: theatre / plenary" },
      { id: "gal-2", label: "Drop: exhibition hall" },
      { id: "gal-3", label: "Drop: pre-function gallery" },
      { id: "gal-4", label: "Drop: banquet setup" },
      { id: "gal-5", label: "Drop: meeting room" },
      { id: "gal-6", label: "Drop: city / exterior" },
    ],
    video: {
      src:
        "https://sceg-ws-brochure-media-cdne-prd.azureedge.net/v3od2054/nzicc-new-zealand-international-convention-centre-homepage-video.mp4",
      caption: "Inside NZICC — a first look at the spaces.",
    },
  };
})();
