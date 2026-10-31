"use client";

import { useEffect, useState } from "react";

const TEL = "+8615821069064";
const TEL_DISPLAY = "+86 158 2106 9064";
const WA = "393335788520";
const WA_DISPLAY = "+39 333 578 8520";
const EMAIL = "frizzale.nicola@icloud.com";

const waLink = (msg = "Hello Nicola, I'd like to enquire about a booking.") =>
  `https://wa.me/${WA}?text=${encodeURIComponent(msg)}`;

const WaIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M17.47 14.38c-.3-.15-1.75-.86-2.02-.96-.27-.1-.47-.15-.67.15-.2.3-.77.96-.94 1.16-.17.2-.35.22-.64.07-.3-.15-1.25-.46-2.38-1.47-.88-.79-1.47-1.76-1.65-2.06-.17-.3-.02-.46.13-.6.13-.14.3-.35.45-.52.15-.18.2-.3.3-.5.1-.2.05-.38-.03-.53-.07-.15-.67-1.6-.92-2.2-.24-.58-.49-.5-.67-.5h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.21 3.08c.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.7.63.71.22 1.36.19 1.87.12.57-.09 1.75-.72 2-1.41.25-.7.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35zM12.04 21.5h-.01a9.4 9.4 0 0 1-4.8-1.32l-.34-.2-3.57.94.95-3.48-.22-.36a9.4 9.4 0 0 1-1.44-5.02c0-5.2 4.23-9.43 9.44-9.43a9.4 9.4 0 0 1 9.43 9.44c0 5.2-4.23 9.43-9.44 9.43zm8.03-17.46A11.27 11.27 0 0 0 12.04.75C5.8.75.72 5.83.72 12.08c0 2 .52 3.94 1.51 5.65L.62 23.25l5.65-1.48a11.3 11.3 0 0 0 5.77 1.47h.01c6.24 0 11.32-5.08 11.32-11.33 0-3.03-1.18-5.87-3.3-8z" />
  </svg>
);

const GALLERY = [
  { c: "m-tall", img: "dessert-rose.jpg", alt: "Apple-rose dessert with gold leaf and salted-caramel ice cream", d: 0 },
  { c: "", img: "dish-pour.jpg", alt: "A small jug pouring sauce over a plated course", d: 60 },
  { c: "m-wide", img: "spread-picnic.jpg", alt: "Outdoor spread on a wooden table in a garden", d: 120 },
  { c: "", img: "focaccia.jpg", alt: "Tomato and olive focaccia", d: 40 },
  { c: "m-tall", img: "dessert-parisbrest.jpg", alt: "A round pastry dusted with icing sugar on slate", d: 100 },
  { c: "", img: "dish-extra-1.jpg", alt: "Plated dish detail", d: 80 },
  { c: "", img: "dish-extra-3.jpg", alt: "Plated dish detail", d: 180 },
  { c: "", img: "dish-extra-5.jpg", alt: "Plated dish detail", d: 60 },
  { c: "m-wide", img: "chef-plating-2.jpg", alt: "Chef plating outdoors", d: 120 },
  { c: "", img: "dish-extra-7.jpg", alt: "Plated dish detail", d: 40 },
  { c: "m-tall", img: "dish-extra-9.jpg", alt: "Plated dish detail", d: 100 },
  { c: "", img: "dish-extra-10.jpg", alt: "Plated dish detail", d: 160 },
  { c: "", img: "dish-extra-2.jpg", alt: "Plated dish detail", d: 40 },
];

// Helper: turn an array of nodes into mask-reveal lines
function MaskLine({ children, delay = 0 }) {
  return (
    <span className="rl">
      <span className="ri" style={{ "--ri-delay": `${delay}ms` }}>{children}</span>
    </span>
  );
}

