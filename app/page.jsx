"use client";

import { useEffect, useRef, useState } from "react";

const TEL = "+8615821069064";
const TEL_DISPLAY = "+86 158 2106 9064";
const WA = "393335788520";
const WA_DISPLAY = "+39 333 578 8520";
const EMAIL = "frizzale.nicola@icloud.com";

const waLink = (msg = "Hello Nicola, I'd like to enquire about a booking.") =>
  `https://wa.me/${WA}?text=${encodeURIComponent(msg)}`;

const DISHES = [
  { n: "I", img: "dish-tartare.jpg", title: "Tartare, tuorlo, tartufo", en: "Hand-cut beef, cured yolk, black truffle shaved at the table." },
  { n: "II", img: "dish-langoustine.jpg", title: "Scampi, gelée verde", en: "Raw scampi under a clear herb jelly, garden flowers." },
  { n: "III", img: "dish-caviar.jpg", title: "Orto & caviale", en: "Green vegetables at their best, a warm sauce, caviar for salt." },
  { n: "IV", img: "dish-carpaccio.jpg", title: "Carpaccio di manzo", en: "The classic, sliced thin and dressed simply." },
  { n: "V", img: "dish-tenderloin.jpg", title: "Filetto, finferli", en: "Rested and sliced rare, chanterelles, charcoal salt." },
  { n: "VI", img: "dish-milanese.jpg", title: "Milanese al tartufo", en: "Bone-in veal fried in butter, black truffle over the top." },
  { n: "VII", img: "dessert-rose.jpg", title: "Rosa di mela", en: "Apple rose, gold leaf, salted-caramel ice cream." },
];

const EXPERIENCES = [
  {
    img: "dish-pour.jpg", k: "01", title: "Private dinner", it: "Cena privata",
    body: "A tasting menu cooked and served in your home or villa. Shopping, service and clean-down handled.",
    meta: "2 – 12 guests",
    msg: "Hello Nicola, I'd like to enquire about a private dinner.",
  },
  {
    img: "chef-plating-2.jpg", k: "02", title: "Chef's table", it: "Tavola dello chef",
    body: "An evening at the pass. Course by course, cooked in front of the table and talked through.",
    meta: "Up to 10 guests",
    msg: "Hello Nicola, I'd like to enquire about a chef's table evening.",
  },
  {
    img: "spread-picnic.jpg", k: "03", title: "Events & consulting", it: "Eventi",
    body: "Off-site events, pop-ups, menu consulting and kitchen collaborations with restaurants and hotels.",
    meta: "On request",
    msg: "Hello Nicola, I'd like to enquire about an event / collaboration.",
  },
];

const GALLERY = [
  { img: "dessert-parisbrest.jpg", alt: "A round pastry dusted with icing sugar on slate" },
  { img: "dish-extra-2.jpg", alt: "Plated dish" },
  { img: "focaccia.jpg", alt: "Tomato and olive focaccia" },
  { img: "dish-extra-7.jpg", alt: "Plated dish" },
  { img: "dish-extra-4.jpg", alt: "Plated dish" },
  { img: "dish-extra-10.jpg", alt: "Plated dish" },
  { img: "dish-extra-5.jpg", alt: "Plated dish" },
  { img: "dish-extra-6.jpg", alt: "Plated dish" },
  { img: "dish-extra-8.jpg", alt: "Plated dish" },
  { img: "dish-extra-3.jpg", alt: "Plated dish" },
  { img: "dish-extra-1.jpg", alt: "Plated dish" },
  { img: "dish-extra-9.jpg", alt: "Plated dish" },
];

const WaIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M17.47 14.38c-.3-.15-1.75-.86-2.02-.96-.27-.1-.47-.15-.67.15-.2.3-.77.96-.94 1.16-.17.2-.35.22-.64.07-.3-.15-1.25-.46-2.38-1.47-.88-.79-1.47-1.76-1.65-2.06-.17-.3-.02-.46.13-.6.13-.14.3-.35.45-.52.15-.18.2-.3.3-.5.1-.2.05-.38-.03-.53-.07-.15-.67-1.6-.92-2.2-.24-.58-.49-.5-.67-.5h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.21 3.08c.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.7.63.71.22 1.36.19 1.87.12.57-.09 1.75-.72 2-1.41.25-.7.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35zM12.04 21.5h-.01a9.4 9.4 0 0 1-4.8-1.32l-.34-.2-3.57.94.95-3.48-.22-.36a9.4 9.4 0 0 1-1.44-5.02c0-5.2 4.23-9.43 9.44-9.43a9.4 9.4 0 0 1 9.43 9.44c0 5.2-4.23 9.43-9.44 9.43zm8.03-17.46A11.27 11.27 0 0 0 12.04.75C5.8.75.72 5.83.72 12.08c0 2 .52 3.94 1.51 5.65L.62 23.25l5.65-1.48a11.3 11.3 0 0 0 5.77 1.47h.01c6.24 0 11.32-5.08 11.32-11.33 0-3.03-1.18-5.87-3.3-8z" />
  </svg>
);

