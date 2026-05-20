"use client";

import { useEffect } from "react";

const TEL = "+966532685304";
const TEL_DISPLAY = "+966 53 268 5304";
const EMAIL = "frizzale.nicola@icloud.com";

// Helper: turn an array of nodes into mask-reveal lines
function MaskLine({ children, delay = 0 }) {
  return (
    <span className="rl">
      <span className="ri" style={{ "--ri-delay": `${delay}ms` }}>{children}</span>
    </span>
  );
}

export default function Page() {
  useEffect(() => {
    const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));

    const y = document.getElementById("year");
    if (y) y.textContent = new Date().getFullYear();

    const nav = document.querySelector(".nav");
    const onScroll = () => {
      if (nav) nav.classList.toggle("scrolled", window.scrollY > 24);
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
      timers.push(setTimeout(() => splash.classList.add("hide-text"), 1500));
      timers.push(setTimeout(() => splash.classList.add("open"), 1900));
      timers.push(setTimeout(() => {
        document.documentElement.classList.remove("splash-active");
        document.body.classList.add("is-loaded");
        startObservers();
      }, 2050));
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
                <a href={`https://wa.me/${TEL.replace("+", "")}`} target="_blank" rel="noopener" className="btn btn-ghost">WhatsApp</a>
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
          <div className="floor-col"><span className="kicker">Phone</span><span>{TEL_DISPLAY}</span></div>
          <div className="floor-col"><span className="kicker">Email</span><span><a className="floor-link" href={`mailto:${EMAIL}`}>{EMAIL}</a></span></div>
          <div className="floor-col scroll-cue"><span className="kicker">Scroll</span><span className="arrow">↓</span></div>
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

      {/* PLATES */}
      <section id="plates" className="signatures">
        <header className="section-head wide">
          <span className="section-num" data-reveal>03 — Plates</span>
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
            { n: "01", img: "dish-tartare.jpg", alt: "Beef tartare with cured yolk and shaved black truffle", title: "Tartare, yolk, truffle" },
            { n: "02", img: "dish-langoustine.jpg", alt: "Scampi tartare in clear green jelly with edible flowers", title: "Scampi tartare, green jelly", reverse: true },
            { n: "03", img: "dish-caviar.jpg", alt: "Composition of green vegetables and caviar in a warm orange sauce", title: "Garden, caviar" },
            { n: "04", img: "dish-carpaccio.jpg", alt: "Beef carpaccio fanned across a ridged white plate", title: "Beef carpaccio", reverse: true },
            { n: "05", img: "dish-tenderloin.jpg", alt: "Sliced rare beef tenderloin with chanterelles and charcoal salt", title: "Tenderloin, chanterelles" },
            { n: "06", img: "dish-milanese.jpg", alt: "Bone-in breaded veal Milanese topped with shaved black truffle", title: "Milanese, black truffle", reverse: true },
          ].map((d) => (
            <li key={d.n} className={`dish${d.reverse ? " reverse" : ""}`} data-reveal>
              <div className="dish-photo reveal-image">
                <img src={`/media/${d.img}`} alt={d.alt} loading="lazy" />
              </div>
              <div className="dish-info">
                <div>
                  <span className="dish-num">{d.n}</span>
                  <h3 className="dish-name">{d.title}</h3>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* ATELIER */}
      <section id="atelier" className="atelier">
        <div className="atelier-head">
          <span className="section-num light" data-reveal>04 — Atelier</span>
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
          <span className="section-num" data-reveal>05 — Gallery</span>
          <h2 className="section-title display reveal-mask" data-reveal data-delay="80">
            <MaskLine delay={0}>A field of</MaskLine>
            <MaskLine delay={140}><em>fragments.</em></MaskLine>
          </h2>
        </header>

        <div className="masonry">
          {[
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
          ].map((m, i) => (
            <figure key={i} className={`m-item ${m.c} reveal-image`} data-reveal data-delay={m.d}>
              <img src={`/media/${m.img}`} alt={m.alt} loading="lazy" />
            </figure>
          ))}
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="contact">
        <div className="contact-grid">
          <div className="contact-type">
            <span className="section-num light" data-reveal>06 — Contact</span>
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
              <a href={`https://wa.me/${TEL.replace("+", "")}`} target="_blank" rel="noopener" className="ic-link">
                <span className="ic-k">WhatsApp</span>
                <span className="ic-v">{TEL_DISPLAY}</span>
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

      {/* FOOTER */}
      <footer className="foot">
        <div className="foot-row">
          <span className="foot-mark">Nicola Frizzale<em>.</em></span>
          <span className="foot-meta">Executive Sous Chef / Executive Chef</span>
          <span className="foot-meta foot-tel"><a href={`tel:${TEL}`}>{TEL_DISPLAY}</a></span>
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