export default function Page() {
  const [lightbox, setLightbox] = useState(null);

  useEffect(() => {
    if (lightbox === null) return;
    const onKey = (e) => {
      if (e.key === "Escape") setLightbox(null);
      if (e.key === "ArrowRight") setLightbox((i) => (i + 1) % GALLERY.length);
      if (e.key === "ArrowLeft") setLightbox((i) => (i - 1 + GALLERY.length) % GALLERY.length);
    };
    document.documentElement.classList.add("lb-open");
    window.addEventListener("keydown", onKey);
    return () => {
      document.documentElement.classList.remove("lb-open");
      window.removeEventListener("keydown", onKey);
    };
  }, [lightbox]);

  useEffect(() => {
    const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));

    const y = document.getElementById("year");
    if (y) y.textContent = new Date().getFullYear();

    const nav = document.querySelector(".nav");
    const onScroll = () => {
      if (nav) nav.classList.toggle("scrolled", window.scrollY > 24);
      document.body.classList.toggle("past-hero", window.scrollY > window.innerHeight * 0.8);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    // Pre-set reveal delays
    const reveals = $$("[data-reveal]");
    reveals.forEach((el) => {
      const d = el.getAttribute("data-delay");
      if (d) el.style.setProperty("--reveal-delay", `${d}ms`);
    });

    // Reveal observer (kicked off after splash)
    let io;
    const startObservers = () => {
      if ("IntersectionObserver" in window) {
        io = new IntersectionObserver(
          (entries) => {
            entries.forEach((e) => {
              if (e.isIntersecting) {
                e.target.classList.add("is-in");
                io.unobserve(e.target);
              }
            });
          },
          { rootMargin: "0px 0px -8% 0px", threshold: 0.06 }
        );
        reveals.forEach((el) => io.observe(el));
      } else {
        reveals.forEach((el) => el.classList.add("is-in"));
      }
    };

    // Splash sequence
    const splash = document.getElementById("splash");
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const timers = [];

    if (splash && !reduced) {
      document.documentElement.classList.add("splash-active");
      requestAnimationFrame(() => splash.classList.add("show"));
      timers.push(setTimeout(() => splash.classList.add("show-text"), 60));
      timers.push(setTimeout(() => splash.classList.add("hide-text"), 1250));
      timers.push(setTimeout(() => splash.classList.add("open"), 1550));
      timers.push(setTimeout(() => {
        document.documentElement.classList.remove("splash-active");
        document.body.classList.add("is-loaded");
        startObservers();
      }, 1700));
      timers.push(setTimeout(() => {
        if (splash && splash.parentNode) splash.parentNode.removeChild(splash);
      }, 3000));
    } else {
      if (splash) splash.remove();
      document.body.classList.add("is-loaded");
      startObservers();
    }

    // Parallax
    const parallax = $$("[data-parallax]");
    let ticking = false;
    const update = () => {
      const vh = window.innerHeight;
      parallax.forEach((el) => {
        const rect = el.getBoundingClientRect();
        const center = rect.top + rect.height / 2 - vh / 2;
        const factor = parseFloat(el.dataset.parallax || "0.05");
        el.style.transform = `translate3d(0, ${(-center * factor).toFixed(2)}px, 0)`;
      });
      ticking = false;
    };
    const onParallax = () => {
      if (!ticking) { window.requestAnimationFrame(update); ticking = true; }
    };
    if (parallax.length && !reduced) {
      window.addEventListener("scroll", onParallax, { passive: true });
      window.addEventListener("resize", update);
      update();
    }

    // Anchor smooth scroll
    const anchorClick = (e) => {
      const a = e.target.closest('a[href^="#"]');
      if (!a) return;
      const id = a.getAttribute("href");
      if (id.length > 1) {
        const target = document.querySelector(id);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }
    };
    document.addEventListener("click", anchorClick);

    return () => {
      timers.forEach(clearTimeout);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("scroll", onParallax);
      window.removeEventListener("resize", update);
      document.removeEventListener("click", anchorClick);
      if (io) io.disconnect();
    };
  }, []);

  return (
    <>
      {/* SPLASH INTRO — full-screen overlay that splits open */}
      <div id="splash" className="splash" aria-hidden="true">
        <div className="splash-half splash-top" />
        <div className="splash-half splash-bot" />
        <div className="splash-text">
          <span className="splash-eyebrow">Executive Sous Chef / Executive Chef</span>
          <span className="splash-name">
            <span className="sn-line"><span className="sn-inner">Nicola</span></span>
            <span className="sn-line"><span className="sn-inner"><em>Frizzale.</em></span></span>
          </span>
          <span className="splash-meta">
            <span className="dot-red" /> est. {new Date().getFullYear()}
          </span>
        </div>
      </div>

      <div className="grain" aria-hidden="true" />

      <header className="nav" data-reveal>
        <a href="#top" className="nav-mark">
          <span className="mark-italic">N</span>
          <span className="mark-dot">·</span>
          <span className="mark-meta">Nicola Frizzale</span>
        </a>
        <nav className="nav-links" aria-label="primary">
          <a href="#approach">Approach</a>
          <a href="#experiences">Experiences</a>
          <a href="#plates">Plates</a>
          <a href="#atelier">Atelier</a>
          <a href="#gallery">Gallery</a>
          <a href="#contact" className="nav-cta">Reserve</a>
        </nav>
      </header>

      {/* HERO */}
      <section id="top" className="hero">
        <div className="hero-grid">
          <div className="hero-type">
            <p className="eyebrow" data-reveal data-delay="0">
              <span className="dot" /> Executive Sous Chef / Executive Chef
            </p>
            <h1 className="display reveal-mask" data-reveal data-delay="80">
              <MaskLine delay={0}><em>Nicola</em></MaskLine>
              <MaskLine delay={120}>Frizzale<span className="period">.</span></MaskLine>
              <MaskLine delay={260}><span className="gold">Signature</span></MaskLine>
              <MaskLine delay={380}>Italian table.</MaskLine>
            </h1>
            <div className="hero-meta" data-reveal data-delay="700">
              <p className="lede">
                Italian cooking, classical technique, restrained plating.
                Available for private dinners, chef&apos;s table evenings and
                off-site events. By appointment.
              </p>
              <div className="hero-actions">
                <a href={`tel:${TEL}`} className="btn btn-ink">
                  <span>Call</span>
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                    <path d="M3 11L11 3M11 3H4.5M11 3V9.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="square" />
                  </svg>
                </a>
                <a href={waLink()} target="_blank" rel="noopener" className="btn btn-ghost">
                  <WaIcon size={15} />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>
            <div className="hero-ticker" aria-hidden="true">
              <div className="ticker-track">
                <span>Private dining</span><span>·</span>
                <span>Chef&apos;s table</span><span>·</span>
                <span>Off-site events</span><span>·</span>
                <span>By appointment</span><span>·</span>
                <span>Italy</span><span>·</span>
                <span>Private dining</span><span>·</span>
                <span>Chef&apos;s table</span><span>·</span>
                <span>Off-site events</span><span>·</span>
                <span>By appointment</span><span>·</span>
                <span>Italy</span><span>·</span>
              </div>
            </div>
          </div>

          <div className="hero-portrait reveal-image" data-reveal data-delay="500" data-parallax="0.06">
            <figure>
              <img src="/media/chef-portrait.jpg" alt="Chef Nicola Frizzale, portrait in chef's whites" />
              <figcaption>
                <span className="cap-num">N° 01</span>
                <span className="cap-text">Portrait</span>
              </figcaption>
            </figure>
            <span className="portrait-meta">
              <em>Name</em> Nicola Frizzale<br />
              <em>Role</em> Executive Sous Chef / Executive Chef
            </span>
          </div>
        </div>

        <div className="hero-floor">
          <div className="floor-col"><span className="kicker">Availability</span><span>By appointment</span></div>
          <div className="floor-col"><span className="kicker">Phone</span><span><a className="floor-link" href={`tel:${TEL}`}>{TEL_DISPLAY}</a></span></div>
          <div className="floor-col"><span className="kicker">WhatsApp</span><span><a className="floor-link" href={waLink()} target="_blank" rel="noopener">{WA_DISPLAY}</a></span></div>
          <div className="floor-col"><span className="kicker">Email</span><span><a className="floor-link" href={`mailto:${EMAIL}`}>{EMAIL}</a></span></div>
        </div>
      </section>

      {/* QUOTE */}
      <section className="quote">
        <p className="quote-text reveal-mask" data-reveal>
          <MaskLine delay={0}>A quiet table.</MaskLine>
          <MaskLine delay={140}><em>Italian</em> cooking,</MaskLine>
          <MaskLine delay={260}>unhurried.</MaskLine>
        </p>
        <div className="quote-attr" data-reveal data-delay="500">
          <span className="rule" />
          <span>Nicola Frizzale &nbsp;—&nbsp; Executive Sous Chef / Executive Chef</span>
        </div>
      </section>

      {/* APPROACH */}
      <section id="approach" className="story">
        <header className="section-head">
          <span className="section-num" data-reveal>02 — Approach</span>
          <h2 className="section-title display reveal-mask" data-reveal data-delay="80">
            <MaskLine delay={0}>Fewer things,</MaskLine>
            <MaskLine delay={140}><em>better</em> handled.</MaskLine>
          </h2>
        </header>

        <div className="story-grid">
          <div className="story-body" data-reveal>
            <p className="dropcap">
              <span className="drop">Q</span>uiet, ingredient-led Italian
              cooking, built on classical technique. Plates are kept simple
              and what&apos;s on them does the talking.
            </p>
            <p>
              Service is private and made to fit the room — a dinner at home,
              a chef&apos;s table evening, an off-site event. The kitchen is
              brought along; the menu is built around the day.
            </p>
            <ul className="story-list">
              <li><span>i.</span>Private dinners, at your home or your venue.</li>
              <li><span>ii.</span>Chef&apos;s table service.</li>
              <li><span>iii.</span>Off-site events and one-off collaborations.</li>
            </ul>
          </div>

          <div className="story-figure" data-reveal data-delay="120">
            <div className="frame frame-tall reveal-image" data-parallax="0.05">
              <img src="/media/chef-plating.jpg" alt="Chef plating a course outdoors in golden light" loading="lazy" />
            </div>
            <div className="figure-caption">
              <span>Service</span>
              <span>—</span>
              <span>Plating</span>
            </div>
          </div>
        </div>
      </section>

      {/* EXPERIENCES */}
      <section id="experiences" className="offers">
        <header className="section-head">
          <span className="section-num" data-reveal>03 — Experiences</span>
          <h2 className="section-title display reveal-mask" data-reveal data-delay="80">
            <MaskLine delay={0}>Three ways</MaskLine>
            <MaskLine delay={140}>to <em>sit down.</em></MaskLine>
          </h2>
        </header>

        <div className="offer-grid">
          {[
            {
              n: "i.", img: "dish-pour.jpg", title: "Private dinner",
              body: "A tasting menu cooked and served in your home or villa. Shopping, service and clean-down handled.",
              meta: "2 — 12 guests",
              msg: "Hello Nicola, I'd like to enquire about a private dinner.",
            },
            {
              n: "ii.", img: "dish-caviar.jpg", title: "Chef's table",
              body: "An evening at the pass. Course by course, cooked in front of the table and talked through.",
              meta: "Up to 10 guests",
              msg: "Hello Nicola, I'd like to enquire about a chef's table evening.",
            },
            {
              n: "iii.", img: "spread-picnic.jpg", title: "Events & collaborations",
              body: "Off-site events, pop-ups, menu consulting and kitchen collaborations with restaurants and hotels.",
              meta: "On request",
              msg: "Hello Nicola, I'd like to enquire about an event / collaboration.",
            },
          ].map((o, i) => (
            <article key={o.title} className="offer" data-reveal data-delay={i * 120}>
              <div className="offer-photo">
                <img src={`/media/${o.img}`} alt="" loading="lazy" />
                <span className="offer-n">{o.n}</span>
              </div>
              <div className="offer-body">
                <h3 className="offer-title">{o.title}</h3>
                <p>{o.body}</p>
                <div className="offer-foot">
                  <span className="offer-meta">{o.meta}</span>
                  <a href={waLink(o.msg)} target="_blank" rel="noopener" className="offer-cta">
                    Enquire
                    <svg width="12" height="12" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                      <path d="M3 11L11 3M11 3H4.5M11 3V9.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="square" />
                    </svg>
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* PLATES */}
      <section id="plates" className="signatures">
        <header className="section-head wide">
          <span className="section-num" data-reveal>04 — Plates</span>
          <h2 className="section-title display center reveal-mask" data-reveal data-delay="80">
            <MaskLine delay={0}><em>From</em> the kitchen</MaskLine>
            <MaskLine delay={140}><span className="tiny-rule" /></MaskLine>
          </h2>
          <p className="section-deck" data-reveal data-delay="320">
            A small selection of work. Menus are written to the day and to the room.
          </p>
        </header>

        <ol className="dish-list">
          {[
            { n: "01", img: "dish-tartare.jpg", alt: "Beef tartare with cured yolk and shaved black truffle", title: "Tartare, yolk, truffle", sub: "Hand-cut beef, a cured yolk to break over it, black truffle shaved at the table." },
            { n: "02", img: "dish-langoustine.jpg", alt: "Scampi tartare in clear green jelly with edible flowers", title: "Scampi tartare, green jelly", sub: "Raw scampi under a clear herb jelly, finished with garden flowers.", reverse: true },
            { n: "03", img: "dish-caviar.jpg", alt: "Composition of green vegetables and caviar in a warm orange sauce", title: "Garden, caviar", sub: "Green vegetables at their best, a warm sauce, a spoon of caviar for salt." },
            { n: "04", img: "dish-carpaccio.jpg", alt: "Beef carpaccio fanned across a ridged white plate", title: "Beef carpaccio", sub: "The classic, sliced thin and dressed simply. Nothing added that isn't needed.", reverse: true },
            { n: "05", img: "dish-tenderloin.jpg", alt: "Sliced rare beef tenderloin with chanterelles and charcoal salt", title: "Tenderloin, chanterelles", sub: "Rested and sliced rare, with chanterelles and a charcoal salt." },
            { n: "06", img: "dish-milanese.jpg", alt: "Bone-in breaded veal Milanese topped with shaved black truffle", title: "Milanese, black truffle", sub: "Bone-in veal, fried in butter the Milanese way, black truffle over the top.", reverse: true },
          ].map((d) => (
            <li key={d.n} className={`dish${d.reverse ? " reverse" : ""}`} data-reveal>
              <div className="dish-photo reveal-image">
                <img src={`/media/${d.img}`} alt={d.alt} loading="lazy" />
              </div>
              <div className="dish-info">
                <div>
                  <span className="dish-num">{d.n}</span>
                  <h3 className="dish-name">{d.title}</h3>
                  <span className="dish-rule" />
                  <p className="dish-sub">{d.sub}</p>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* ATELIER */}
      <section id="atelier" className="atelier">
        <div className="atelier-head">
          <span className="section-num light" data-reveal>05 — Atelier</span>
          <h2 className="display light reveal-mask" data-reveal data-delay="80">
            <MaskLine delay={0}>In</MaskLine>
            <MaskLine delay={140}><em>service.</em></MaskLine>
          </h2>
          <p className="atelier-deck light" data-reveal data-delay="320">
            A short, unhurried look at the work.
          </p>
        </div>
        <div className="atelier-video reveal-image" data-reveal data-delay="220">
          <video
            src="/media/atelier.mp4"
            autoPlay muted loop playsInline
            preload="metadata"
            poster="/media/chef-plating-2.jpg"
          />
          <div className="video-frame" />
          <div className="video-caption">
            <span>REC</span>
            <span className="dot-red" />
            <span>Atelier — Nicola Frizzale</span>
          </div>
        </div>

        <div className="atelier-reel">
          <div className="atelier-video reveal-image" data-reveal data-delay="120">
            <video
              src="/media/atelier-2.mp4"
              autoPlay muted loop playsInline
              preload="metadata"
              poster="/media/dessert-rose.jpg"
            />
            <div className="video-frame" />
            <div className="video-caption">
              <span>REC</span>
              <span className="dot-red" />
              <span>Pass — Dessert</span>
            </div>
          </div>
          <div className="atelier-video reveal-image" data-reveal data-delay="220">
            <video
              src="/media/atelier-3.mp4"
              autoPlay muted loop playsInline
              preload="metadata"
              poster="/media/dish-tartare.jpg"
            />
            <div className="video-frame" />
            <div className="video-caption">
              <span>REC</span>
              <span className="dot-red" />
              <span>Pass — Tartare</span>
            </div>
          </div>
        </div>
      </section>

      {/* MARQUEE */}
      <section className="marquee" aria-hidden="true">
        <div className="marquee-track">
          <span>By appointment</span><span className="m-dot">●</span>
          <span><em>Private dining</em></span><span className="m-dot">●</span>
          <span>Chef&apos;s table</span><span className="m-dot">●</span>
          <span>Off-site events</span><span className="m-dot">●</span>
          <span>{TEL_DISPLAY}</span><span className="m-dot">●</span>
          <span>By appointment</span><span className="m-dot">●</span>
          <span><em>Private dining</em></span><span className="m-dot">●</span>
          <span>Chef&apos;s table</span><span className="m-dot">●</span>
          <span>Off-site events</span><span className="m-dot">●</span>
          <span>{TEL_DISPLAY}</span><span className="m-dot">●</span>
        </div>
      </section>

      {/* GALLERY */}
      <section id="gallery" className="gallery">
        <header className="section-head">
          <span className="section-num" data-reveal>06 — Gallery</span>
          <h2 className="section-title display reveal-mask" data-reveal data-delay="80">
            <MaskLine delay={0}>A field of</MaskLine>
            <MaskLine delay={140}><em>fragments.</em></MaskLine>
          </h2>
        </header>

        <div className="masonry">
          {GALLERY.map((m, i) => (
            <figure key={i} className={`m-item ${m.c} reveal-image`} data-reveal data-delay={m.d}>
              <button type="button" className="m-open" onClick={() => setLightbox(i)} aria-label={`Open image: ${m.alt}`}>
                <img src={`/media/${m.img}`} alt={m.alt} loading="lazy" />
              </button>
            </figure>
          ))}
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="contact">
        <div className="contact-grid">
          <div className="contact-type">
            <span className="section-num light" data-reveal>07 — Contact</span>
            <h2 className="display light contact-title reveal-mask" data-reveal data-delay="60">
              <MaskLine delay={0}>Reserve the</MaskLine>
              <MaskLine delay={160}><span className="gold-dark"><em>kitchen.</em></span></MaskLine>
            </h2>
            <p className="lede light" data-reveal data-delay="320">
              Private dinners, chef&apos;s table evenings and off-site events,
              by appointment. The numbers below reach Nicola directly.
            </p>

            <a href={`tel:${TEL}`} className="phone-card" data-reveal data-delay="440">
              <span className="pc-label">Direct line</span>
              <span className="pc-number">{TEL_DISPLAY}</span>
              <span className="pc-cta">
                <span>Call</span>
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                  <path d="M4 14L14 4M14 4H6M14 4V12" stroke="currentColor" strokeWidth="1.3" strokeLinecap="square" />
                </svg>
              </span>
            </a>

            <div className="contact-row" data-reveal data-delay="560">
              <a href={waLink()} target="_blank" rel="noopener" className="ic-link">
                <span className="ic-k">WhatsApp</span>
                <span className="ic-v">{WA_DISPLAY}</span>
              </a>
              <a href={`mailto:${EMAIL}`} className="ic-link">
                <span className="ic-k">Email</span>
                <span className="ic-v ic-v-sm">{EMAIL}</span>
              </a>
              <div className="ic-link static">
                <span className="ic-k">Location</span>
                <span className="ic-v">Italy</span>
              </div>
            </div>
          </div>

          <div className="contact-figure reveal-image" data-reveal data-delay="200">
            <img src="/media/chef-portrait-2.jpg" alt="Chef Nicola Frizzale plating outdoors" />
            <span className="contact-figure-meta">N° 02</span>
          </div>
        </div>
      </section>

      {/* LIGHTBOX */}
      {lightbox !== null && (
        <div className="lightbox" role="dialog" aria-modal="true" aria-label="Gallery" onClick={() => setLightbox(null)}>
          <img src={`/media/${GALLERY[lightbox].img}`} alt={GALLERY[lightbox].alt} onClick={(e) => e.stopPropagation()} />
          <button type="button" className="lb-btn lb-close" onClick={() => setLightbox(null)} aria-label="Close">×</button>
          <button type="button" className="lb-btn lb-prev" aria-label="Previous"
            onClick={(e) => { e.stopPropagation(); setLightbox((i) => (i - 1 + GALLERY.length) % GALLERY.length); }}>←</button>
          <button type="button" className="lb-btn lb-next" aria-label="Next"
            onClick={(e) => { e.stopPropagation(); setLightbox((i) => (i + 1) % GALLERY.length); }}>→</button>
          <span className="lb-count">{String(lightbox + 1).padStart(2, "0")} / {String(GALLERY.length).padStart(2, "0")}</span>
        </div>
      )}

      {/* FLOATING WHATSAPP */}
      <a href={waLink()} target="_blank" rel="noopener" className="wa-float" aria-label={`WhatsApp ${WA_DISPLAY}`}>
        <WaIcon size={22} />
        <span className="wa-float-label">WhatsApp</span>
      </a>

      {/* FOOTER */}
      <footer className="foot">
        <div className="foot-row">
          <span className="foot-mark">Nicola Frizzale<em>.</em></span>
          <span className="foot-meta">Executive Sous Chef / Executive Chef</span>
          <span className="foot-meta foot-tel">
            <a href={`tel:${TEL}`}>{TEL_DISPLAY}</a>
            <span className="foot-sep">·</span>
            <a href={waLink()} target="_blank" rel="noopener">WA {WA_DISPLAY}</a>
          </span>
        </div>
        <div className="foot-rule" />
        <div className="foot-row small">
          <span>© <span id="year" />. Nicola Frizzale.</span>
          <span><a className="foot-link" href={`mailto:${EMAIL}`}>{EMAIL}</a></span>
        </div>
      </footer>
    </>
  );
}