const Arrow = ({ size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 14 14" fill="none" aria-hidden="true">
    <path d="M3 11L11 3M11 3H4.5M11 3V9.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="square" />
  </svg>
);

export default function Page() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [lightbox, setLightbox] = useState(null);
  const [activeDish, setActiveDish] = useState(null);
  const floatRef = useRef(null);
  const stripRef = useRef(null);

  // Lightbox keys + scroll lock
  useEffect(() => {
    if (lightbox === null) return;
    const onKey = (e) => {
      if (e.key === "Escape") setLightbox(null);
      if (e.key === "ArrowRight") setLightbox((i) => (i + 1) % GALLERY.length);
      if (e.key === "ArrowLeft") setLightbox((i) => (i - 1 + GALLERY.length) % GALLERY.length);
    };
    document.documentElement.classList.add("locked");
    window.addEventListener("keydown", onKey);
    return () => {
      document.documentElement.classList.remove("locked");
      window.removeEventListener("keydown", onKey);
    };
  }, [lightbox]);

  useEffect(() => {
    document.documentElement.classList.toggle("locked", menuOpen);
  }, [menuOpen]);

  useEffect(() => {
    document.body.classList.add("is-loaded");

    const y = document.getElementById("year");
    if (y) y.textContent = new Date().getFullYear();

    const onScroll = () => {
      document.body.classList.toggle("scrolled", window.scrollY > 40);
      document.body.classList.toggle("past-hero", window.scrollY > window.innerHeight * 0.85);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
      }),
      { rootMargin: "0px 0px -10% 0px", threshold: 0.05 }
    );
    document.querySelectorAll("[data-r]").forEach((el) => {
      const d = el.getAttribute("data-d");
      if (d) el.style.setProperty("--d", `${d}ms`);
      io.observe(el);
    });

    // Floating dish image follows the cursor (pointer devices only)
    const fine = matchMedia("(hover: hover) and (pointer: fine)").matches;
    let raf = 0, tx = 0, ty = 0, cx = 0, cy = 0;
    const onMove = (e) => { tx = e.clientX; ty = e.clientY; };
    const loop = () => {
      cx += (tx - cx) * 0.14; cy += (ty - cy) * 0.14;
      if (floatRef.current) floatRef.current.style.transform = `translate3d(${cx}px, ${cy}px, 0)`;
      raf = requestAnimationFrame(loop);
    };
    if (fine) { window.addEventListener("mousemove", onMove); raf = requestAnimationFrame(loop); }

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
      io.disconnect();
    };
  }, []);

  const scrollStrip = (dir) => {
    const el = stripRef.current;
    if (el) el.scrollBy({ left: dir * el.clientWidth * 0.7, behavior: "smooth" });
  };

  const NAV = [
    ["#chef", "The chef"],
    ["#carta", "La carta"],
    ["#experiences", "Experiences"],
    ["#gallery", "Gallery"],
  ];

  return (
    <>
      <div className="grain" aria-hidden="true" />

      {/* NAV */}
      <header className="nav">
        <a href="#top" className="brand" onClick={() => setMenuOpen(false)}>
          <span className="brand-mono">NF</span>
          <span className="brand-name">Nicola Frizzale</span>
        </a>
        <nav className="nav-links" aria-label="Primary">
          {NAV.map(([h, l]) => <a key={h} href={h}>{l}</a>)}
        </nav>
        <a href="#contact" className="nav-book">Book</a>
        <button
          type="button"
          className={`burger${menuOpen ? " open" : ""}`}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((v) => !v)}
        >
          <span /><span />
        </button>
      </header>

      <div className={`sheet${menuOpen ? " open" : ""}`} aria-hidden={!menuOpen}>
        <nav aria-label="Mobile">
          {[...NAV, ["#contact", "Book"]].map(([h, l], i) => (
            <a key={h} href={h} style={{ "--i": i }} onClick={() => setMenuOpen(false)}>{l}</a>
          ))}
        </nav>
        <div className="sheet-foot">
          <a href={`tel:${TEL}`}>{TEL_DISPLAY}</a>
          <a href={waLink()} target="_blank" rel="noopener">WhatsApp {WA_DISPLAY}</a>
        </div>
      </div>

      {/* HERO */}
      <section id="top" className="hero">
        <video
          className="hero-video"
          src="/media/atelier.mp4"
          poster="/media/chef-plating-2.jpg"
          autoPlay muted loop playsInline preload="auto"
        />
        <div className="hero-shade" />

        <div className="hero-inner">
          <p className="hero-kicker load" style={{ "--d": "200ms" }}>
            <span className="rule" /> Executive Chef · Cucina italiana
          </p>
          <h1 className="hero-title">
            <span className="ln"><span className="load-up" style={{ "--d": "350ms" }}>Nicola</span></span>
            <span className="ln"><span className="load-up it" style={{ "--d": "500ms" }}>Frizzale</span></span>
          </h1>
          <div className="hero-bottom">
            <p className="hero-lede load" style={{ "--d": "900ms" }}>
              Italian cooking with classical technique and a quiet hand.
              Private dinners, chef&apos;s table evenings and events — by appointment.
            </p>
            <div className="hero-cta load" style={{ "--d": "1050ms" }}>
              <a href="#contact" className="btn btn-gold">Reserve <Arrow /></a>
              <a href={waLink()} target="_blank" rel="noopener" className="btn btn-line"><WaIcon size={15} /> WhatsApp</a>
            </div>
          </div>
        </div>

        <div className="hero-rail load" style={{ "--d": "1200ms" }}>
          <a href={`tel:${TEL}`}><span>T</span>{TEL_DISPLAY}</a>
          <a href={waLink()} target="_blank" rel="noopener"><span>W</span>{WA_DISPLAY}</a>
          <a href="#chef" className="scroll">Scroll <i /></a>
        </div>
      </section>

      {/* THE CHEF */}
      <section id="chef" className="chef">
        <div className="chef-photo" data-r>
          <img src="/media/chef-portrait.jpg" alt="Chef Nicola Frizzale in chef's whites" />
          <span className="tag">Nicola Frizzale — Executive Chef</span>
        </div>
        <div className="chef-text">
          <p className="label" data-r>The chef</p>
          <h2 className="h2" data-r data-d="80">
            Fewer things, <em>better handled.</em>
          </h2>
          <p className="body" data-r data-d="160">
            Quiet, ingredient-led Italian cooking built on classical technique.
            Plates are kept simple and what&apos;s on them does the talking.
          </p>
          <p className="body" data-r data-d="220">
            Service is private and made to fit the room — a dinner at home, an
            evening at the chef&apos;s table, an event off-site. The kitchen comes
            along; the menu is written around the day.
          </p>
          <div className="sig" data-r data-d="300">
            <span className="sig-name">Nicola Frizzale</span>
            <span className="sig-role">Executive Sous Chef / Executive Chef</span>
          </div>
        </div>
      </section>

      {/* LA CARTA */}
      <section id="carta" className="carta" onMouseLeave={() => setActiveDish(null)}>
        <div className="carta-head">
          <p className="label" data-r>La carta</p>
          <h2 className="h2 center" data-r data-d="80">From the <em>kitchen.</em></h2>
          <p className="carta-note" data-r data-d="140">A selection of work. Menus are written to the day and to the room.</p>
        </div>

        <ol className="carta-list">
          {DISHES.map((d, i) => (
            <li
              key={d.n}
              className={`carta-row${activeDish === i ? " active" : ""}`}
              onMouseEnter={() => setActiveDish(i)}
              data-r data-d={i * 50}
            >
              <span className="carta-n">{d.n}</span>
              <div className="carta-text">
                <h3>{d.title}</h3>
                <p>{d.en}</p>
              </div>
              <img className="carta-thumb" src={`/media/${d.img}`} alt="" loading="lazy" />
            </li>
          ))}
        </ol>

        <div ref={floatRef} className={`carta-float${activeDish !== null ? " show" : ""}`} aria-hidden="true">
          {DISHES.map((d, i) => (
            <img key={d.n} src={`/media/${d.img}`} alt="" className={activeDish === i ? "on" : ""} loading="lazy" />
          ))}
        </div>
      </section>

      {/* EXPERIENCES */}
      <section id="experiences" className="exp">
        <div className="exp-head">
          <p className="label" data-r>Experiences</p>
          <h2 className="h2" data-r data-d="80">Three ways <em>to sit down.</em></h2>
        </div>
        <div className="exp-row">
          {EXPERIENCES.map((x, i) => (
            <article key={x.k} className="exp-card" data-r data-d={i * 120}>
              <img src={`/media/${x.img}`} alt="" loading="lazy" />
              <div className="exp-shade" />
              <div className="exp-body">
                <span className="exp-k">{x.k} — {x.it}</span>
                <h3>{x.title}</h3>
                <div className="exp-more">
                  <div className="exp-in">
                    <p>{x.body}</p>
                    <div className="exp-foot">
                      <span>{x.meta}</span>
                      <a href={waLink(x.msg)} target="_blank" rel="noopener" className="btn btn-gold sm">Enquire <Arrow size={12} /></a>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* FILM */}
      <section className="film">
        <div className="film-grid">
          <div className="film-text">
            <p className="label" data-r>In service</p>
            <h2 className="h2" data-r data-d="80">At <em>the pass.</em></h2>
            <p className="body" data-r data-d="160">A short, unhurried look at the work — plating, finishing, sending.</p>
          </div>
          {[
            { src: "atelier-2.mp4", poster: "dessert-rose.jpg", cap: "Dessert" },
            { src: "atelier-3.mp4", poster: "dish-tartare.jpg", cap: "Tartare" },
          ].map((v, i) => (
            <figure key={v.src} className={`film-clip c${i}`} data-r data-d={120 + i * 120}>
              <video src={`/media/${v.src}`} poster={`/media/${v.poster}`} autoPlay muted loop playsInline preload="metadata" />
              <figcaption><i /> {v.cap}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* GALLERY */}
      <section id="gallery" className="gallery">
        <div className="gallery-head">
          <div>
            <p className="label" data-r>Gallery</p>
            <h2 className="h2" data-r data-d="80">Fragments <em>of the table.</em></h2>
          </div>
          <div className="strip-nav" data-r data-d="160">
            <button type="button" onClick={() => scrollStrip(-1)} aria-label="Scroll gallery left">←</button>
            <button type="button" onClick={() => scrollStrip(1)} aria-label="Scroll gallery right">→</button>
          </div>
        </div>
        <div className="strip" ref={stripRef}>
          {GALLERY.map((g, i) => (
            <button key={g.img} type="button" className="strip-item" onClick={() => setLightbox(i)} aria-label={`Open image ${i + 1}`}>
              <img src={`/media/${g.img}`} alt={g.alt} loading="lazy" />
              <span>{String(i + 1).padStart(2, "0")}</span>
            </button>
          ))}
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="contact">
        <img className="contact-bg" src="/media/chef-plating.jpg" alt="" aria-hidden="true" />
        <div className="contact-shade" />
        <div className="contact-inner">
          <p className="label" data-r>Reservations</p>
          <h2 className="contact-title" data-r data-d="80">Prenota <em>la cucina.</em></h2>
          <p className="body center" data-r data-d="160">
            Private dinners, chef&apos;s table evenings and events, by appointment.
            These reach Nicola directly.
          </p>

          <div className="contact-cards">
            <a href={`tel:${TEL}`} className="cc" data-r data-d="220">
              <span className="cc-k">Telephone</span>
              <span className="cc-v">{TEL_DISPLAY}</span>
              <span className="cc-go">Call <Arrow /></span>
            </a>
            <a href={waLink()} target="_blank" rel="noopener" className="cc cc-wa" data-r data-d="300">
              <span className="cc-k"><WaIcon size={13} /> WhatsApp</span>
              <span className="cc-v">{WA_DISPLAY}</span>
              <span className="cc-go">Message <Arrow /></span>
            </a>
            <a href={`mailto:${EMAIL}`} className="cc" data-r data-d="380">
              <span className="cc-k">Email</span>
              <span className="cc-v cc-sm">{EMAIL}</span>
              <span className="cc-go">Write <Arrow /></span>
            </a>
          </div>
          <p className="contact-loc" data-r data-d="440">Based in Italy</p>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="foot">
        <span className="foot-name">Nicola <em>Frizzale</em></span>
        <span>© <span id="year" /> · Executive Chef</span>
        <span className="foot-links">
          <a href={`tel:${TEL}`}>{TEL_DISPLAY}</a>
          <a href={waLink()} target="_blank" rel="noopener">WhatsApp</a>
          <a href={`mailto:${EMAIL}`}>Email</a>
        </span>
      </footer>

      {/* FLOATING WHATSAPP */}
      <a href={waLink()} target="_blank" rel="noopener" className="wa-float" aria-label={`WhatsApp ${WA_DISPLAY}`}>
        <WaIcon size={22} />
      </a>

      {/* LIGHTBOX */}
      {lightbox !== null && (
        <div className="lightbox" role="dialog" aria-modal="true" aria-label="Gallery" onClick={() => setLightbox(null)}>
          <img src={`/media/${GALLERY[lightbox].img}`} alt={GALLERY[lightbox].alt} onClick={(e) => e.stopPropagation()} />
          <button type="button" className="lb lb-close" onClick={() => setLightbox(null)} aria-label="Close">×</button>
          <button type="button" className="lb lb-prev" aria-label="Previous"
            onClick={(e) => { e.stopPropagation(); setLightbox((i) => (i - 1 + GALLERY.length) % GALLERY.length); }}>←</button>
          <button type="button" className="lb lb-next" aria-label="Next"
            onClick={(e) => { e.stopPropagation(); setLightbox((i) => (i + 1) % GALLERY.length); }}>→</button>
          <span className="lb-count">{String(lightbox + 1).padStart(2, "0")} / {String(GALLERY.length).padStart(2, "0")}</span>
        </div>
      )}
    </>
  );
}
